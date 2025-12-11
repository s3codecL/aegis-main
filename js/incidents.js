/**
 * Aegis Dashboard - Incident Management System
 * Version: 1.8.0
 * 
 * Sistema de gestión de incidentes de ciberseguridad
 * Compatible con NIST 800-61, ISO/IEC 27035 y MITRE ATT&CK
 */

const IncidentManager = {
    // Configuración
    config: {
        storageKey: 'aegisIncidents',
        defaultArea: 'CS'
    },

    // Estado
    state: {
        incidents: [],
        currentIncident: null,
        filters: {
            status: '',
            criticality: '',
            type: '',
            search: ''
        }
    },

    /**
     * Inicializar sistema
     */
    init: function() {
        this.loadIncidents();
        this.setupEventListeners();
        this.renderIncidents();
        this.updateStats();
    },

    /**
     * Cargar incidentes desde localStorage
     */
    loadIncidents: function() {
        try {
            const data = localStorage.getItem(this.config.storageKey);
            this.state.incidents = data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading incidents:', e);
            this.state.incidents = [];
        }
    },

    /**
     * Guardar incidentes en localStorage
     */
    saveIncidents: function() {
        try {
            localStorage.setItem(this.config.storageKey, JSON.stringify(this.state.incidents));
        } catch (e) {
            console.error('Error saving incidents:', e);
            this.showAlert('Error al guardar incidentes', 'danger');
        }
    },

    /**
     * Crear nuevo incidente
     */
    createIncident: function(data) {
        const currentUser = Auth.getCurrentUser();
        const timestamp = new Date().toISOString();
        
        // Generar código automático
        const code = CSTaxonomy.generateIncidentCode(data.type, data.area);
        
        // Calcular prioridad y criticidad automáticamente
        const priority = CSTaxonomy.getPriority(data.sgsi.impact, data.sgsi.urgency);
        const incident = {
            id: this.generateId(),
            code: code,
            detection: {
                timestamp: timestamp,
                channel: data.channel,
                reportedBy: data.reportedBy || currentUser?.name || 'Sistema'
            },
            description: data.description,
            affected: {
                ip: data.ip || '',
                hostname: data.hostname || ''
            },
            classification: {
                type: data.type,
                typeLabel: CSTaxonomy.getIncidentTypeLabel(data.type),
                criticality: priority, // <-- criticidad calculada
                status: data.status || 'Open',
                confidence: data.confidence || 0
            },
            sgsi: {
                impact: data.sgsi.impact,
                urgency: data.sgsi.urgency,
                priority: priority,
                category: data.sgsi.category,
                subcategory: data.sgsi.subcategory || '',
                asset: data.sgsi.asset || ''
            },
            assignment: {
                containment: { 
                    user: data.assignment?.containment?.user || '', 
                    sla: '1h', 
                    assigned: data.assignment?.containment?.user ? timestamp : null 
                },
                analysis: { 
                    user: data.assignment?.analysis?.user || '', 
                    sla: '2h', 
                    assigned: data.assignment?.analysis?.user ? timestamp : null 
                },
                remediation: { 
                    user: data.assignment?.remediation?.user || '', 
                    sla: '4h', 
                    assigned: data.assignment?.remediation?.user ? timestamp : null 
                }
            },
            nistPhase: data.nistPhase || 2, // Por defecto: Detección y Análisis
            mitreAttack: data.mitreAttack || [],
            iocs: {
                ips: data.iocs?.ips || [],
                hashes: data.iocs?.hashes || [],
                domains: data.iocs?.domains || [],
                artifacts: data.iocs?.artifacts || []
            },
            evidence: data.evidence || [],
            actions: [],
            timeline: {
                created: timestamp,
                updated: timestamp,
                closed: null
            },
            createdBy: currentUser?.name || 'Sistema'
        };

        this.state.incidents.push(incident);
        this.saveIncidents();
        this.renderIncidents();
        this.updateStats();
        
        return incident;
    },

    /**
     * Actualizar incidente existente
     */
    updateIncident: function(id, updates) {
        const index = this.state.incidents.findIndex(inc => inc.id === id);
        if (index === -1) {
            this.showAlert('Incidente no encontrado', 'danger');
            return false;
        }

        // Actualizar timestamp
        updates.timeline = {
            ...this.state.incidents[index].timeline,
            updated: new Date().toISOString()
        };

        // Si cambia a estado "Closed", registrar fecha de cierre
        if (updates.classification?.status === 'Closed' && 
            this.state.incidents[index].classification.status !== 'Closed') {
            updates.timeline.closed = new Date().toISOString();
        }

        // Recalcular prioridad y criticidad si cambian impacto/urgencia
        if (updates.sgsi?.impact || updates.sgsi?.urgency) {
            const currentSgsi = this.state.incidents[index].sgsi;
            const newImpact = updates.sgsi.impact || currentSgsi.impact;
            const newUrgency = updates.sgsi.urgency || currentSgsi.urgency;
            updates.sgsi = updates.sgsi || {};
            const newPriority = CSTaxonomy.getPriority(newImpact, newUrgency);
            updates.sgsi.priority = newPriority;
            if (!updates.classification) updates.classification = {};
            updates.classification.criticality = newPriority;
        }

        // Merge updates
        this.state.incidents[index] = this.deepMerge(this.state.incidents[index], updates);
        
        this.saveIncidents();
        this.renderIncidents();
        this.updateStats();
        
        return true;
    },

    /**
     * Eliminar incidente
     */
    deleteIncident: function(id) {
        if (!confirm('¿Estás seguro de eliminar este incidente? Esta acción no se puede deshacer.')) {
            return false;
        }

        this.state.incidents = this.state.incidents.filter(inc => inc.id !== id);
        this.saveIncidents();
        this.renderIncidents();
        this.updateStats();
        
        return true;
    },

    /**
     * Agregar acción al incidente
     */
    addAction: function(incidentId, action) {
        const incident = this.state.incidents.find(inc => inc.id === incidentId);
        if (!incident) return false;

        const currentUser = Auth.getCurrentUser();
        const newAction = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            task: action.task,
            responsible: action.responsible || currentUser?.name || 'Sistema',
            result: action.result || ''
        };

        incident.actions.push(newAction);
        incident.timeline.updated = new Date().toISOString();
        
        this.saveIncidents();
        return newAction;
    },

    /**
     * Obtener incidentes filtrados
     */
    getFilteredIncidents: function() {
        let filtered = [...this.state.incidents];

        // Filtro por estado
        if (this.state.filters.status) {
            filtered = filtered.filter(inc => 
                inc.classification.status === this.state.filters.status
            );
        }

        // Filtro por criticidad
        if (this.state.filters.criticality) {
            filtered = filtered.filter(inc => 
                inc.classification.criticality === this.state.filters.criticality
            );
        }

        // Filtro por tipo
        if (this.state.filters.type) {
            filtered = filtered.filter(inc => 
                inc.classification.type === this.state.filters.type
            );
        }

        // Búsqueda por texto
        if (this.state.filters.search) {
            const searchLower = this.state.filters.search.toLowerCase();
            filtered = filtered.filter(inc => 
                inc.code.toLowerCase().includes(searchLower) ||
                inc.description.toLowerCase().includes(searchLower) ||
                inc.affected.ip.toLowerCase().includes(searchLower) ||
                inc.affected.hostname.toLowerCase().includes(searchLower)
            );
        }

        // Ordenar por fecha (más recientes primero)
        filtered.sort((a, b) => 
            new Date(b.detection.timestamp) - new Date(a.detection.timestamp)
        );

        return filtered;
    },

    /**
     * Renderizar tabla de incidentes
     */
    renderIncidents: function() {
        const tbody = document.getElementById('incidentsTableBody');
        if (!tbody) return;

        const incidents = this.getFilteredIncidents();
        
        if (incidents.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted py-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-inbox mb-3" viewBox="0 0 16 16">
                            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
                        </svg>
                        <p class="mb-0" data-i18n="NO_INCIDENTS">No hay incidentes registrados</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = incidents.map(incident => {
            const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
            const statusBadge = CSTaxonomy.getStatusBadge(incident.classification.status, lang);
            const critColor = CSTaxonomy.getCriticalityColor(incident.classification.criticality);
            const critLabel = CSTaxonomy.getCriticalityLabel(incident.classification.criticality, lang);
            const typeLabel = CSTaxonomy.getIncidentTypeLabel(incident.classification.type, lang);
            const date = new Date(incident.detection.timestamp).toLocaleString(lang === 'en' ? 'en-US' : 'es-ES');
            
            return `
                <tr onclick="IncidentManager.viewIncident('${incident.id}')" style="cursor: pointer;">
                    <td>
                        <strong>${incident.code}</strong>
                        <br><small class="text-muted">${date}</small>
                    </td>
                        <td style="vertical-align: middle;">
                            <span class="badge status-badge" style="background-color: ${statusBadge.color};">
                                ${statusBadge.label}
                            </span>
                        </td>
                        <td style="vertical-align: middle; text-align: center; width: 32px;">
                            <span class="status-icon" title="${critLabel}">${statusBadge.icon}</span>
                        </td>
                        <td>
                            <span class="badge" style="background-color: ${critColor};">
                                ${critLabel}
                            </span>
                        </td>
                    <td>
                        <div class="text-truncate" style="max-width: 200px;" title="${typeLabel}">
                            ${typeLabel}
                        </div>
                    </td>
                    <td>
                        <div class="text-truncate" style="max-width: 250px;" title="${incident.description}">
                            ${incident.description}
                        </div>
                    </td>
                    <td>
                        ${incident.affected.ip || incident.affected.hostname || '<span class="text-muted">-</span>'}
                    </td>
                    <td>${incident.detection.reportedBy}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation(); IncidentManager.editIncident('${incident.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation(); IncidentManager.deleteIncident('${incident.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    /**
     * Actualizar estadísticas
     */
    updateStats: function() {
        const stats = {
            total: this.state.incidents.length,
            open: this.state.incidents.filter(i => i.classification.status === 'Open').length,
            investigating: this.state.incidents.filter(i => i.classification.status === 'Investigating').length,
            critical: this.state.incidents.filter(i => i.sgsi.priority === 'Critical').length
        };

        const totalEl = document.getElementById('totalIncidents');
        const openEl = document.getElementById('openIncidents');
        const investEl = document.getElementById('investigatingIncidents');
        const critEl = document.getElementById('criticalIncidents');

        if (totalEl) totalEl.textContent = stats.total;
        if (openEl) openEl.textContent = stats.open;
        if (investEl) investEl.textContent = stats.investigating;
        if (critEl) critEl.textContent = stats.critical;
    },

    /**
     * Abrir modal para nuevo incidente
     */
    openNewIncidentModal: function() {
        this.state.currentIncident = null;
        this.populateFormSelects();
        document.getElementById('incident-form')?.reset();
        document.getElementById('modal-title').textContent = 'Nuevo Incidente';
        
        // Mostrar modal (Bootstrap)
        const modal = new bootstrap.Modal(document.getElementById('incident-modal'));
        modal.show();
    },

    /**
     * Ver detalles del incidente
     */
    viewIncident: function(id) {
        const incident = this.state.incidents.find(inc => inc.id === id);
        if (!incident) return;

        // Implementar vista detallada (puede ser un modal o página separada)
        console.log('View incident:', incident);
        this.editIncident(id); // Por ahora, redirige a editar
    },

    /**
     * Editar incidente
     */
    editIncident: function(id) {
        const incident = this.state.incidents.find(inc => inc.id === id);
        if (!incident) return;

        this.state.currentIncident = incident;
        this.populateFormSelects();
        this.populateForm(incident);
        
        const modalTitle = document.getElementById('incidentModalLabel');
        if (modalTitle) {
            const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
            const editText = translations[lang]["EDIT_INCIDENT_CODE"] || "Editar Incidente:";
            modalTitle.textContent = `${editText} ${incident.code}`;
        }
        
        const modalElement = document.getElementById('incidentModal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    },

    /**
     * Poblar selects del formulario
     */
    populateFormSelects: function() {
        console.log('Poblando selects del formulario...');
        const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
        const selectPlaceholder = translations[lang]["SELECT_PLACEHOLDER"] || "-- Seleccionar --";
        
        // 1. Tipos de incidentes
        const typeSelect = document.getElementById('incidentType');
        if (typeSelect) {
            typeSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.incidentTypes.map(type => 
                    `<option value="${type.code}">${lang === 'en' ? type.labelEN : type.label}</option>`
                ).join('');
            console.log('✓ Tipos de incidente poblados:', CSTaxonomy.incidentTypes.length);
        }

        // 2. Áreas organizacionales
        const areaSelect = document.getElementById('incidentArea');
        if (areaSelect) {
            areaSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.areas.map(area => 
                    `<option value="${area.code}">${area.label}</option>`
                ).join('');
            console.log('✓ Áreas pobladas:', CSTaxonomy.areas.length);
        }

        // 3. Canales de detección
        const channelSelect = document.getElementById('incidentDetectionChannel');
        if (channelSelect) {
            channelSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.detectionChannels.map(channel => 
                    `<option value="${channel.value}">${lang === 'en' ? channel.labelEN : channel.label}</option>`
                ).join('');
            console.log('✓ Canales de detección poblados:', CSTaxonomy.detectionChannels.length);
        }

        // 4. Estados
        const statusSelect = document.getElementById('incidentStatus');
        if (statusSelect) {
            statusSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.statuses.map(status => 
                    `<option value="${status.value}">${lang === 'en' ? status.labelEN : status.label}</option>`
            ).join('');
            console.log('✓ Estados poblados:', CSTaxonomy.statuses.length);
        }

        // 5. Fase NIST
        const nistSelect = document.getElementById('incidentNistPhase');
        if (nistSelect && CSTaxonomy.nistPhases) {
            nistSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.nistPhases.map(phase => 
                    `<option value="${phase.id}">${lang === 'en' ? phase.labelEN : phase.label}</option>`
                ).join('');
            console.log('✓ Fases NIST pobladas:', CSTaxonomy.nistPhases.length);
        }

        // 6. Táctica MITRE
        const mitreSelect = document.getElementById('incidentMitreTactic');
        if (mitreSelect && CSTaxonomy.mitreAttack) {
            mitreSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.mitreAttack.map(tactic => 
                    `<option value="${tactic.id}">${lang === 'en' ? tactic.labelEN : tactic.label}</option>`
                ).join('');
            console.log('✓ Tácticas MITRE pobladas:', CSTaxonomy.mitreAttack.length);
        }

        // 7. Categoría SGSI
        const sgsiCatSelect = document.getElementById('incidentSgsiCategory');
        if (sgsiCatSelect && CSTaxonomy.sgsiCategories) {
            sgsiCatSelect.innerHTML = `<option value="">${selectPlaceholder}</option>` + 
                CSTaxonomy.sgsiCategories.map(cat => 
                    `<option value="${cat.category}">${lang === 'en' ? cat.categoryEN : cat.category}</option>`
                ).join('');
            console.log('✓ Categorías SGSI pobladas:', CSTaxonomy.sgsiCategories.length);
        }

        console.log('Selects poblados correctamente');
    },

    /**
     * Poblar formulario con datos del incidente
     */
    populateForm: function(incident) {
        // Información básica
        const typeEl = document.getElementById('incidentType');
        if (typeEl) typeEl.value = incident.classification.type;
        
        const areaEl = document.getElementById('incidentArea');
        if (areaEl && incident.code) {
            const areaPart = incident.code.split('-')[1];
            areaEl.value = areaPart;
        }
        
        const channelEl = document.getElementById('incidentDetectionChannel');
        if (channelEl) channelEl.value = incident.detection.channel;
        
        const descEl = document.getElementById('incidentDescription');
        if (descEl) descEl.value = incident.description || '';
        
        const ipEl = document.getElementById('incidentAffectedIP');
        if (ipEl) ipEl.value = incident.affected.ip || '';
        
        const hostEl = document.getElementById('incidentAffectedHost');
        if (hostEl) hostEl.value = incident.affected.hostname || '';
        
        const reporterEl = document.getElementById('incidentReporter');
        if (reporterEl) reporterEl.value = incident.detection.reportedBy || '';
        
        const statusEl = document.getElementById('incidentStatus');
        if (statusEl) statusEl.value = incident.classification.status;
        
        const confEl = document.getElementById('incidentConfidence');
        if (confEl) confEl.value = incident.classification.confidence || 'MEDIUM';
        
        // SGSI
        const impactEl = document.getElementById('incidentImpact');
        if (impactEl) impactEl.value = incident.sgsi.impact;
        
        const urgencyEl = document.getElementById('incidentUrgency');
        if (urgencyEl) urgencyEl.value = incident.sgsi.urgency;
        
        const sgsiCatEl = document.getElementById('incidentSgsiCategory');
        if (sgsiCatEl) sgsiCatEl.value = incident.sgsi.category || '';
        
        // NIST y MITRE
        const nistEl = document.getElementById('incidentNistPhase');
        if (nistEl) nistEl.value = incident.nistPhase || '';
        
        const mitreEl = document.getElementById('incidentMitreTactic');
        if (mitreEl) mitreEl.value = incident.mitreTactic || '';
        
        // IoCs
        const ipsEl = document.getElementById('incidentMaliciousIPs');
        if (ipsEl && incident.iocs?.ips) ipsEl.value = incident.iocs.ips.join(', ');
        
        const hashesEl = document.getElementById('incidentFileHashes');
        if (hashesEl && incident.iocs?.hashes) hashesEl.value = incident.iocs.hashes.join('\n');
        
        const domainsEl = document.getElementById('incidentSuspiciousDomains');
        if (domainsEl && incident.iocs?.domains) domainsEl.value = incident.iocs.domains.join(', ');
        
        // Acciones
        const containmentEl = document.getElementById('incidentContainment');
        if (containmentEl) containmentEl.value = incident.containment || '';
        
        const analysisEl = document.getElementById('incidentAnalysis');
        if (analysisEl) analysisEl.value = incident.analysis || '';
        
        const remediationEl = document.getElementById('incidentRemediation');
        if (remediationEl) remediationEl.value = incident.remediation || '';
        
        const lessonsEl = document.getElementById('incidentLessons');
        if (lessonsEl) lessonsEl.value = incident.lessons || '';
        
        // Actualizar prioridad calculada
        this.updateCalculatedPriority();
    },

    /**
     * Guardar incidente desde formulario
     */
    saveIncidentFromForm: function(event) {
        event.preventDefault();

        const formData = {
            type: document.getElementById('incidentType').value,
            area: document.getElementById('incidentArea').value,
            channel: document.getElementById('incidentDetectionChannel').value,
            description: document.getElementById('incidentDescription').value,
            ip: document.getElementById('incidentAffectedIP').value,
            hostname: document.getElementById('incidentAffectedHost').value,
            reportedBy: document.getElementById('incidentReporter').value,
            status: document.getElementById('incidentStatus').value,
            confidence: document.getElementById('incidentConfidence')?.value || 'MEDIUM',
            sgsi: {
                impact: document.getElementById('incidentImpact').value,
                urgency: document.getElementById('incidentUrgency').value,
                category: document.getElementById('incidentSgsiCategory').value
            },
            nistPhase: document.getElementById('incidentNistPhase')?.value || '',
            mitreTactic: document.getElementById('incidentMitreTactic')?.value || '',
            assignedTo: document.getElementById('incidentAssignedTo')?.value || '',
            sla: document.getElementById('incidentSLA')?.value || '',
            estimatedResolution: document.getElementById('incidentEstimatedResolution')?.value || '',
            iocs: {
                ips: (document.getElementById('incidentMaliciousIPs')?.value || '').split(',').map(s => s.trim()).filter(s => s),
                hashes: (document.getElementById('incidentFileHashes')?.value || '').split('\n').map(s => s.trim()).filter(s => s),
                domains: (document.getElementById('incidentSuspiciousDomains')?.value || '').split(',').map(s => s.trim()).filter(s => s),
                artifacts: document.getElementById('incidentArtifacts')?.value || ''
            },
            containment: document.getElementById('incidentContainment')?.value || '',
            analysis: document.getElementById('incidentAnalysis')?.value || '',
            remediation: document.getElementById('incidentRemediation')?.value || '',
            lessons: document.getElementById('incidentLessons')?.value || ''
        };

        if (this.state.currentIncident) {
            // Actualizar
            this.updateIncident(this.state.currentIncident.id, {
                description: formData.description,
                affected: { ip: formData.ip, hostname: formData.hostname },
                classification: {
                    ...this.state.currentIncident.classification,
                    type: formData.type || this.state.currentIncident.classification.type,
                    criticality: formData.criticality || this.state.currentIncident.classification.criticality,
                    status: formData.status || this.state.currentIncident.classification.status,
                    confidence: formData.confidence || this.state.currentIncident.classification.confidence
                },
                sgsi: { ...this.state.currentIncident.sgsi, ...formData.sgsi },
                assignment: formData.assignment || this.state.currentIncident.assignment,
                nistPhase: formData.nistPhase || this.state.currentIncident.nistPhase,
                iocs: formData.iocs || this.state.currentIncident.iocs
            });
            this.showAlert('Incidente actualizado correctamente', 'success');
        } else {
            // Crear nuevo
            this.createIncident(formData);
            this.showAlert('Incidente creado correctamente', 'success');
        }

        // Cerrar modal y resetear
        const modalElement = document.getElementById('incidentModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        
        // Resetear el formulario y el estado
        this.state.currentIncident = null;
        document.getElementById('incidentForm')?.reset();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Poblar selects al inicio
        this.populateFormSelects();
        this.populateFilters();
        
        // Filtros
        document.getElementById('filterStatus')?.addEventListener('change', (e) => {
            this.state.filters.status = e.target.value;
            this.renderIncidents();
        });

        document.getElementById('filterCriticality')?.addEventListener('change', (e) => {
            this.state.filters.criticality = e.target.value;
            this.renderIncidents();
        });

        document.getElementById('filterType')?.addEventListener('change', (e) => {
            this.state.filters.type = e.target.value;
            this.renderIncidents();
        });

        document.getElementById('searchIncidents')?.addEventListener('input', (e) => {
            this.state.filters.search = e.target.value;
            this.renderIncidents();
        });

        // Botón nueva incidencia
        document.getElementById('newIncidentBtn')?.addEventListener('click', () => {
            this.state.currentIncident = null;
            const form = document.getElementById('incidentForm');
            if (form) form.reset();
            const modalTitle = document.getElementById('incidentModalLabel');
            if (modalTitle) {
                const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
                modalTitle.textContent = translations[lang]["NEW_CYBERSECURITY_INCIDENT"] || "Nueva Incidencia de Ciberseguridad";
            }
            const priorityBadge = document.getElementById('calculatedPriority');
            if (priorityBadge) {
                const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
                priorityBadge.textContent = translations[lang]["NOT_CALCULATED"] || "Sin calcular";
                priorityBadge.className = 'badge bg-secondary';
            }
            this.populateFormSelects();
        });

        // Botón guardar incidencia
        document.getElementById('saveIncidentBtn')?.addEventListener('click', (e) => {
            this.saveIncidentFromForm(e);
        });

        // Actualizar prioridad calculada al cambiar impacto/urgencia
        document.getElementById('incidentImpact')?.addEventListener('change', () => {
            this.updateCalculatedPriority();
        });

        document.getElementById('incidentUrgency')?.addEventListener('change', () => {
            this.updateCalculatedPriority();
        });
    },

    /**
     * Actualizar subcategorías
     */
    updateSubcategories: function(category) {
        const subcatSelect = document.getElementById('sgsi-subcategory');
        if (!subcatSelect) return;

        const cat = CSTaxonomy.sgsiCategories.find(c => c.category === category);
        if (!cat) return;

        subcatSelect.innerHTML = '<option value="">Seleccionar subcategoría...</option>' +
            cat.subcategories.map(sub => `<option value="${sub}">${sub}</option>`).join('');
    },

    /**
     * Utilidades
     */
    generateId: function() {
        return 'inc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    deepMerge: function(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.deepMerge(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },

    isObject: function(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },

    populateFilters: function() {
        const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
        const allText = translations[lang]["ALL"] || "Todos";
        
        // Filtro de estado
        const statusFilter = document.getElementById('filterStatus');
        if (statusFilter) {
            statusFilter.innerHTML = `<option value="">-- ${allText} --</option>` + 
                CSTaxonomy.statuses.map(status => 
                    `<option value="${status.value}">${lang === 'en' ? status.labelEN : status.label}</option>`
                ).join('');
        }

        // Filtro de criticidad
        const critFilter = document.getElementById('filterCriticality');
        if (critFilter) {
            critFilter.innerHTML = `<option value="">-- ${allText} --</option>` + 
                CSTaxonomy.criticality.map(crit => 
                    `<option value="${crit.value}">${lang === 'en' ? crit.labelEN : crit.label}</option>`
                ).join('');
        }

        // Filtro de tipo
        const typeFilter = document.getElementById('filterType');
        if (typeFilter) {
            typeFilter.innerHTML = `<option value="">-- ${allText} --</option>` + 
                CSTaxonomy.incidentTypes.map(type => 
                    `<option value="${type.code}">${lang === 'en' ? type.labelEN : type.label}</option>`
                ).join('');
        }
    },

    updateCalculatedPriority: function() {
        const impact = document.getElementById('incidentImpact')?.value;
        const urgency = document.getElementById('incidentUrgency')?.value;
        const priorityBadge = document.getElementById('calculatedPriority');
        
        if (impact && urgency && priorityBadge) {
            const lang = Translations?.currentLanguage || localStorage.getItem("osintLanguage") || "es";
            const priority = CSTaxonomy.getPriority(impact, urgency);
            console.log(`🔍 Priority calculation: Impact=${impact}, Urgency=${urgency}, Result=${priority}`);
            const critObj = CSTaxonomy.criticality.find(c => c.value === priority);
            
            if (critObj) {
                priorityBadge.textContent = lang === 'en' ? critObj.labelEN : critObj.label;
                priorityBadge.className = 'badge badge-' + priority.toLowerCase();
                console.log(`✅ Priority set: ${priorityBadge.textContent}, class: ${priorityBadge.className}`);
            } else {
                console.error(`❌ No criticality object found for priority: ${priority}`);
            }
        }
    },

    showAlert: function(message, type = 'info') {
        // Implementar notificación (puede usar Toastr o Bootstrap Toast)
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // Fallback simple
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }
};

// Auto-inicializar si estamos en la página de incidentes
if (window.location.pathname.includes('incidents.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar autenticación
        if (!Auth.requireAuth()) return;
        
        IncidentManager.init();
    });
}
