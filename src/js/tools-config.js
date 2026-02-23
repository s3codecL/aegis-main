export const toolsData = [
  // WEBSITE_SECURITY (15)
  { id: "vt", name: "VirusTotal", template: "https://www.virustotal.com/gui/search/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "urlscan", name: "URLScan", template: "https://urlscan.io/search/#{{query}}", category: "WEBSITE_SECURITY" },
  { id: "webcheck", name: "Web Check", template: "https://web-check.xyz/check/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "gsafebrowsing", name: "Google Safe Browsing", template: "https://transparencyreport.google.com/safe-browsing/search?url={{query}}", category: "WEBSITE_SECURITY" },
  { id: "mywot", name: "MyWOT", template: "https://www.mywot.com/scorecard/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "sucuri", name: "Sucuri SiteCheck", template: "https://sitecheck.sucuri.net/results/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "builtwith", name: "BuiltWith", template: "https://builtwith.com/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "urlvoid", name: "URL Void", template: "https://www.urlvoid.com/scan/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "securityheaders", name: "SecurityHeaders", template: "https://securityheaders.com/?q={{query}}", category: "WEBSITE_SECURITY" },
  { id: "mozilla-observatory", name: "Mozilla Observatory", template: "https://observatory.mozilla.org/analyze/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "sitechecker", name: "Site Checker", url: "https://sitechecker.pro/", category: "WEBSITE_SECURITY" },
  { id: "sitereport-netcraft", name: "Netcraft Site Report", template: "https://sitereport.netcraft.com/?url={{query}}", category: "WEBSITE_SECURITY" },
  { id: "downforeveryoneorjustme", name: "Down for Everyone or Just Me", template: "https://downforeveryoneorjustme.com/{{query}}", category: "WEBSITE_SECURITY" },
  { id: "redirectdetective", name: "Redirect Detective", template: "https://redirectdetective.com/index.php?url={{query}}", category: "WEBSITE_SECURITY" },
  { id: "phishly", name: "Phish.ly", url: "https://phish.ly/", category: "WEBSITE_SECURITY" },

  // SEARCH_TOOLS (12)
  { id: "shodan", name: "Shodan", template: "https://www.shodan.io/search?query={{query}}", category: "SEARCH_TOOLS" },
  { id: "censys", name: "Censys", template: "https://search.censys.io/search?resource=hosts&q={{query}}", category: "SEARCH_TOOLS" },
  { id: "intelx", name: "IntelX", template: "https://intelx.io/?s={{query}}", category: "SEARCH_TOOLS" },
  { id: "hunter", name: "Hunter.io", template: "https://hunter.io/search/{{query}}", category: "SEARCH_TOOLS" },
  { id: "zoomeye", name: "ZoomEye", template: "https://www.zoomeye.org/searchResult?q={{query}}", category: "SEARCH_TOOLS" },
  { id: "onyphe", name: "Onyphe", template: "https://www.onyphe.io/search/?query={{query}}", category: "SEARCH_TOOLS" },
  { id: "binaryedge", name: "BinaryEdge", template: "https://app.binaryedge.io/services/query?query={{query}}", category: "SEARCH_TOOLS" },
  { id: "wigle", name: "WiGle", template: "https://wigle.net/search?query={{query}}", category: "SEARCH_TOOLS" },
  { id: "greynoise", name: "GreyNoise", template: "https://viz.greynoise.io/query?gnql={{query}}", category: "SEARCH_TOOLS" },
  { id: "fofa", name: "FOFA", template: "https://fofa.info/result?qbase64={{query}}", category: "SEARCH_TOOLS" },
  { id: "criminalip", name: "Criminal IP", template: "https://www.criminalip.io/en/search?query={{query}}", category: "SEARCH_TOOLS" },
  { id: "leakcheck", name: "LeakCheck", template: "https://leakcheck.net/search/{{query}}", category: "SEARCH_TOOLS" },

  // IP_INFO (9)
  { id: "ipinfo", name: "IPInfo", template: "https://ipinfo.io/{{query}}", category: "IP_INFO" },
  { id: "maxmind", name: "MaxMind", template: "https://www.maxmind.com/en/geoip2-precision-demo?ip_address={{query}}", category: "IP_INFO" },
  { id: "whoisip", name: "Whois IP", template: "https://who.is/whois-ip/ip-address/{{query}}", category: "IP_INFO" },
  { id: "ip-api", name: "IP-API", template: "https://ip-api.com/#{{query}}", category: "IP_INFO" },
  { id: "ipstack", name: "ipstack", template: "https://ipstack.com/dashboard?query={{query}}", category: "IP_INFO" },
  { id: "nordvpn-ip-lookup", name: "NordVPN IP Lookup", template: "https://nordvpn.com/es/ip-lookup/?ip={{query}}", category: "IP_INFO" },
  { id: "liveipmap", name: "Live IP Map", template: "https://www.liveipmap.com/?ip={{query}}", category: "IP_INFO" },
  { id: "bgp-tools", name: "BGP.tools", template: "https://bgp.tools/search?q={{query}}", category: "IP_INFO" },
  { id: "multirbl", name: "MultiRBL", template: "https://multirbl.valli.org/lookup/{{query}}", category: "IP_INFO" },

  // MALWARE_ANALYSIS (8)
  { id: "hybridanalysis", name: "Hybrid Analysis", template: "https://www.hybrid-analysis.com/search?query={{query}}", category: "MALWARE_ANALYSIS" },
  { id: "urlhaus", name: "URLhaus", template: "https://urlhaus.abuse.ch/browse.php?search={{query}}", category: "MALWARE_ANALYSIS" },
  { id: "metadefender", name: "MetaDefender", template: "https://metadefender.opentext.com/results/{{query}}", category: "MALWARE_ANALYSIS" },
  { id: "anyrun", name: "Any.run", template: "https://app.any.run/submissions/#{{query}}", category: "MALWARE_ANALYSIS" },
  { id: "joesandbox", name: "Joe Sandbox", template: "https://www.joesandbox.com/search?q={{query}}", category: "MALWARE_ANALYSIS" },
  { id: "cuckoo", name: "Cuckoo Sandbox", url: "https://cuckoosandbox.org/", category: "MALWARE_ANALYSIS" },
  { id: "malwarebazaar", name: "MalwareBazaar", template: "https://bazaar.abuse.ch/browse.php?search={{query}}", category: "MALWARE_ANALYSIS" },
  { id: "vt-upload", name: "VirusTotal Upload", url: "https://www.virustotal.com/gui/home/upload", category: "MALWARE_ANALYSIS" },

  // THREAT_INTELLIGENCE (8)
  { id: "abuseipdb", name: "AbuseIPDB", template: "https://www.abuseipdb.com/check/{{query}}", category: "THREAT_INTELLIGENCE" },
  { id: "pulsedive", name: "Pulsedive", template: "https://pulsedive.com/indicator/?ioc={{query}}", category: "THREAT_INTELLIGENCE" },
  { id: "socradar", name: "SOC Radar IOC", template: "https://socradar.io/ioc-search/?query={{query}}", category: "THREAT_INTELLIGENCE" },
  { id: "fortiguard", name: "Fortiguard", template: "https://www.fortiguard.com/search?q={{query}}&type=threat", category: "THREAT_INTELLIGENCE" },
  { id: "threatyeti", name: "Threat Yeti", template: "https://threatyeti.com/search?q={{query}}", category: "THREAT_INTELLIGENCE" },
  { id: "alienvault", name: "AlienVault OTX", template: "https://otx.alienvault.com/browse/indicators?q={{query}}", category: "THREAT_INTELLIGENCE" },
  { id: "misp", name: "MISP", url: "https://www.misp-project.org/", category: "THREAT_INTELLIGENCE" },
  { id: "cloudflare-radar", name: "Cloudflare Radar", template: "https://radar.cloudflare.com/domain/{{query}}", category: "THREAT_INTELLIGENCE" },

  // DNS_TOOLS (7)
  { id: "dnsdumpster", name: "DNS Dumpster", template: "https://dnsdumpster.com/?q={{query}}", category: "DNS_TOOLS" },
  { id: "dnspropagation", name: "DNS Propagation", template: "https://dnschecker.org/all-dns-records-of-domain.php?query={{query}}", category: "DNS_TOOLS" },
  { id: "dnschecker", name: "DNS Checker", template: "https://dnschecker.org/#{{query}}", category: "DNS_TOOLS" },
  { id: "centralops", name: "CentralOps", template: "https://centralops.net/co/DomainDossier.aspx?dom={{query}}", category: "DNS_TOOLS" },
  { id: "mxtoolbox", name: "MXToolbox", template: "https://mxtoolbox.com/SuperTool.aspx?action=ptr:{{query}}", category: "DNS_TOOLS" },
  { id: "nslookup", name: "NSLookup.io", template: "https://www.nslookup.io/search/{{query}}", category: "DNS_TOOLS" },
  { id: "domaintools", name: "DomainTools WHOIS", template: "https://whois.domaintools.com/{{query}}", category: "DNS_TOOLS" },

  // CERTIFICATE_SSL (3)
  { id: "crtsh", name: "crt.sh", template: "https://crt.sh/?q={{query}}", category: "CERTIFICATE_SSL" },
  { id: "securitytrails", name: "Security Trails", template: "https://securitytrails.com/domain/{{query}}", category: "CERTIFICATE_SSL" },
  { id: "ssllabs", name: "SSL Labs", template: "https://www.ssllabs.com/ssltest/analyze.html?d={{query}}", category: "CERTIFICATE_SSL" },

  // CODE_SEARCH (3)
  { id: "github", name: "GitHub", template: "https://github.com/search?q={{query}}", category: "CODE_SEARCH" },
  { id: "gitlab", name: "GitLab", template: "https://gitlab.com/search?search={{query}}", category: "CODE_SEARCH" },
  { id: "shodan-code", name: "Shodan Code", template: "https://code.shodan.io/search?query={{query}}", category: "CODE_SEARCH" },

  // EMAIL (3)
  { id: "haveibeenpwned", name: "Have I Been Pwned", template: "https://haveibeenpwned.com/account/{{query}}", category: "EMAIL" },
  { id: "emailrep", name: "EmailRep", template: "https://emailrep.io/{{query}}", category: "EMAIL" },
  { id: "holehe", name: "Holehe", url: "https://github.com/megadose/holehe", category: "EMAIL" },

  // HASH_LOOKUP (3)
  { id: "md5online", name: "MD5 Online", template: "https://www.md5online.org/md5-decrypt.html?hash={{query}}", category: "HASH_LOOKUP" },
  { id: "hashkiller", name: "HashKiller", url: "https://hashkiller.io/", category: "HASH_LOOKUP" },
  { id: "crackstation", name: "CrackStation", url: "https://crackstation.net/", category: "HASH_LOOKUP" },

  // PEOPLE_SEARCH (3)
  { id: "sherlock", name: "Sherlock", url: "https://github.com/sherlock-project/sherlock", category: "PEOPLE_SEARCH" },
  { id: "namechk", name: "Namechk", template: "https://namechk.com/query/{{query}}", category: "PEOPLE_SEARCH" },
  { id: "pipl", name: "Pipl", url: "https://pipl.com/", category: "PEOPLE_SEARCH" },

  // MALWARE_FEEDS (2)
  { id: "abusemalware", name: "Abuse Malware", url: "https://abuse.ch/", category: "MALWARE_FEEDS" },
  { id: "malc0de", name: "Malc0de", url: "http://malc0de.com/", category: "MALWARE_FEEDS" },

  // REAL_TIME_THREAT_MAPS (2)
  { id: "threatmap", name: "Kaspersky Threat Map", url: "https://cybermap.kaspersky.com/", category: "REAL_TIME_THREAT_MAPS" },
  { id: "netlab", name: "Netlab 360", url: "https://data.netlab.360.com/", category: "REAL_TIME_THREAT_MAPS" },

  { id: "netlab", name: "Netlab 360", url: "https://data.netlab.360.com/", category: "REAL_TIME_THREAT_MAPS" }
];

window.toolsData = toolsData;
export default toolsData;
