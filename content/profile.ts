// Portfolio content. Source of truth: linkedin-profile.md (kept out of git).
// Never add certifications, metrics or job details that aren't in that file,
// and never publish anything from its private references section.

export const profile = {
  name: "Mohammad Yassin",
  headline: "Software Developer & Network Engineer",
  tagline: "I write production code, and I run secure enterprise IT infrastructure.",
  location: "Beirut, Lebanon",
  openTo: "Software development and IT/network roles in the UAE, Saudi Arabia and Qatar; ready to relocate.",
  email: "eng.compyassin@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/compengyassin",
    github: "https://github.com/Compzool",
    cv: "/Mohammad-Yassin-Resume.pdf",
  },
  languages: ["Arabic (native)", "English (fluent)", "Spanish (basic)"],
  about: [
    "I build the tools a team needs and keep the systems they run on working.",
    "Most recently I helped run and secure a 100-site enterprise network for Edmonton Catholic Schools in Canada: FortiGate NGFWs managed through FortiManager, threat investigation in FortiAnalyzer, Aruba ClearPass NAC, and a Cisco-to-FortiSwitch migration I helped lead.",
    "On the development side I've built REST APIs with Flask, OpenAPI and MongoDB, a computer-vision and OCR pipeline for an accounting firm, and mobile apps in Flutter. I'm completing a Diploma in Cybersecurity at the American University of Beirut.",
  ],
}

export interface Role {
  title: string
  company: string
  place: string
  dates: string
  kind?: string
  points: string[]
  tags: string[]
}

export const experience: Role[] = [
  {
    title: "Network Engineer",
    company: "Edmonton Catholic Schools",
    place: "Edmonton, Canada · Hybrid",
    dates: "Jan 2025 – Mar 2026",
    kind: "Full-time",
    points: [
      "Administered and secured a 100-school, multi-site enterprise network on FortiGate NGFWs, maintaining high availability across all sites.",
      "Designed and tuned firewall policies, site-to-site VPNs, IPS, application control, web filtering, traffic shaping and QoS.",
      "Ran centralized firewall operations in FortiManager; investigated threats and analyzed logs in FortiAnalyzer.",
      "Helped lead the migration from Cisco switching to FortiSwitch, from planning and configuration through site cutovers.",
      "Supported a resilient BGP, OSPF and MPLS WAN; configured VLANs, trunking, STP, inter-VLAN routing and QoS on Cisco IOS/NX-OS and FortiSwitch.",
      "Managed Aruba wireless through AirWave and implemented 802.1X/RADIUS authentication with Aruba ClearPass NAC.",
      "Built PowerShell automation for configuration validation, reporting and routine operations.",
    ],
    tags: ["FortiGate", "FortiManager", "FortiAnalyzer", "FortiSwitch", "ClearPass", "BGP / OSPF / MPLS", "PowerShell"],
  },
  {
    title: "Network Technician",
    company: "Packet Path",
    place: "Edmonton, Canada · On-site",
    dates: "Feb 2024 – Jan 2026",
    kind: "Part-time",
    points: [
      "Deployed and configured firewalls, managed switches and access points for enterprise and SMB clients.",
      "Installed and terminated copper and fiber structured cabling; troubleshot hardware and connectivity on site.",
      "Managed user accounts, access policies and permissions; kept configuration records and documentation.",
    ],
    tags: ["Firewalls", "Switching", "Wireless", "Structured cabling"],
  },
  {
    title: "IT Solutions Developer",
    company: "OESGROUP LLP",
    place: "Edmonton, Canada",
    dates: "Sep 2023 – Jan 2025",
    points: [
      "Automated repetitive accounting workflows, cutting processing time and letting the firm take on more clients.",
      "Built a Python/OpenCV document-processing pipeline (denoising, thresholding, contour detection, deskewing).",
      "Built multilingual OCR with PaddleOCR and Tesseract, plus YOLOv8 for document segmentation.",
      "Maintained office network infrastructure, VoIP and phone systems, and IT security policies.",
    ],
    tags: ["Python", "OpenCV", "PaddleOCR", "Tesseract", "YOLOv8"],
  },
  {
    title: "Back End Developer",
    company: "Cloudgate Consulting DWC-LLC",
    place: "Beirut, Lebanon",
    dates: "Feb 2022 – Aug 2023",
    points: [
      "Built scalable REST APIs and web apps with Flask, Connexion/OpenAPI and MongoDB.",
      "Refactored and optimized existing code, cutting processing time by 20%.",
      "Moved heavy processing into asynchronous background task queues, removing load spikes from the main server.",
      "Built an automated Postman test suite that cut regression testing time by 50%.",
    ],
    tags: ["Python", "Flask", "OpenAPI", "MongoDB", "Docker", "Postman"],
  },
]

export const projects = [
  {
    name: "SmartGasALPR-MLkit",
    blurb: "Mobile app with automatic license plate recognition using Google ML Kit.",
    stack: ["Flutter", "Dart", "ML Kit"],
    href: "https://github.com/Compzool/SmartGasALPR-MLkit",
  },
  {
    name: "Twitch Clone",
    blurb: "Live-streaming app with go-live, a live feed and real-time chat, backed by a Go server.",
    stack: ["Flutter", "Agora", "Firebase", "Go"],
    href: "https://github.com/Compzool/Twitch_Clone_Flutter-Agora",
  },
  {
    name: "Lets-Mingle",
    blurb: "Complete mobile app with real-time interaction.",
    stack: ["Flutter", "Bloc", "Firebase", "Agora"],
    href: "https://github.com/Compzool/Lets-Mingle-Dating-App",
  },
  {
    name: "Ecommerce",
    blurb: "E-commerce web application.",
    stack: ["Next.js", "React", "Sanity"],
    href: "https://github.com/Compzool/Ecommerce",
  },
  {
    name: "This portfolio",
    blurb: "Real-time 3D data-centre rack with a path-traced photo mode, live traffic view and an interactive console.",
    stack: ["Next.js", "Three.js", "React Three Fiber", "WebGL"],
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Development",
    items: ["Python", "Flask", "REST APIs", "OpenAPI", "MongoDB", "SQL", "Firebase", "JavaScript", "React", "Next.js", "Flutter / Dart", "Go", "Java", "C / C++", "OpenCV", "Docker", "Git"],
  },
  {
    group: "Networking & security",
    items: ["FortiGate", "FortiManager", "FortiAnalyzer", "FortiSwitch", "Aruba ClearPass", "Aruba Wireless", "802.1X / RADIUS", "VPN", "BGP", "OSPF", "MPLS", "Cisco IOS / NX-OS", "BlueCat"],
  },
  { group: "Automation", items: ["PowerShell", "Python", "Bash", "Network automation"] },
]

export const education = [
  { title: "Diploma, Cybersecurity", school: "American University of Beirut", dates: "Feb 2026 – Present" },
  { title: "Bachelor of Engineering, Computer Engineering", school: "Beirut Arab University", dates: "Sep 2018 – May 2022" },
]

export const publications = [
  { title: "Cyber Attacks on Connected and Autonomous Vehicles (CAVs)", year: "2022", href: "https://medium.com/@eng.compyassin/cyber-attack-on-cavs-235210f9ae62" },
  { title: "Quality of Experience of CAVEs", year: "2022" },
  { title: "FlappyBird Learns How To Beat Itself Using NEAT", year: "2022" },
]
