// Terminal content: the looping session shown on the laptop screen, and the
// interactive portfolio CLI visitors can type into. Edit freely.
import { phonePretty, whatsappUrl } from "../contact"

export const PROMPT = "FGT-01 #"

/** Auto-typed on the laptop screen in the 3D scene (simulated output). */
export const AUTO_SESSION: { cmd: string; out: string[] }[] = [
  {
    cmd: "get system ha status",
    out: ["HA Health Status: OK", "Model: FortiGate-601F", "Mode: HA A-P", "Group: 10", "Master:  FGT-01  (priority 200)", "Slave:   FGT-02  (priority 100)", "Configuration Status: in-sync"],
  },
  {
    cmd: "diagnose sys session stat",
    out: ["misc info:  session_count=48211 setup_rate=1834", "  exp_count=0 clash=0 memory_tension_drop=0", "TCP sessions: 39876 in ESTABLISHED state", "  1204 in SYN_SENT state"],
  },
  {
    cmd: "get router info bgp summary",
    out: ["BGP router identifier 10.255.0.1, local AS 65010", "Neighbor     V  AS     MsgRcvd MsgSent  Up/Down  State/PfxRcd", "10.255.1.2   4  65020  88213   88190    41d02h        312", "10.255.1.6   4  65020  88207   88201    41d02h        312"],
  },
  {
    cmd: "execute ping 10.20.0.1",
    out: ["PING 10.20.0.1 (10.20.0.1): 56 data bytes", "64 bytes from 10.20.0.1: icmp_seq=0 ttl=255 time=0.4 ms", "64 bytes from 10.20.0.1: icmp_seq=1 ttl=255 time=0.3 ms", "--- 10.20.0.1 ping statistics ---", "2 packets transmitted, 2 packets received, 0% packet loss"],
  },
  {
    cmd: "show switch-controller managed-switch | grep 448E",
    out: ['    edit "S448EFTF2000xxxx"', '        set name "IDF-CORE-SW01"', "        set fsw-wan1-peer fortilink", "    next"],
  },
]

export interface TermLine {
  text: string
  kind?: "cmd" | "out" | "err" | "link" | "dim" | "accent"
  href?: string
}

const LINKS = {
  linkedin: "https://www.linkedin.com/in/compengyassin",
  github: "https://github.com/Compzool",
  email: "mailto:eng.compyassin@gmail.com",
}

export const WELCOME: TermLine[] = [
  { text: "Connected to FGT-01 (console, 9600 8N1)", kind: "dim" },
  { text: "Mohammad Yassin · Software Developer & Network Engineer", kind: "accent" },
  { text: "Type 'help' to see what you can run here.", kind: "dim" },
]

const HELP: TermLine[] = [
  { text: "whoami              who I am" },
  { text: "show experience     where I've worked" },
  { text: "get skills          what I work with" },
  { text: "show projects       things I've built" },
  { text: "show education      degrees" },
  { text: "show publications   papers & articles" },
  { text: "contact             how to reach me" },
  { text: "ssh github          open my GitHub" },
  { text: "ping linkedin       open my LinkedIn" },
  { text: "get system status   the box you're consoled into" },
  { text: "clear / exit" },
]

/** Commands shown as tap-to-run chips on phones. */
export const QUICK_COMMANDS = ["whoami", "show experience", "get skills", "show projects", "contact"]

export type CommandResult = { lines: TermLine[]; open?: string; clear?: boolean; exit?: boolean }

