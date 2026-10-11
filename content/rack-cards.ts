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
  fortinet: {
    eyebrow: "Fortinet · Edmonton Catholic Schools",
    title: "FortiSwitch 448E",
    summary:
      "Secured a 100-site school district network: FortiGate NGFWs, FortiManager, FortiAnalyzer, IPS, VPNs, and a Cisco-to-FortiSwitch migration.",
    points: [
      "Firewall policies, site-to-site VPNs, IPS, application control and web filtering",
      "Centralized operations in FortiManager; threat investigation in FortiAnalyzer",
      "Helped lead the Cisco-to-FortiSwitch migration, from planning through site cutovers",
    ],
    tags: ["FortiGate", "FortiManager", "FortiAnalyzer", "FortiSwitch", "IPS", "VPN"],
  },
  cisco: {
    eyebrow: "Cisco · Switching, routing & firewall",
    title: "Cisco Secure Firewall 6100",
    summary:
      "Switching, routing and firewall work across an enterprise WAN, on Cisco IOS/NX-OS alongside Fortinet.",
    points: [
      "Switching: VLANs, trunking, STP, inter-VLAN routing and QoS",
      "Routing: a resilient WAN built on BGP, OSPF and MPLS",
      "Firewall: security policy, site-to-site VPNs, IPS and traffic shaping",
    ],
    tags: ["Cisco IOS", "NX-OS", "BGP", "OSPF", "MPLS", "QoS"],
  },
}
