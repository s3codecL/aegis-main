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

export const CSTaxonomy = {
    // Niveles de criticidad
    criticality: [
        { value: 'Low', label: 'Baja', labelEN: 'Low' },
        { value: 'Medium', label: 'Media', labelEN: 'Medium' },
        { value: 'High', label: 'Alta', labelEN: 'High' },
        { value: 'Critical', label: 'Crítica', labelEN: 'Critical' }
    ],

    // Tipos de incidentes (NIST / ENISA)
    incidentTypes: [
        { code: 'MALWARE', label: 'Malware / Código Malicioso', labelEN: 'Malware / Malicious Code' },
        { code: 'PHISHING', label: 'Phishing / Ingeniería Social', labelEN: 'Phishing / Social Engineering' },
        { code: 'UNAUTHORIZED_ACCESS', label: 'Acceso No Autorizado', labelEN: 'Unauthorized Access' },
        { code: 'DOS', label: 'Denegación de Servicio (DoS)', labelEN: 'Denial of Service (DoS)' },
        { code: 'DATA_BREACH', label: 'Fuga de Información', labelEN: 'Data Breach / Leak' },
        { code: 'WEB_ATTACK', label: 'Ataque Web (SQLi, XSS, etc.)', labelEN: 'Web Attack' },
        { code: 'RANSOMWARE', label: 'Ransomware', labelEN: 'Ransomware' },
        { code: 'VULNERABILITY', label: 'Explotación de Vulnerabilidades', labelEN: 'Vulnerability Exploitation' },
        { code: 'PHYSICAL', label: 'Incidente Físico / Robo', labelEN: 'Physical Incident / Theft' },
        { code: 'POLICY_VIOLATION', label: 'Violación de Políticas', labelEN: 'Policy Violation' },
        { code: 'OTHER', label: 'Otros', labelEN: 'Others' }
    ],

    // Áreas Organizacionales
    areas: [
        { code: 'IT', label: 'Tecnologías de la Información (IT)' },
        { code: 'OT', label: 'Tecnología de Operaciones (OT / ICS)' },
        { code: 'LEGAL', label: 'Legal / Cumplimiento' },
        { code: 'HR', label: 'Recursos Humanos' },
        { code: 'FINANCE', label: 'Finanzas / Contabilidad' },
        { code: 'OPS', label: 'Operaciones / Logística' },
        { code: 'CSIRT', label: 'Seguridad / CSIRT' },
        { code: 'EXTERNAL', label: 'Terceros / Proveedores' }
    ],

    // Canales de Detección
    detectionChannels: [
        { value: 'SIEM', label: 'SIEM / Alertas Automáticas', labelEN: 'SIEM / Auto Alerts' },
        { value: 'USER_REPORT', label: 'Reporte de Usuario', labelEN: 'User Report' },
        { value: 'EDR_XDR', label: 'EDR / XDR / Antivirus', labelEN: 'EDR / XDR / AV' },
        { value: 'IDS_IPS', label: 'IDS / IPS / Firewall', labelEN: 'IDS / IPS / Firewall' },
        { value: 'INTERNAL_AUDIT', label: 'Auditoría Interna', labelEN: 'Internal Audit' },
        { value: 'EXTERNAL_INTEL', label: 'Inteligencia Externa / OSINT', labelEN: 'External Intel / OSINT' },
        { value: 'SOC_MONITORING', label: 'Monitoreo SOC', labelEN: 'SOC Monitoring' }
    ],

    // Estados del Incidente
    statuses: [
        { value: 'Open', label: 'Abierto', labelEN: 'Open' },
        { value: 'In Progress', label: 'En Investigación', labelEN: 'In Progress' },
        { value: 'Contained', label: 'Contenido', labelEN: 'Contained' },
        { value: 'Resolved', label: 'Resuelto', labelEN: 'Resolved' },
        { value: 'Closed', label: 'Cerrado', labelEN: 'Closed' }
    ],

    // Fases NIST 800-61
    nistPhases: [
        { id: 'PREP', label: 'Preparación', labelEN: 'Preparation' },
        { id: 'DET_ANA', label: 'Detección y Análisis', labelEN: 'Detection & Analysis' },
        { id: 'CONT_ERAD_REC', label: 'Contención, Erradicación y Recuperación', labelEN: 'Containment, Eradication & Recovery' },
        { id: 'POST_INC', label: 'Actividad Post-Incidente', labelEN: 'Post-Incident Activity' }
    ],

    // Tácticas MITRE ATT&CK
    mitreAttack: [
        { id: 'TA0001', label: 'Acceso Inicial', labelEN: 'Initial Access' },
        { id: 'TA0002', label: 'Ejecución', labelEN: 'Execution' },
        { id: 'TA0003', label: 'Persistencia', labelEN: 'Persistence' },
        { id: 'TA0004', label: 'Escalada de Privilegios', labelEN: 'Privilege Escalation' },
        { id: 'TA0005', label: 'Evasión de Defensas', labelEN: 'Defense Evasion' },
        { id: 'TA0006', label: 'Acceso a Credenciales', labelEN: 'Credential Access' },
        { id: 'TA0007', label: 'Descubrimiento', labelEN: 'Discovery' },
        { id: 'TA0008', label: 'Movimiento Lateral', labelEN: 'Lateral Movement' },
        { id: 'TA0009', label: 'Recolección', labelEN: 'Collection' },
        { id: 'TA0011', label: 'Comando y Control', labelEN: 'Command and Control' },
        { id: 'TA0010', label: 'Exfiltración', labelEN: 'Exfiltration' },
        { id: 'TA0040', label: 'Impacto', labelEN: 'Impact' }
    ],

    // Categorías SGSI (Basado en ISO 27001/27035)
    sgsiCategories: [
        { category: 'Acceso No Autorizado', categoryEN: 'Unauthorized Access' },
        { category: 'Denegación de Servicio', categoryEN: 'Denial of Service' },
        { category: 'Código Malicioso', categoryEN: 'Malicious Code' },
        { category: 'Uso Indebido de Activos', categoryEN: 'Improper Asset Usage' },
        { category: 'Fuga de Información', categoryEN: 'Information Leak' },
        { category: 'Incidente Físico', categoryEN: 'Physical Incident' },
        { category: 'Falla de Servicio', categoryEN: 'Service Failure' },
        { category: 'Vulnerabilidad Explorada', categoryEN: 'Exploited Vulnerability' }
    ],

    /**
     * Generar código de incidente automático (ej: AEG-MAL-001)
     */
    generateIncidentCode: function (typeCode, areaCode) {
        const prefix = 'AEG';
        const type = typeCode ? typeCode.substring(0, 3).toUpperCase() : 'OTH';
        const area = areaCode ? areaCode.substring(0, 2).toUpperCase() : 'GE';
        const random = Math.floor(Math.random() * 900) + 100;
        return `${prefix}-${type}-${area}-${random}`;
    },

    /**
     * Calcular prioridad según Impacto y Urgencia (Matriz ITIL/SGSI)
     */
    getPriority: function (impact, urgency) {
        if (!impact || !urgency) return 'Low';

        const map = {
            'High': { 'High': 'Critical', 'Medium': 'High', 'Low': 'Medium' },
            'Medium': { 'High': 'High', 'Medium': 'Medium', 'Low': 'Low' },
            'Low': { 'High': 'Medium', 'Medium': 'Low', 'Low': 'Low' }
        };

        return map[impact][urgency] || 'Low';
    },

    /**
     * Obtener color según criticidad
     */
    getCriticalityColor: function (criticality) {
        const colors = {
            'Critical': '#dc3545',
            'High': '#fd7e14',
            'Medium': '#ffc107',
            'Low': '#28a745'
        };
        return colors[criticality] || '#6c757d';
    },

    /**
     * Obtener label de criticidad según idioma
     */
    getCriticalityLabel: function (criticality, lang = 'es') {
        const labels = {
            'Critical': { es: 'Crítica', en: 'Critical' },
            'High': { es: 'Alta', en: 'High' },
            'Medium': { es: 'Media', en: 'Medium' },
            'Low': { es: 'Baja', en: 'Low' }
        };
        return labels[criticality] ? labels[criticality][lang] : criticality;
    },

    /**
     * Obtener badge de estado
     */
    getStatusBadge: function (status, lang = 'es') {
        const badges = {
            'Open': { label: lang === 'en' ? 'Open' : 'Abierto', color: '#3b82f6', icon: '🔵' },
            'In Progress': { label: lang === 'en' ? 'In Progress' : 'En Investigación', color: '#f59e0b', icon: '🔍' },
            'Contained': { label: lang === 'en' ? 'Contained' : 'Contenido', color: '#8b5cf6', icon: '🛡️' },
            'Resolved': { label: lang === 'en' ? 'Resolved' : 'Resuelto', color: '#10b981', icon: '✅' },
            'Closed': { label: lang === 'en' ? 'Closed' : 'Cerrado', color: '#6b7280', icon: '📁' }
        };
        return badges[status] || { label: status, color: '#6b7280', icon: '⚪' };
    },

    /**
     * Obtener label de tipo de incidente por código
     */
    getIncidentTypeLabel: function (code, lang = 'es') {
        const type = this.incidentTypes.find(t => t.code === code);
        if (!type) return code;
        return lang === 'en' ? type.labelEN : type.label;
    }
};

// Exportar para uso global y compatibilidad
window.CSTaxonomy = CSTaxonomy;
export default CSTaxonomy;