export function runCommand(raw: string): CommandResult {
  const cmd = raw.trim().replace(/\s+/g, " ").toLowerCase()
  if (!cmd) return { lines: [] }
  switch (cmd) {
    case "help":
    case "?":
      return { lines: HELP }
    case "whoami":
      return {
        lines: [
          { text: "Mohammad Yassin", kind: "accent" },
          { text: "Software Developer & Network Engineer · Beirut, Lebanon" },
          { text: "I write production code, and I run secure enterprise IT infrastructure." },
          { text: "Open to software development or IT/network roles in the UAE, Saudi Arabia and Qatar; ready to relocate.", kind: "dim" },
        ],
      }
    case "show experience":
    case "experience":
      return {
        lines: [
          { text: "Network Engineer · Edmonton Catholic Schools · Jan 2025 – Mar 2026", kind: "accent" },
          { text: "  100-school multi-site network on FortiGate NGFWs; FortiManager & FortiAnalyzer;" },
          { text: "  BGP/OSPF/MPLS WAN; helped lead the Cisco → FortiSwitch migration; ClearPass 802.1X." },
          { text: "Network Technician · Packet Path · Feb 2024 – Jan 2026", kind: "accent" },
          { text: "  Firewalls, managed switches and APs for enterprise and SMB clients; copper & fibre cabling." },
          { text: "IT Solutions Developer · OESGROUP LLP · Sep 2023 – Jan 2025", kind: "accent" },
          { text: "  Python/OpenCV document pipeline; PaddleOCR, Tesseract and YOLOv8 OCR." },
          { text: "Back End Developer · Cloudgate Consulting · Feb 2022 – Aug 2023", kind: "accent" },
          { text: "  Flask, Connexion/OpenAPI and MongoDB APIs; -20% processing time; Postman suite -50% regression time." },
        ],
      }
    case "get skills":
    case "skills":
      return {
        lines: [
          { text: "dev      Python · Flask · REST/OpenAPI · MongoDB · SQL · Docker · JavaScript · React · Next.js · Flutter/Dart · Go · OpenCV", kind: "out" },
          { text: "network  Fortinet (FortiGate, FortiManager, FortiAnalyzer, FortiSwitch) · Aruba ClearPass · Aruba wireless", kind: "out" },
          { text: "         802.1X · VPN · BGP · OSPF · Cisco IOS · BlueCat · network automation (PowerShell, Python, Bash)", kind: "out" },
        ],
      }
    case "show projects":
    case "projects":
      return {
        lines: [
          { text: "SmartGasALPR-MLkit   Flutter app with automatic licence plate recognition (ML Kit)", href: `${LINKS.github}/SmartGasALPR-MLkit`, kind: "link" },
          { text: "Twitch clone         Flutter + Agora streaming app with a Go backend", href: `${LINKS.github}/Twitch_Clone_Flutter-Agora`, kind: "link" },
          { text: "Lets-Mingle          complete Flutter mobile app", href: `${LINKS.github}/Lets-Mingle-Dating-App`, kind: "link" },
          { text: "Ecommerce            Next.js, React and Sanity storefront", href: `${LINKS.github}/Ecommerce`, kind: "link" },
          { text: "FlappyBird           game + NEAT neuro-evolution paper", href: `${LINKS.github}/FlappyBird-FullGame`, kind: "link" },
        ],
      }
    case "show education":
    case "education":
      return {
        lines: [
          { text: "American University of Beirut · Diploma, Cybersecurity · 2026 – present" },
          { text: "Beirut Arab University · BEng, Computer Engineering · 2018 – 2022" },
        ],
      }
    case "show publications":
    case "publications":
      return {
        lines: [
          { text: "Cyber Attacks on Connected and Autonomous Vehicles (CAVs) · 2022", href: "https://medium.com/@eng.compyassin/cyber-attack-on-cavs-235210f9ae62", kind: "link" },
          { text: "Quality of Experience of CAVEs · 2022", href: "https://medium.com/@eng.compyassin/quality-of-experience-and-performance-aspects-of-caves-f52bd0874e7d", kind: "link" },
          { text: "FlappyBird Learns How To Beat Itself Using NEAT · 2022", href: "https://medium.com/@eng.compyassin/flappy-bird-beats-itself-using-neat-8aec1f140ea3", kind: "link" },
        ],
      }
    case "contact":
      return {
        lines: [
          { text: "email     eng.compyassin@gmail.com", href: LINKS.email, kind: "link" },
          { text: `whatsapp  ${phonePretty()}`, href: whatsappUrl(), kind: "link" },
          { text: "linkedin  linkedin.com/in/compengyassin", href: LINKS.linkedin, kind: "link" },
          { text: "github    github.com/Compzool", href: LINKS.github, kind: "link" },
          { text: "References available on request.", kind: "dim" },
        ],
      }
    case "ssh github":
      return { lines: [{ text: "Opening github.com/Compzool …", kind: "dim" }], open: LINKS.github }
    case "ping linkedin":
      return {
        lines: [
          { text: "PING linkedin.com/in/compengyassin: 56 data bytes", kind: "dim" },
          { text: "64 bytes: icmp_seq=0 ttl=57 time=1.2 ms · opening …", kind: "dim" },
        ],
        open: LINKS.linkedin,
      }
    case "get system status":
      return {
        lines: [
          { text: "Version: FortiGate-601F (simulated console)" },
          { text: "Hostname: FGT-01 · HA mode: active-passive · Configuration: in-sync" },
          { text: "Operator: Mohammad Yassin", kind: "accent" },
        ],
      }
    case "sudo hire-me":
    case "hire me":
      return { lines: [{ text: "Permission granted. → eng.compyassin@gmail.com", href: LINKS.email, kind: "link" }] }
    case "clear":
      return { lines: [], clear: true }
    case "exit":
    case "quit":
    case "logout":
      return { lines: [], exit: true }
    default:
      return { lines: [{ text: `Command fail. "${raw.trim()}" not found. Type 'help'.`, kind: "err" }] }
  }
}
