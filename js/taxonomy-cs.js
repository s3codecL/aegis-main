/**
 * Aegis Dashboard - Cybersecurity Taxonomy
 * Version: 1.8.0
 * 
 * Taxonomías para clasificación de incidentes de ciberseguridad:
 * - Tipos de incidentes
 * - Clasificación SGSI
 * - Fases NIST 800-61 / ISO 27035
 * - MITRE ATT&CK Framework
 */

const CSTaxonomy = {
    /**
     * Tipos de incidentes con códigos estandarizados
     */
    incidentTypes: [
        { code: 'PHISH', label: 'Phishing / Spear Phishing', labelEN: 'Phishing / Spear Phishing', description: 'Suplantación de identidad para robar credenciales' },
        { code: 'MALW', label: 'Malware (general)', labelEN: 'Malware (general)', description: 'Código malicioso detectado' },
        { code: 'RANS', label: 'Ransomware', labelEN: 'Ransomware', description: 'Cifrado y extorsión de datos' },
        { code: 'DLEAK', label: 'Fuga de Datos', labelEN: 'Data Leak', description: 'Exfiltración o exposición de información' },
        { code: 'UNAUTH', label: 'Acceso No Autorizado', labelEN: 'Unauthorized Access', description: 'Ingreso sin permisos' },
        { code: 'ATO', label: 'Suplantación de Cuenta', labelEN: 'Account Takeover', description: 'Account Takeover' },
        { code: 'DDOS', label: 'DDoS / Ataques de Red', labelEN: 'DDoS / Network Attacks', description: 'Ataques de denegación de servicio' },
        { code: 'VULN', label: 'Vulnerabilidad Crítica', labelEN: 'Critical Vulnerability', description: 'Exposición técnica explotable' },
        { code: 'SOCENG', label: 'Ingeniería Social', labelEN: 'Social Engineering', description: 'Manipulación psicológica del usuario' },
        { code: 'MISCONF', label: 'Configuración Insegura', labelEN: 'Insecure Configuration', description: 'Error humano o técnico que expone sistemas' },
        { code: 'PHYSEC', label: 'Incidente Físico', labelEN: 'Physical Incident', description: 'Robo, pérdida o acceso físico no autorizado' },
        { code: 'INTRUD', label: 'Fraude Interno', labelEN: 'Internal Fraud', description: 'Incidente por actor interno' },
        { code: 'ZERO', label: 'Ataque de Día Cero', labelEN: 'Zero-Day Attack', description: 'Exploit aún sin parche público' },
        { code: 'NETANOM', label: 'Anomalía en Red', labelEN: 'Network Anomaly', description: 'Comportamiento inusual detectado en tráfico' }
    ],

    /**
     * Áreas organizacionales
     */
    areas: [
        { code: 'CS', label: 'CyberSecurity', description: 'Equipo de ciberseguridad' },
        { code: 'SOC', label: 'SOC', description: 'Security Operations Center' },
        { code: 'IT', label: 'IT', description: 'Tecnologías de la Información' },
        { code: 'NET', label: 'Network', description: 'Infraestructura de red' },
        { code: 'CLOUD', label: 'Cloud', description: 'Servicios en la nube' },
        { code: 'APP', label: 'Applications', description: 'Aplicaciones corporativas' },
        { code: 'DATA', label: 'Data', description: 'Gestión de datos' },
        { code: 'OPS', label: 'Operations', description: 'Operaciones' }
    ],

    /**
     * Canales de detección (más generales y prácticos)
     */
    detectionChannels: [
        { value: 'end_user', label: 'Usuario final (reporte directo)', labelEN: 'End User (direct report)' },
        { value: 'email', label: 'Correo electrónico', labelEN: 'Email' },
        { value: 'teams_slack', label: 'Teams / Slack', labelEN: 'Teams / Slack' },
        { value: 'crm_tickets', label: 'CRM / Sistema de tickets', labelEN: 'CRM / Ticketing System' },
        { value: 'phone_support', label: 'Teléfono / Soporte', labelEN: 'Phone / Support' },
        { value: 'siem', label: 'SIEM / Monitoreo', labelEN: 'SIEM / Monitoring' },
        { value: 'antivirus_edr', label: 'Antivirus / EDR', labelEN: 'Antivirus / EDR' },
        { value: 'firewall_ids', label: 'Firewall / IDS', labelEN: 'Firewall / IDS' },
        { value: 'internal_audit', label: 'Auditoría interna', labelEN: 'Internal Audit' },
        { value: 'external_vendor', label: 'Proveedor externo', labelEN: 'External Vendor' },
        { value: 'social_media', label: 'Redes sociales', labelEN: 'Social Media' },
        { value: 'other', label: 'Otro', labelEN: 'Other' }
    ],

    /**
     * Niveles de criticidad
     */
    criticality: [
        { value: 'Low', label: 'Baja', labelEN: 'Low', color: '#28a745', description: 'Impacto mínimo en operaciones' },
        { value: 'Medium', label: 'Media', labelEN: 'Medium', color: '#ffc107', description: 'Impacto moderado, requiere atención' },
        { value: 'High', label: 'Alta', labelEN: 'High', color: '#fd7e14', description: 'Impacto significativo, prioridad alta' },
        { value: 'Critical', label: 'Crítica', labelEN: 'Critical', color: '#dc3545', description: 'Impacto severo, atención inmediata' }
    ],

    /**
     * Estados del incidente
     */
    statuses: [
        { value: 'Open', label: 'Abierto', labelEN: 'Open', color: '#0d6efd', icon: '🔵' },
        { value: 'Investigating', label: 'En Investigación', labelEN: 'Investigating', color: '#ffc107', icon: '🔍' },
        { value: 'Contained', label: 'Contenido', labelEN: 'Contained', color: '#0dcaf0', icon: '🛡️' },
        { value: 'Resolved', label: 'Resuelto', labelEN: 'Resolved', color: '#20c997', icon: '✅' },
        { value: 'Closed', label: 'Cerrado', labelEN: 'Closed', color: '#6c757d', icon: '⚫' }
    ],

    /**
     * Clasificación SGSI - Impacto
     */
    impact: [
        { value: 'Localized', label: 'Menor / Localizado', labelEN: 'Minor / Localized', description: 'Usuarios internos individuales o casos particulares de servicios menores afectados' },
        { value: 'Limited', label: 'Moderado / Limitado', labelEN: 'Moderate / Limited', description: 'Se ven afectadas distintas áreas internas o un servicio en ciertas funcionalidades' },
        { value: 'Wide', label: 'Significativo / Amplio', labelEN: 'Significant / Wide', description: 'Existen servicios afectados por sí solos, algunos servicios se ven afectados, sin embargo otros se entregan sin problemas' },
        { value: 'Extensive', label: 'Extenso / Generalizado', labelEN: 'Extensive / Generalized', description: 'El incidente ha afectado a todos los servicios críticos, evitando operar con normalidad' }
    ],

    /**
     * Clasificación SGSI - Urgencia
     */
    urgency: [
        { value: 'Low', label: 'Baja', labelEN: 'Low', description: 'Más de tres días para su resolución; se puede acordar con el usuario el plazo' },
        { value: 'Medium', label: 'Media', labelEN: 'Medium', description: 'Existe tolerancia en la atención del incidente, no superando los dos días desde el inicio' },
        { value: 'High', label: 'Alta', labelEN: 'High', description: 'El incidente debe ser superado durante la jornada laboral' },
        { value: 'Critical', label: 'Crítica', labelEN: 'Critical', description: 'Existen compromisos de servicios que afecta las operaciones y servicios críticos' }
    ],

    /**
     * Matriz de Prioridad (Impacto x Urgencia)
     * Según documentación oficial:
     *                        Baja    Media    Alta    Crítica
     * Menor/Localizado       Baja    Media    Media   Alta
     * Moderado/Limitado      Baja    Media    Alta    Alta
     * Significativo/Amplio   Baja    Media    Alta    Máxima
     * Extenso/Generalizado   Baja    Alta     Máxima Máxima
     */
    getPriority: function(impact, urgency) {
        const priorityMatrix = {
            // Menor / Localizado
            'Localized-Low': 'Low',
            'Localized-Medium': 'Medium',
            'Localized-High': 'Medium',
            'Localized-Critical': 'High',
            // Moderado / Limitado
            'Limited-Low': 'Low',
            'Limited-Medium': 'Medium',
            'Limited-High': 'High',
            'Limited-Critical': 'High',
            // Significativo / Amplio
            'Wide-Low': 'Low',
            'Wide-Medium': 'Medium',
            'Wide-High': 'High',
            'Wide-Critical': 'Critical',
            // Extenso / Generalizado
            'Extensive-Low': 'Low',
            'Extensive-Medium': 'High',
            'Extensive-High': 'Critical',
            'Extensive-Critical': 'Critical'
        };
        
        const key = `${impact}-${urgency}`;
        return priorityMatrix[key] || 'Medium';
    },

    /**
     * Categorías SGSI
     */
    sgsiCategories: [
        {
            category: 'Ataques a Contraseñas',
            categoryEN: 'Password Attacks',
            subcategories: [
                'Fuerza bruta',
                'Credential Stuffing',
                'Phishing de credenciales',
                'Password Spraying'
            ]
        },
        {
            category: 'Malware y Ransomware',
            categoryEN: 'Malware & Ransomware',
            subcategories: [
                'Troyano',
                'Ransomware',
                'Spyware',
                'Rootkit',
                'Cryptominer'
            ]
        },
        {
            category: 'Acceso No Autorizado',
            categoryEN: 'Unauthorized Access',
            subcategories: [
                'Escalada de privilegios',
                'Bypass de autenticación',
                'Sesión comprometida',
                'Acceso físico indebido'
            ]
        },
        {
            category: 'Fuga de Información',
            categoryEN: 'Information Leakage',
            subcategories: [
                'Exfiltración de datos',
                'Shadow IT',
                'Filtración accidental',
                'Robo de propiedad intelectual'
            ]
        },
        {
            category: 'Ataques de Red',
            categoryEN: 'Network Attacks',
            subcategories: [
                'DDoS',
                'Man-in-the-Middle',
                'ARP Spoofing',
                'DNS Hijacking',
                'Escaneo de puertos'
            ]
        },
        {
            category: 'Ingeniería Social',
            categoryEN: 'Social Engineering',
            subcategories: [
                'Phishing',
                'Spear Phishing',
                'Whaling',
                'Pretexting',
                'Baiting'
            ]
        },
        {
            category: 'Vulnerabilidades',
            categoryEN: 'Vulnerabilities',
            subcategories: [
                'Zero-Day',
                'Configuración insegura',
                'Software sin parchar',
                'Exposición de servicios'
            ]
        }
    ],

    /**
     * Fases NIST 800-61 / ISO 27035
     */
    nistPhases: [
        { id: 1, label: '1. Preparación', labelEN: '1. Preparation', description: 'Políticas, herramientas y formación' },
        { id: 2, label: '2. Detección y Análisis', labelEN: '2. Detection & Analysis', description: 'Identificación y evaluación del incidente' },
        { id: 3, label: '3. Contención', labelEN: '3. Containment', description: 'Aislamiento del incidente' },
        { id: 4, label: '4. Erradicación', labelEN: '4. Eradication', description: 'Eliminación de la amenaza' },
        { id: 5, label: '5. Recuperación', labelEN: '5. Recovery', description: 'Restauración de servicios' },
        { id: 6, label: '6. Post-mortem', labelEN: '6. Post-mortem', description: 'Lecciones aprendidas y mejoras' }
    ],

    /**
     * Tácticas MITRE ATT&CK (selección común)
     */
    mitreAttack: [
        { id: 'TA0001', label: 'Initial Access (Acceso Inicial)', labelEN: 'Initial Access', tactic: 'Initial Access', techniques: ['T1566.001', 'T1566.002', 'T1078'] },
        { id: 'TA0002', label: 'Execution (Ejecución)', labelEN: 'Execution', tactic: 'Execution', techniques: ['T1059.001', 'T1059.003', 'T1204'] },
        { id: 'TA0003', label: 'Persistence (Persistencia)', labelEN: 'Persistence', tactic: 'Persistence', techniques: ['T1136', 'T1098', 'T1547'] },
        { id: 'TA0004', label: 'Privilege Escalation (Escalada de Privilegios)', labelEN: 'Privilege Escalation', tactic: 'Privilege Escalation', techniques: ['T1068', 'T1134', 'T1078'] },
        { id: 'TA0005', label: 'Defense Evasion (Evasión de Defensas)', labelEN: 'Defense Evasion', tactic: 'Defense Evasion', techniques: ['T1070', 'T1036', 'T1562'] },
        { id: 'TA0006', label: 'Credential Access (Acceso a Credenciales)', labelEN: 'Credential Access', tactic: 'Credential Access', techniques: ['T1110', 'T1003', 'T1555'] },
        { id: 'TA0007', label: 'Discovery (Descubrimiento)', labelEN: 'Discovery', tactic: 'Discovery', techniques: ['T1087', 'T1082', 'T1083'] },
        { id: 'TA0008', label: 'Lateral Movement (Movimiento Lateral)', labelEN: 'Lateral Movement', tactic: 'Lateral Movement', techniques: ['T1021', 'T1570', 'T1534'] },
        { id: 'TA0009', label: 'Collection (Recopilación)', labelEN: 'Collection', tactic: 'Collection', techniques: ['T1005', 'T1056', 'T1213'] },
        { id: 'TA0010', label: 'Exfiltration (Exfiltración)', labelEN: 'Exfiltration', tactic: 'Exfiltration', techniques: ['T1041', 'T1048', 'T1567'] },
        { id: 'TA0011', label: 'Impact (Impacto)', tactic: 'Impact', techniques: ['T1486', 'T1489', 'T1490'] }
    ],

    /**
     * Roles de asignación con SLAs predeterminados
     */
    assignmentRoles: [
        { role: 'Containment', label: 'Contención', defaultSLA: '1h', description: 'Aislar sistema afectado' },
        { role: 'Analysis', label: 'Análisis', defaultSLA: '2h', description: 'Revisar logs, determinar alcance' },
        { role: 'Remediation', label: 'Remediación', defaultSLA: '4h', description: 'Parches, restaurar entorno seguro' }
    ],

    /**
     * Generar código de incidente
     */
    generateIncidentCode: function(type, area, date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Obtener secuencia desde localStorage
        const incidents = JSON.parse(localStorage.getItem('aegisIncidents') || '[]');
        const todayIncidents = incidents.filter(inc => {
            const incDate = new Date(inc.detection.timestamp);
            return incDate.toDateString() === date.toDateString();
        });
        const sequence = String(todayIncidents.length + 1).padStart(4, '0');
        
        return `INC-${type}-${area}-${year}-${month}${day}-${sequence}`;
    },

    /**
     * Obtener label por código
     */
    getIncidentTypeLabel: function(code) {
        const type = this.incidentTypes.find(t => t.code === code);
        return type ? type.label : code;
    },

    /**
     * Obtener color por criticidad
     */
    getCriticalityColor: function(criticality) {
        const crit = this.criticality.find(c => c.value === criticality);
        return crit ? crit.color : '#6c757d';
    },

    /**
     * Obtener label de criticidad traducido
     */
    getCriticalityLabel: function(criticality, lang = null) {
        const currentLang = lang || (typeof Translations !== 'undefined' ? Translations.currentLanguage : null) || localStorage.getItem("osintLanguage") || "es";
        const crit = this.criticality.find(c => c.value === criticality);
        if (crit) {
            return currentLang === 'en' ? crit.labelEN : crit.label;
        }
        return criticality;
    },

    /**
     * Obtener label de tipo de incidente traducido
     */
    getIncidentTypeLabel: function(typeCode, lang = null) {
        const currentLang = lang || (typeof Translations !== 'undefined' ? Translations.currentLanguage : null) || localStorage.getItem("osintLanguage") || "es";
        const type = this.incidentTypes.find(t => t.code === typeCode);
        if (type) {
            return currentLang === 'en' ? type.labelEN : type.label;
        }
        return typeCode;
    },

    /**
     * Obtener estado visual
     */
    getStatusBadge: function(status, lang = null) {
        const currentLang = lang || (typeof Translations !== 'undefined' ? Translations.currentLanguage : null) || localStorage.getItem("osintLanguage") || "es";
        const st = this.statuses.find(s => s.value === status);
        if (st) {
            const label = currentLang === 'en' ? st.labelEN : st.label;
            return { icon: st.icon, label: label, color: st.color };
        }
        return { icon: '⚪', label: status, color: '#6c757d' };
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSTaxonomy;
}
