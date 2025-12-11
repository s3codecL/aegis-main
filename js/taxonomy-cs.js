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
        { code: 'PHISH', label: 'Phishing / Spear Phishing', description: 'Suplantación de identidad para robar credenciales' },
        { code: 'MALW', label: 'Malware (general)', description: 'Código malicioso detectado' },
        { code: 'RANS', label: 'Ransomware', description: 'Cifrado y extorsión de datos' },
        { code: 'DLEAK', label: 'Fuga de Datos', description: 'Exfiltración o exposición de información' },
        { code: 'UNAUTH', label: 'Acceso No Autorizado', description: 'Ingreso sin permisos' },
        { code: 'ATO', label: 'Suplantación de Cuenta', description: 'Account Takeover' },
        { code: 'DDOS', label: 'DDoS / Ataques de Red', description: 'Ataques de denegación de servicio' },
        { code: 'VULN', label: 'Vulnerabilidad Crítica', description: 'Exposición técnica explotable' },
        { code: 'SOCENG', label: 'Ingeniería Social', description: 'Manipulación psicológica del usuario' },
        { code: 'MISCONF', label: 'Configuración Insegura', description: 'Error humano o técnico que expone sistemas' },
        { code: 'PHYSEC', label: 'Incidente Físico', description: 'Robo, pérdida o acceso físico no autorizado' },
        { code: 'INTRUD', label: 'Fraude Interno', description: 'Incidente por actor interno' },
        { code: 'ZERO', label: 'Ataque de Día Cero', description: 'Exploit aún sin parche público' },
        { code: 'NETANOM', label: 'Anomalía en Red', description: 'Comportamiento inusual detectado en tráfico' }
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
        'Usuario final (reporte directo)',
        'Correo electrónico',
        'Teams / Slack',
        'CRM / Sistema de tickets',
        'Teléfono / Soporte',
        'SIEM / Monitoreo',
        'Antivirus / EDR',
        'Firewall / IDS',
        'Auditoría interna',
        'Proveedor externo',
        'Redes sociales',
        'Otro'
    ],

    /**
     * Niveles de criticidad
     */
    criticality: [
        { value: 'Low', label: 'Baja', color: '#28a745', description: 'Impacto mínimo en operaciones' },
        { value: 'Medium', label: 'Media', color: '#ffc107', description: 'Impacto moderado, requiere atención' },
        { value: 'High', label: 'Alta', color: '#fd7e14', description: 'Impacto significativo, prioridad alta' },
        { value: 'Critical', label: 'Crítica', color: '#dc3545', description: 'Impacto severo, atención inmediata' }
    ],

    /**
     * Estados del incidente
     */
    statuses: [
        { value: 'Open', label: 'Abierto', color: '#0d6efd', icon: '🔵' },
        { value: 'Investigating', label: 'En Investigación', color: '#ffc107', icon: '🔍' },
        { value: 'Contained', label: 'Contenido', color: '#0dcaf0', icon: '🛡️' },
        { value: 'Resolved', label: 'Resuelto', color: '#20c997', icon: '✅' },
        { value: 'Closed', label: 'Cerrado', color: '#6c757d', icon: '⚫' }
    ],

    /**
     * Clasificación SGSI - Impacto
     */
    impact: [
        { value: 'Minor', label: 'Menor', description: 'Sin impacto significativo en servicios' },
        { value: 'Moderate', label: 'Moderado', description: 'Degradación parcial de servicios' },
        { value: 'Major', label: 'Mayor', description: 'Interrupción significativa de servicios críticos' },
        { value: 'Critical', label: 'Crítico', description: 'Fallo total de servicios esenciales' }
    ],

    /**
     * Clasificación SGSI - Urgencia
     */
    urgency: [
        { value: 'Low', label: 'Baja', description: 'Puede esperar resolución programada' },
        { value: 'Medium', label: 'Media', description: 'Requiere atención en horas' },
        { value: 'High', label: 'Alta', description: 'Requiere atención inmediata' },
        { value: 'Critical', label: 'Crítica', description: 'Respuesta urgente, en minutos' }
    ],

    /**
     * Matriz de Prioridad (Impacto x Urgencia)
     */
    getPriority: function(impact, urgency) {
        const priorityMatrix = {
            'Minor-Low': 'Low',
            'Minor-Medium': 'Low',
            'Minor-High': 'Medium',
            'Minor-Critical': 'Medium',
            'Moderate-Low': 'Low',
            'Moderate-Medium': 'Medium',
            'Moderate-High': 'Medium',
            'Moderate-Critical': 'High',
            'Major-Low': 'Medium',
            'Major-Medium': 'Medium',
            'Major-High': 'High',
            'Major-Critical': 'High',
            'Critical-Low': 'Medium',
            'Critical-Medium': 'High',
            'Critical-High': 'High',
            'Critical-Critical': 'Critical'
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
            subcategories: [
                'Fuerza bruta',
                'Credential Stuffing',
                'Phishing de credenciales',
                'Password Spraying'
            ]
        },
        {
            category: 'Malware y Ransomware',
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
            subcategories: [
                'Escalada de privilegios',
                'Bypass de autenticación',
                'Sesión comprometida',
                'Acceso físico indebido'
            ]
        },
        {
            category: 'Fuga de Información',
            subcategories: [
                'Exfiltración de datos',
                'Shadow IT',
                'Filtración accidental',
                'Robo de propiedad intelectual'
            ]
        },
        {
            category: 'Ataques de Red',
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
        { id: 1, label: '1. Preparación', description: 'Políticas, herramientas y formación' },
        { id: 2, label: '2. Detección y Análisis', description: 'Identificación y evaluación del incidente' },
        { id: 3, label: '3. Contención', description: 'Aislamiento del incidente' },
        { id: 4, label: '4. Erradicación', description: 'Eliminación de la amenaza' },
        { id: 5, label: '5. Recuperación', description: 'Restauración de servicios' },
        { id: 6, label: '6. Post-mortem', description: 'Lecciones aprendidas y mejoras' }
    ],

    /**
     * Tácticas MITRE ATT&CK (selección común)
     */
    mitreAttack: [
        { id: 'TA0001', label: 'Initial Access (Acceso Inicial)', tactic: 'Initial Access', techniques: ['T1566.001', 'T1566.002', 'T1078'] },
        { id: 'TA0002', label: 'Execution (Ejecución)', tactic: 'Execution', techniques: ['T1059.001', 'T1059.003', 'T1204'] },
        { id: 'TA0003', label: 'Persistence (Persistencia)', tactic: 'Persistence', techniques: ['T1136', 'T1098', 'T1547'] },
        { id: 'TA0004', label: 'Privilege Escalation (Escalada de Privilegios)', tactic: 'Privilege Escalation', techniques: ['T1068', 'T1134', 'T1078'] },
        { id: 'TA0005', label: 'Defense Evasion (Evasión de Defensas)', tactic: 'Defense Evasion', techniques: ['T1070', 'T1036', 'T1562'] },
        { id: 'TA0006', label: 'Credential Access (Acceso a Credenciales)', tactic: 'Credential Access', techniques: ['T1110', 'T1003', 'T1555'] },
        { id: 'TA0007', label: 'Discovery (Descubrimiento)', tactic: 'Discovery', techniques: ['T1087', 'T1082', 'T1083'] },
        { id: 'TA0008', label: 'Lateral Movement (Movimiento Lateral)', tactic: 'Lateral Movement', techniques: ['T1021', 'T1570', 'T1534'] },
        { id: 'TA0009', label: 'Collection (Recopilación)', tactic: 'Collection', techniques: ['T1005', 'T1056', 'T1213'] },
        { id: 'TA0010', label: 'Exfiltration (Exfiltración)', tactic: 'Exfiltration', techniques: ['T1041', 'T1048', 'T1567'] },
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
     * Obtener estado visual
     */
    getStatusBadge: function(status) {
        const st = this.statuses.find(s => s.value === status);
        return st ? { icon: st.icon, label: st.label, color: st.color } : { icon: '⚪', label: status, color: '#6c757d' };
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSTaxonomy;
}
