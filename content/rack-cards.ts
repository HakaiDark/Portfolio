// Text for the info cards that open from the 3D rack hotspots.
// Edit freely: each key is referenced by a device's `cardId` in lib/dc/devices.ts.

export interface RackCard {
  eyebrow: string
  title: string
  summary: string
  points?: string[]
  tags?: string[]
}

export const rackCards: Record<string, RackCard> = {
  fortigate: {
    eyebrow: "Network security · Edmonton Catholic Schools",
    title: "FortiGate 601F",
    summary:
      "Secured a 100-site school district network: FortiGate NGFWs, FortiManager, FortiAnalyzer, IPS, VPNs, and a Cisco-to-FortiSwitch migration.",
    points: [
      "Designed and tuned firewall policies, site-to-site VPNs, IPS, application control and web filtering",
      "Traffic shaping and QoS to protect and prioritize critical services",
      "Kept high availability across all 100 sites",
    ],
    tags: ["FortiGate NGFW", "IPS", "VPN", "App control", "Web filtering", "QoS"],
  },
  fortiswitch: {
    eyebrow: "Migration · Cisco → Fortinet",
    title: "FortiSwitch 448E",
    summary: "Helped lead the migration from Cisco switching to FortiSwitch, from planning and configuration through site cutovers.",
    points: [
      "VLANs, trunking, STP, inter-VLAN routing and QoS on FortiSwitch",
      "Planned cutovers site by site across a 100-school network",
    ],
    tags: ["FortiSwitch", "VLAN", "STP", "QoS", "Migration"],
  },
  catalyst: {
    eyebrow: "Cisco · Switching & routing",
    title: "Cisco Catalyst 9300",
    summary: "The legacy core being migrated out. Configured and supported Cisco IOS/NX-OS switching on a resilient enterprise WAN.",
    points: [
      "VLANs, trunking, STP, inter-VLAN routing and QoS on Cisco IOS/NX-OS",
      "Supported a WAN built on BGP, OSPF and MPLS",
    ],
    tags: ["Cisco IOS", "NX-OS", "BGP", "OSPF", "MPLS"],
  },
  fortimanager: {
    eyebrow: "Central management",
    title: "FortiManager 400G",
    summary: "Ran centralized firewall operations for the whole district from FortiManager.",
    points: ["Policy and configuration management across 100 sites from one place"],
    tags: ["FortiManager", "Central policy"],
  },
  fortianalyzer: {
    eyebrow: "Logging & threat investigation",
    title: "FortiAnalyzer 400E",
    summary: "Investigated threats and analyzed logs in FortiAnalyzer.",
    points: ["Log analysis and threat investigation across the Fortinet fabric"],
    tags: ["FortiAnalyzer", "Threat investigation", "Logs"],
  },
  servers: {
    eyebrow: "Software development",
    title: "The code side",
    summary: "I write production code too: back-end APIs, automation, and computer vision.",
    points: [
      "Cloudgate: REST APIs and web apps with Flask, Connexion/OpenAPI and MongoDB; a refactor cut processing time by 20%",
      "Cloudgate: an automated Postman test suite cut regression testing time by 50%",
      "OESGROUP: an OpenCV, PaddleOCR, Tesseract and YOLOv8 pipeline that automated document processing",
      "Mobile and web apps with Flutter/Dart, React, Next.js and Go",
    ],
    tags: ["Python", "Flask", "MongoDB", "Docker", "OpenCV", "Flutter"],
  },
  contact: {
    eyebrow: "Speed dial",
    title: "Get in touch",
    summary: "The quickest way to reach me is WhatsApp; email works too. References available on request.",
    tags: ["Open to roles in UAE, KSA & Qatar", "Ready to relocate"],
  },
  automation: {
    eyebrow: "Automation · Edmonton Catholic Schools",
    title: "PowerShell for the network team",
    summary:
      "Built PowerShell automation for configuration validation, reporting and routine network operations, cutting repetitive manual work for the team.",
    points: [
      "Also writes automation scripts in Python and Bash",
      "The run on this console is a simulation of that kind of job",
    ],
    tags: ["PowerShell", "Python", "Bash", "Network automation"],
  },
  monitoring: {
    eyebrow: "Monitoring & visibility",
    title: "FortiAnalyzer + AirWave",
    summary: "Investigated threats and analyzed logs in FortiAnalyzer, and monitored and troubleshot Aruba wireless through AirWave.",
    points: [
      "Log analysis and threat investigation across the Fortinet fabric",
      "Aruba wireless deployed and managed through AirWave",
      "These screens are a simulation with made-up data; try the FortiGate failover and watch them react",
    ],
    tags: ["FortiAnalyzer", "AirWave", "Logs", "Threat investigation", "Wireless"],
  },
  wireless: {
    eyebrow: "Wireless & access control",
    title: "Aruba AP + ClearPass",
    summary: "Deployed and managed Aruba wireless through AirWave, and implemented 802.1X/RADIUS authentication with Aruba ClearPass NAC.",
    tags: ["Aruba", "AirWave", "ClearPass", "802.1X", "RADIUS"],
  },
}
