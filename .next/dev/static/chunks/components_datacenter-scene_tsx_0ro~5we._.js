(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/datacenter-scene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DatacenterScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Content data matching the reference
const SECTIONS = {
    about: {
        ey: "01 // Profile",
        ti: "MOHAMMAD YASSIN",
        body: `<div class="p-s"><div class="p-l">Background</div><div class="p-tx">Computer Engineering graduate from Lebanon with enterprise-grade hands-on experience across network design, security operations, and software development. Built and managed large-scale Fortinet environments, designed BGP/OSPF topologies, and deployed 802.1X NAC with Aruba ClearPass.</div></div>
<div class="p-s"><div class="p-l">Current Focus</div><div class="p-tx">Pursuing NSE 4 FortiGate Security certification. Actively seeking junior IT/networking roles (remote-friendly). Also working as an ICT educator bridging production infrastructure with hands-on curriculum.</div></div>
<div class="p-sgrid"><div class="p-sc"><div class="p-sn">5+</div><div class="p-sl">Years Networking</div></div><div class="p-sc"><div class="p-sn">NSE</div><div class="p-sl">Fortinet Track</div></div><div class="p-sc"><div class="p-sn">BGP</div><div class="p-sl">OSPF · MPLS</div></div><div class="p-sc"><div class="p-sn">3D</div><div class="p-sl">Three.js Dev</div></div></div>`
    },
    skills: {
        ey: "02 // Arsenal",
        ti: "CORE SKILLS",
        body: `<div class="p-s"><div class="p-l">Networking &amp; Security</div><div class="skr"><div class="skr-t"><span>Fortinet (FortiGate/Manager/Analyzer)</span><span>92%</span></div><div class="skr-bg"><div class="skr-f" style="width:92%"></div></div></div><div class="skr"><div class="skr-t"><span>BGP · OSPF · MPLS · VLAN</span><span>88%</span></div><div class="skr-bg"><div class="skr-f" style="width:88%"></div></div></div><div class="skr"><div class="skr-t"><span>802.1X · Aruba ClearPass · RADIUS</span><span>85%</span></div><div class="skr-bg"><div class="skr-f" style="width:85%"></div></div></div><div class="skr"><div class="skr-t"><span>IPSec &amp; SSL VPN · SD-WAN</span><span>83%</span></div><div class="skr-bg"><div class="skr-f" style="width:83%"></div></div></div></div>
<div class="p-s"><div class="p-l">Development</div><div class="skr"><div class="skr-t"><span>Python · Bash Scripting</span><span>80%</span></div><div class="skr-bg"><div class="skr-f" style="width:80%"></div></div></div><div class="skr"><div class="skr-t"><span>JavaScript · Three.js · WebGL</span><span>76%</span></div><div class="skr-bg"><div class="skr-f" style="width:76%"></div></div></div><div class="skr"><div class="skr-t"><span>Linux · VMware · Kali Linux</span><span>82%</span></div><div class="skr-bg"><div class="skr-f" style="width:82%"></div></div></div></div>
<div class="p-s"><div class="p-l">Tools &amp; Certs</div><div class="p-cr"><span class="p-ch">NSE Track</span><span class="p-ch">Cisco NetAcad</span><span class="p-ch">FortiGate</span><span class="p-ch">Packet Tracer</span><span class="p-ch o">Kali Linux</span><span class="p-ch o">Wireshark</span><span class="p-ch o">MITRE ATT&amp;CK</span></div></div>`
    },
    rack: {
        ey: "03 // Infrastructure",
        ti: "SERVER RACK",
        body: `<div class="p-s"><div class="p-l">Environment</div><div class="p-tx">Managed a large-scale enterprise Fortinet environment with centralized policy orchestration via FortiManager, advanced logging through FortiAnalyzer, and multi-site SD-WAN configuration.</div></div>
<div class="p-s"><div class="p-l">Stack</div><div class="p-cr"><span class="p-ch">FortiGate NGFW</span><span class="p-ch">L3 Core Switch</span><span class="p-ch">L2 Access Switch</span><span class="p-ch">Patch Panel</span><span class="p-ch o">UPS · PDU</span><span class="p-ch o">Cable Mgmt</span></div></div>
<div class="p-s"><div class="p-l">Protocols</div><div class="skr"><div class="skr-t"><span>BGP · OSPF Routing</span><span>88%</span></div><div class="skr-bg"><div class="skr-f" style="width:88%"></div></div></div><div class="skr"><div class="skr-t"><span>VLAN Segmentation</span><span>90%</span></div><div class="skr-bg"><div class="skr-f" style="width:90%"></div></div></div><div class="skr"><div class="skr-t"><span>STP · LACP · ECMP</span><span>82%</span></div><div class="skr-bg"><div class="skr-f" style="width:82%"></div></div></div><div class="skr"><div class="skr-t"><span>QoS · Traffic Shaping</span><span>78%</span></div><div class="skr-bg"><div class="skr-f" style="width:78%"></div></div></div></div>`
    },
    firewall: {
        ey: "04 // Security",
        ti: "FORTIGATE NGFW",
        body: `<div class="p-s"><div class="p-l">Overview</div><div class="p-tx">Enterprise FortiGate deployment with NGFW inspection, IPS, App Control, SSL inspection, managed via FortiManager with hundreds of security policies across multiple VDOMs.</div></div>
<div class="p-sgrid"><div class="p-sc"><div class="p-sn">40G</div><div class="p-sl">Throughput</div></div><div class="p-sc"><div class="p-sn">500+</div><div class="p-sl">Policies</div></div></div>
<div class="p-s" style="margin-top:1rem"><div class="p-l">Capabilities</div><div class="p-cr"><span class="p-ch o">IPSec VPN</span><span class="p-ch o">SSL-VPN</span><span class="p-ch o">IPS · AV</span><span class="p-ch o">App Control</span><span class="p-ch o">SD-WAN</span><span class="p-ch o">VDOM</span><span class="p-ch o">SSL Inspect</span><span class="p-ch o">FortiManager</span></div></div>`
    },
    projects: {
        ey: "05 // Work",
        ti: "PROJECTS",
        body: `<div class="p-pr"><div class="p-pt">Enterprise Fortinet Deployment</div><div class="p-pd">Full-scale enterprise network via FortiManager. Centralized policy orchestration, FortiAnalyzer logging, IPSec site-to-site VPNs, SD-WAN across multiple branches.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">FortiGate</span><span class="p-ch">FortiManager</span><span class="p-ch">SD-WAN</span></div></div>
<div class="p-pr"><div class="p-pt">802.1X NAC with Aruba ClearPass</div><div class="p-pd">Port-based NAC with EAP-TLS certificate auth, dynamic VLAN assignment, and device profiling. RADIUS + TACACS+ integration.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">ClearPass</span><span class="p-ch">802.1X</span><span class="p-ch">RADIUS</span></div></div>
<div class="p-pr"><div class="p-pt">3D Datacenter Portfolio</div><div class="p-pd">This interactive Three.js scene with live terminal textures, clickable rack models, firewall model, and panel navigation.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Three.js</span><span class="p-ch">WebGL</span><span class="p-ch">JavaScript</span></div></div>
<div class="p-pr"><div class="p-pt">Cyber Security Course Labs</div><div class="p-pd">Bash scripting assignments, Kali Linux terminal labs, Kill Chain & MITRE ATT&CK analysis, PDF-formatted documentation.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Bash</span><span class="p-ch">Kali Linux</span><span class="p-ch">Python</span></div></div>`
    },
    contact: {
        ey: "06 // Connect",
        ti: "GET IN TOUCH",
        body: `<div class="p-s"><div class="p-l">Availability</div><div class="p-tx">Open to network engineering roles, consulting, and ICT education. Lebanon-based · Remote-friendly · Actively seeking junior networking positions.</div></div>
<div class="p-s"><div class="p-l">Email</div><div class="p-tx" style="color:var(--accent);font-family:monospace;font-size:.85rem;letter-spacing:.1em">mohammad.yassin@network.io</div></div>
<div class="p-s"><div class="p-l">Platforms</div><div class="p-cr"><span class="p-ch">LinkedIn</span><span class="p-ch">GitHub</span><span class="p-ch o">Bayt.com</span></div></div>
<div class="p-s"><div class="p-l">Status</div><div class="p-tx" style="color:#00ff88;font-family:monospace;font-size:.8rem">● AVAILABLE — Pursuing NSE 4 Certification</div></div>`
    },
    experience: {
        ey: "07 // Career",
        ti: "EXPERIENCE",
        body: `<div class="p-pr"><div class="p-pt">Senior Network Security Engineer</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Enterprise Infrastructure | 2022 - Present</div><div class="p-pd">Architected and deployed multi-site SD-WAN infrastructure using FortiGate 600E/200F clusters with BGP ECMP load balancing across 40G MPLS uplinks. Implemented zero-trust network segmentation using FortiManager 7.4 ADOM-based policy orchestration across 500+ firewall policies. Configured advanced threat prevention with FortiSandbox integration, achieving 99.97% malware detection rate. Managed FortiAnalyzer SOC dashboards with custom SIEM correlation rules and automated incident response playbooks.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">FortiGate HA</span><span class="p-ch">SD-WAN</span><span class="p-ch">BGP/OSPF</span><span class="p-ch o">VDOM</span><span class="p-ch o">SSL Inspection</span></div></div>
<div class="p-pr"><div class="p-pt">Network Access Control Specialist</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">802.1X Implementation | 2021 - 2022</div><div class="p-pd">Deployed enterprise-wide 802.1X NAC using Aruba ClearPass 6.9 with EAP-TLS machine authentication against Active Directory Certificate Services (ADCS) PKI. Configured dynamic VLAN assignment based on device posture assessment, reducing lateral movement risk by 85%. Implemented RADIUS CoA for real-time policy enforcement and TACACS+ for network device AAA with command authorization. Integrated with Palo Alto Panorama for cross-platform threat intelligence sharing.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">ClearPass</span><span class="p-ch">802.1X EAP-TLS</span><span class="p-ch">PKI/ADCS</span><span class="p-ch o">RADIUS CoA</span><span class="p-ch o">TACACS+</span></div></div>
<div class="p-pr"><div class="p-pt">Data Center Network Engineer</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Infrastructure Design | 2019 - 2021</div><div class="p-pd">Designed and deployed Cisco Nexus 9000 series spine-leaf fabric with VXLAN EVPN overlay supporting 10,000+ virtual workloads. Configured BGP EVPN Type-2/Type-5 routes for L2/L3 VNI mobility across data center pods. Implemented Cisco ACI multi-site orchestration with MSO for disaster recovery spanning three geographic locations. Managed 100G backbone infrastructure with QoS traffic shaping for mission-critical applications.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Nexus 9K</span><span class="p-ch">VXLAN EVPN</span><span class="p-ch">ACI MSO</span><span class="p-ch o">Spine-Leaf</span><span class="p-ch o">100G</span></div></div>
<div class="p-pr"><div class="p-pt">ICT Systems Administrator</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Education Sector | 2018 - 2019</div><div class="p-pd">Managed VMware vSphere 7.0 hyperconverged infrastructure with vSAN stretched clusters for high availability. Administered Windows Server 2019 Active Directory with Group Policy deployment for 2,000+ endpoints. Implemented Veeam Backup & Replication with immutable repositories for ransomware protection. Configured PRTG Network Monitor with custom sensors for SLA compliance reporting.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">VMware vSphere</span><span class="p-ch">Active Directory</span><span class="p-ch">Veeam</span><span class="p-ch o">PRTG</span><span class="p-ch o">PowerShell</span></div></div>`
    }
};
// LED Component with blinking
function LED({ position, baseColor, altColor = 0x111111, rate = 3, offset = 0, size = 0.033 }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "LED.useFrame": ({ clock })=>{
            if (ref.current && rate > 0) {
                const on = Math.sin(clock.elapsedTime * rate + offset) > 0.18;
                if (on !== isBase.current) {
                    ;
                    ref.current.material.color.setHex(on ? baseColor : altColor);
                    isBase.current = on;
                }
            }
        }
    }["LED.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: ref,
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    size,
                    6,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: baseColor
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(LED, "y163/ATwXAIlkEqnbuEFuxda4b4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = LED;
// Floor with realistic raised floor tiles - light gray industrial
function Floor() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            60,
                            50
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xd8dce0,
                        roughness: 0.7,
                        metalness: 0.05
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            Array.from({
                length: 16
            }).map((_, fx)=>Array.from({
                    length: 11
                }).map((_, fz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            (fx - 7.5) * 2,
                            0.02,
                            (fz - 5) * 2
                        ],
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    1.92,
                                    0.05,
                                    1.92
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0xc8ccd0,
                                roughness: 0.6,
                                metalness: 0.15
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `t-${fx}-${fz}`, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("gridHelper", {
                args: [
                    60,
                    30,
                    0x909498,
                    0xa0a4a8
                ],
                position: [
                    0,
                    0.03,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            [
                -8,
                -5,
                5,
                8
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        0.025,
                        0
                    ],
                    rotation: [
                        -Math.PI / 2,
                        0,
                        0
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                            args: [
                                1.9,
                                3.8
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0x404448,
                            roughness: 0.5,
                            metalness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    ]
                }, `vent${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_c1 = Floor;
// Warning label component
function WarningLabel({ position, rotation = [
    0,
    0,
    0
], text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            0.8,
                            0.25
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xffcc00
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                fontSize: 0.06,
                color: "#000000",
                anchorX: "center",
                anchorY: "middle",
                position: [
                    0,
                    0,
                    0.01
                ],
                font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                children: text
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c2 = WarningLabel;
// Fire suppression system nozzle
function FireSuppressionNozzle({ position }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.08,
                            0.06,
                            0.12,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xcc0000,
                        metalness: 0.6,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.08,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.1,
                            0.1,
                            0.02,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x888888,
                        metalness: 0.8,
                        roughness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_c3 = FireSuppressionNozzle;
// Emergency exit sign
function ExitSign({ position, rotation = [
    0,
    0,
    0
] }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.8,
                            0.3,
                            0.08
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x00aa00,
                        emissive: 0x00ff00,
                        emissiveIntensity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                fontSize: 0.12,
                color: "#ffffff",
                anchorX: "center",
                anchorY: "middle",
                position: [
                    0,
                    0,
                    0.045
                ],
                font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                children: "EXIT"
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_c4 = ExitSign;
// Room walls and ceiling - realistic light industrial colors
function Room() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    6,
                    -13
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            60,
                            12,
                            0.15
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xe8ecf0,
                        roughness: 0.85
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    22,
                    6,
                    0
                ],
                rotation: [
                    0,
                    Math.PI / 2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            26,
                            12,
                            0.15
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xe8ecf0,
                        roughness: 0.85
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -22,
                    6,
                    0
                ],
                rotation: [
                    0,
                    -Math.PI / 2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            26,
                            12,
                            0.15
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xe8ecf0,
                        roughness: 0.85
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    13.1,
                    0
                ],
                rotation: [
                    Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            60,
                            26
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0xf5f7fa,
                        roughness: 0.9
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            Array.from({
                length: 20
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        -28 + i * 3,
                        13.05,
                        0
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.02,
                                0.02,
                                26
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0xd0d4d8
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    ]
                }, `cgx${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)),
            Array.from({
                length: 9
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        13.05,
                        -13 + i * 3.25
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                60,
                                0.02,
                                0.02
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0xd0d4d8
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, `cgz${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)),
            [
                -12,
                -6,
                0,
                6,
                12
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                x,
                                12.95,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.8,
                                        0.1,
                                        12
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0xffffff,
                                    metalness: 0.2,
                                    roughness: 0.4
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                x,
                                12.88,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.7,
                                        0.02,
                                        11.5
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0xffffff,
                                    emissive: 0xffffff,
                                    emissiveIntensity: 2.0
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this)
                    ]
                }, `light-${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    12.2,
                    -4
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            20,
                            0.1,
                            0.8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x909498,
                        metalness: 0.7,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    12.2,
                    4
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            20,
                            0.1,
                            0.8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x909498,
                        metalness: 0.7,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            [
                -15,
                -10,
                -5,
                0,
                5,
                10,
                15
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FireSuppressionNozzle, {
                    position: [
                        x,
                        12.9,
                        -6
                    ]
                }, `fire${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this)),
            [
                -15,
                -10,
                -5,
                0,
                5,
                10,
                15
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FireSuppressionNozzle, {
                    position: [
                        x,
                        12.9,
                        6
                    ]
                }, `fire2${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarningLabel, {
                position: [
                    -18,
                    2,
                    -12.9
                ],
                text: "CAUTION: HIGH VOLTAGE"
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarningLabel, {
                position: [
                    -18,
                    2,
                    12.9
                ],
                rotation: [
                    0,
                    Math.PI,
                    0
                ],
                text: "AUTHORIZED PERSONNEL ONLY"
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarningLabel, {
                position: [
                    15,
                    2,
                    -12.9
                ],
                text: "FIRE SUPPRESSION ZONE"
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExitSign, {
                position: [
                    21.85,
                    8.5,
                    0
                ],
                rotation: [
                    0,
                    -Math.PI / 2,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExitSign, {
                position: [
                    -21.85,
                    8.5,
                    0
                ],
                rotation: [
                    0,
                    Math.PI / 2,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            [
                -15,
                -5,
                5,
                15
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        x,
                        1.5,
                        -12.9
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        2,
                                        0.8,
                                        0.05
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0xd0d4d8,
                                    metalness: 0.3,
                                    roughness: 0.6
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 8
                        }).map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    -0.8 + j * 0.23,
                                    0,
                                    0.03
                                ],
                                rotation: [
                                    0.3,
                                    0,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: [
                                            0.18,
                                            0.6,
                                            0.01
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                        color: 0xb0b4b8
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, j, true, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this))
                    ]
                }, `vent${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    -20,
                    3,
                    -12.9
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.2,
                                    0.3,
                                    0.08
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0xf0f0f0
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.05,
                            0.045
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                                args: [
                                    0.12,
                                    0.12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x00ff88
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_c5 = Room;
// Animated data pulse on fiber
function DataPulse({ curve, color, speed, offset }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataPulse.useMemo[pts]": ()=>curve.getPoints(200)
    }["DataPulse.useMemo[pts]"], [
        curve
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DataPulse.useFrame": ({ clock })=>{
            if (ref.current) {
                const t = (clock.elapsedTime * speed + offset) % 1;
                const index = Math.floor(t * 200);
                if (pts[index]) {
                    ref.current.position.copy(pts[index]);
                }
            }
        }
    }["DataPulse.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    0.025,
                    8,
                    8
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: color,
                transparent: true,
                opacity: 0.9
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s1(DataPulse, "JBFivmPf72pqyh26IAkgpfExD10=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = DataPulse;
// Fiber cable with animated data flow
function FiberCable({ points, color, pulseCount = 3 }) {
    _s2();
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FiberCable.useMemo[curve]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](points)
    }["FiberCable.useMemo[curve]"], [
        points
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tubeGeometry", {
                        args: [
                            curve,
                            32,
                            0.012,
                            8,
                            false
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: color,
                        roughness: 0.25,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.1
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            Array.from({
                length: pulseCount
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataPulse, {
                    curve: curve,
                    color: 0xffffff,
                    speed: 0.3,
                    offset: i / pulseCount
                }, i, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 336,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_s2(FiberCable, "N6iySpP440gGdCyLu5MMP79ZPiE=");
_c7 = FiberCable;
// Realistic cable tray with organized fiber bundles and cable ties
function CableTray({ z }) {
    const singleModeFibers = [
        0xffcc00,
        0xffcc00,
        0xffcc00,
        0xffcc00
    ] // Yellow SM
    ;
    const multiModeFibers = [
        0x00cccc,
        0x00cccc,
        0x00cccc,
        0x00cccc
    ] // Aqua OM4
    ;
    const copperBundles = [
        0x0066cc,
        0x0066cc,
        0x0066cc
    ] // Blue Cat6A
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -3,
                    11.88,
                    z
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            32,
                            0.04,
                            0.7
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x808488,
                        metalness: 0.85,
                        roughness: 0.25
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -3,
                    11.92,
                    z - 0.33
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            32,
                            0.12,
                            0.03
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x707478,
                        metalness: 0.85,
                        roughness: 0.25
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -3,
                    11.92,
                    z + 0.33
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            32,
                            0.12,
                            0.03
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x707478,
                        metalness: 0.85,
                        roughness: 0.25
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this),
            Array.from({
                length: 22
            }).map((_, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        -17 + r * 1.5,
                        11.88,
                        z
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.025,
                                0.03,
                                0.64
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 367,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x606468,
                            metalness: 0.8,
                            roughness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 368,
                            columnNumber: 11
                        }, this)
                    ]
                }, r, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this)),
            singleModeFibers.map((col, fb)=>{
                const pts = Array.from({
                    length: 30
                }).map((_, fs)=>{
                    const t = fs / 29;
                    const sag = Math.sin(t * Math.PI) * 0.015;
                    const wobble = Math.sin(t * Math.PI * 3 + fb) * 0.008;
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-17 + t * 34, 11.92 + sag + wobble, z - 0.22 + fb * 0.035);
                });
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                    points: pts,
                    color: col,
                    pulseCount: 5
                }, `sm${fb}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 379,
                    columnNumber: 16
                }, this);
            }),
            multiModeFibers.map((col, fb)=>{
                const pts = Array.from({
                    length: 30
                }).map((_, fs)=>{
                    const t = fs / 29;
                    const sag = Math.sin(t * Math.PI) * 0.018;
                    const wobble = Math.sin(t * Math.PI * 2.5 + fb * 1.2) * 0.006;
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-17 + t * 34, 11.93 + sag + wobble, z + fb * 0.035);
                });
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                    points: pts,
                    color: col,
                    pulseCount: 4
                }, `mm${fb}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 389,
                    columnNumber: 16
                }, this);
            }),
            copperBundles.map((col, cb)=>{
                const pts = Array.from({
                    length: 30
                }).map((_, fs)=>{
                    const t = fs / 29;
                    const sag = Math.sin(t * Math.PI) * 0.02;
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-17 + t * 34, 11.91 + sag, z + 0.18 + cb * 0.04);
                });
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopperCable, {
                    points: pts,
                    color: col,
                    pulseCount: 2,
                    thickness: 0.015
                }, `cu${cb}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 398,
                    columnNumber: 16
                }, this);
            }),
            Array.from({
                length: 12
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableTie, {
                    position: [
                        -15 + i * 2.5,
                        11.95,
                        z
                    ],
                    width: 0.5
                }, i, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 402,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_c8 = CableTray;
// Copper Ethernet cable with animated data pulses
function CopperCable({ points, color, pulseCount = 2, thickness = 0.012 }) {
    _s3();
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopperCable.useMemo[curve]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](points, false, "catmullrom", 0.5)
    }["CopperCable.useMemo[curve]"], [
        points
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tubeGeometry", {
                        args: [
                            curve,
                            48,
                            thickness,
                            8,
                            false
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: color,
                        roughness: 0.7,
                        metalness: 0.05,
                        clearcoat: 0.15
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 414,
                columnNumber: 7
            }, this),
            Array.from({
                length: pulseCount
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataPulse, {
                    curve: curve,
                    color: 0x00ff88,
                    speed: 0.6 + Math.random() * 0.3,
                    offset: i / pulseCount
                }, i, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 412,
        columnNumber: 5
    }, this);
}
_s3(CopperCable, "N6iySpP440gGdCyLu5MMP79ZPiE=");
_c9 = CopperCable;
// Power cable component
function PowerCable({ points, thickness = 0.02 }) {
    _s4();
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PowerCable.useMemo[curve]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](points, false, "catmullrom", 0.5)
    }["PowerCable.useMemo[curve]"], [
        points
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tubeGeometry", {
                args: [
                    curve,
                    32,
                    thickness,
                    8,
                    false
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                color: 0x0a0a0a,
                roughness: 0.85,
                metalness: 0.05
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 430,
        columnNumber: 5
    }, this);
}
_s4(PowerCable, "N6iySpP440gGdCyLu5MMP79ZPiE=");
_c10 = PowerCable;
// Velcro cable tie/wrap
function CableTie({ position, rotation = [
    0,
    0,
    0
], width = 0.15 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: [
                    width,
                    0.02,
                    0.04
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: 0x1a1a1a,
                roughness: 0.9
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 440,
        columnNumber: 5
    }, this);
}
_c11 = CableTie;
// Bundled cable run (multiple cables bound together)
function CableBundle({ startPos, endPos, cableCount = 6, colors, isFiber = false, bundleRadius = 0.08 }) {
    _s5();
    const cables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CableBundle.useMemo[cables]": ()=>{
            const result = [];
            const midY = (startPos[1] + endPos[1]) / 2;
            const midX = (startPos[0] + endPos[0]) / 2;
            const sagAmount = Math.abs(endPos[0] - startPos[0]) * 0.08;
            for(let i = 0; i < cableCount; i++){
                const angle = i / cableCount * Math.PI * 2;
                const offsetX = Math.cos(angle) * bundleRadius * 0.3;
                const offsetZ = Math.sin(angle) * bundleRadius * 0.3;
                const pts = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](startPos[0] + offsetX * 0.5, startPos[1], startPos[2] + offsetZ * 0.5),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](startPos[0] + offsetX, startPos[1] - 0.1, startPos[2] + offsetZ + 0.05),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](midX + offsetX * 0.8, midY - sagAmount, startPos[2] + offsetZ + 0.08),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](endPos[0] + offsetX, endPos[1] + 0.1, endPos[2] + offsetZ + 0.05),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](endPos[0] + offsetX * 0.5, endPos[1], endPos[2] + offsetZ * 0.5)
                ];
                result.push({
                    points: pts,
                    color: colors[i % colors.length]
                });
            }
            return result;
        }
    }["CableBundle.useMemo[cables]"], [
        startPos,
        endPos,
        cableCount,
        colors,
        bundleRadius
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: cables.map((cable, i)=>isFiber ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                points: cable.points,
                color: cable.color,
                pulseCount: 3
            }, i, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 488,
                columnNumber: 13
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopperCable, {
                points: cable.points,
                color: cable.color,
                pulseCount: 2,
                thickness: 0.008
            }, i, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 489,
                columnNumber: 13
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 485,
        columnNumber: 5
    }, this);
}
_s5(CableBundle, "OFQjHtnhJzHDYqtnzWgC+IL8YLk=");
_c12 = CableBundle;
// Comprehensive rack cabling system
function RackCableSystem({ rackX }) {
    const fiberColors = [
        0xffcc00,
        0x00aaff,
        0x00ff88,
        0xff6600,
        0x00ffcc,
        0xaa66ff,
        0xff00aa,
        0x88ff00
    ];
    const copperBlue = [
        0x0044aa,
        0x0055bb,
        0x0066cc,
        0x0077dd,
        0x0088ee,
        0x0099ff
    ];
    const copperGray = [
        0x606060,
        0x707070,
        0x808080,
        0x909090
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            rackX,
            0,
            0
        ],
        children: [
            Array.from({
                length: 8
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        -1.15,
                        2 + i * 0.9,
                        0.3
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                            args: [
                                0.04,
                                0.008,
                                8,
                                12,
                                Math.PI
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0x404040,
                            metalness: 0.8,
                            roughness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 507,
                            columnNumber: 11
                        }, this)
                    ]
                }, `dring${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this)),
            [
                0,
                1,
                2,
                3
            ].map((i)=>{
                const offsetX = -0.25 + i * 0.12;
                const pts = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX, 8.35, 0.58),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX + 0.03, 8.45, 0.62),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX + 0.02, 8.6, 0.55),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX, 8.75, 0.35),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX - 0.02, 10.85, 0.1),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](offsetX, 11.9, -0.1)
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                    points: pts,
                    color: 0xffcc00,
                    pulseCount: 5
                }, `fu${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 522,
                    columnNumber: 16
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableBundle, {
                startPos: [
                    -0.5,
                    9.52,
                    0.58
                ],
                endPos: [
                    -0.5,
                    8.32,
                    0.58
                ],
                cableCount: 6,
                colors: copperBlue,
                isFiber: false,
                bundleRadius: 0.12
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableBundle, {
                startPos: [
                    0.5,
                    9.52,
                    0.58
                ],
                endPos: [
                    0.5,
                    8.32,
                    0.58
                ],
                cableCount: 6,
                colors: copperGray,
                isFiber: false,
                bundleRadius: 0.12
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this),
            [
                0.18,
                -0.18
            ].map((oz, i)=>{
                const pts = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 10.3, oz + 0.6),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.02, 11.0, oz + 0.45),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 11.5, oz + 0.2),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 11.9, oz)
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                    points: pts,
                    color: i === 0 ? 0x00ff88 : 0xff6600,
                    pulseCount: 4
                }, `vt${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 551,
                    columnNumber: 16
                }, this);
            }),
            [
                -0.4,
                0.4
            ].map((ox, i)=>{
                const pts = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](ox, 1.9, 0.55),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](ox * 0.9, 2.6, 0.62),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](ox * 0.7, 3.6, 0.58)
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PowerCable, {
                    points: pts,
                    thickness: 0.022
                }, `pw${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 561,
                    columnNumber: 16
                }, this);
            }),
            Array.from({
                length: 6
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableTie, {
                    position: [
                        0,
                        2.5 + i * 1.0,
                        0.62
                    ],
                    width: 0.18
                }, `ct${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 566,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 502,
        columnNumber: 5
    }, this);
}
_c13 = RackCableSystem;
// Cross-rack high-bandwidth fiber interconnects
function CrossRackFiber({ rack1X, rack2X }) {
    const midX = (rack1X + rack2X) / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            [
                0,
                1
            ].map((idx)=>{
                const yOffset = 8.35 + idx * 0.15;
                const pts = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack1X + 0.5, yOffset, 0.6),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack1X + 0.8, yOffset + 0.1, 0.7),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](midX, yOffset + 0.15, 0.75),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack2X - 0.8, yOffset + 0.1, 0.7),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack2X - 0.5, yOffset, 0.6)
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiberCable, {
                    points: pts,
                    color: idx === 0 ? 0x00ffcc : 0xffaa00,
                    pulseCount: 5
                }, `cross${idx}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 586,
                    columnNumber: 16
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopperCable, {
                points: [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack1X + 0.3, 6.8, 0.58),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](midX, 7.0, 0.7),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](rack2X - 0.3, 6.8, 0.58)
                ],
                color: 0x888888,
                pulseCount: 2,
                thickness: 0.014
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 576,
        columnNumber: 5
    }, this);
}
_c14 = CrossRackFiber;
// SFP Module component
function SFPModule({ position }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.055,
                            0.035,
                            0.08
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 608,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x404448,
                        metalness: 0.9,
                        roughness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 609,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 607,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.042
                ],
                rotation: [
                    Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.008,
                            0.008,
                            0.01,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0x00ff88
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 614,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.05
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.02,
                            0.015,
                            0.015
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 618,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x0088ff
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 617,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 605,
        columnNumber: 5
    }, this);
}
_c15 = SFPModule;
// Spinning fan component
function SpinningFan({ position, size = 0.08 }) {
    _s6();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "SpinningFan.useFrame": ()=>{
            if (ref.current) ref.current.rotation.z += 0.15;
        }
    }["SpinningFan.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            size,
                            size,
                            0.02,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x202428,
                        metalness: 0.6,
                        roughness: 0.4
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 636,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 634,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: ref,
                position: [
                    0,
                    0,
                    0.012
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            size * 0.85,
                            6
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 640,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x303438,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 641,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 639,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.015
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            size * 0.2,
                            size * 0.2,
                            0.015,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x404448,
                        metalness: 0.8,
                        roughness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 646,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 632,
        columnNumber: 5
    }, this);
}
_s6(SpinningFan, "8QVLrcMdYxPUkj6ry5zpyt6J6X8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c16 = SpinningFan;
// Rack mounting screw
function RackScrew({ position }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                args: [
                    0.012,
                    0.012,
                    0.008,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 656,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: 0x505458,
                metalness: 0.9,
                roughness: 0.1
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 655,
        columnNumber: 5
    }, this);
}
_c17 = RackScrew;
// Brand logo text placeholder (rendered as colored strip since we can't do text easily)
function BrandStrip({ position, color, width = 0.3 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: [
                    width,
                    0.06,
                    0.005
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 666,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: color,
                emissive: color,
                emissiveIntensity: 0.3
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 667,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 665,
        columnNumber: 5
    }, this);
}
_c18 = BrandStrip;
// Rack device component - detailed with branding
function RackDevice({ y, h, type, section, label, onHover, onClick }) {
    const bodyColor = type === "fw" ? 0xdcdcdc : type === "switch" ? 0x16191e : type === "srv" ? 0x080a0e : type === "aruba" ? 0xf0f0f0 : 0x141820;
    const accentColor = type === "fw" ? 0xcc0000 : type === "switch" ? 0x049fd9 : type === "aruba" ? 0xff6600 : 0x0066cc;
    const metalness = type === "fw" || type === "aruba" ? 0.15 : 0.75;
    const roughness = type === "fw" || type === "aruba" ? 0.65 : 0.28;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            y,
            0
        ],
        onPointerOver: ()=>label && onHover?.(label),
        onPointerOut: ()=>onHover?.(null),
        onClick: ()=>section && onClick?.(section),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.12,
                            h,
                            1.08
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 704,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: bodyColor,
                        roughness: roughness,
                        metalness: metalness,
                        clearcoat: 0.4,
                        clearcoatRoughness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 705,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 703,
                columnNumber: 7
            }, this),
            (type === "switch" || type === "srv") && Array.from({
                length: 6
            }).map((_, gi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        -h / 2 + 0.04 + gi * (h / 7),
                        -0.535
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                1.8,
                                0.018,
                                0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 710,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0x080c10
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 711,
                            columnNumber: 11
                        }, this)
                    ]
                }, `gr${gi}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 709,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.545
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.1,
                            h - 0.02,
                            0.012
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 716,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: bodyColor,
                        roughness: roughness + 0.1,
                        metalness: metalness - 0.1
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 717,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 715,
                columnNumber: 7
            }, this),
            [
                -1.08,
                1.08
            ].map((ex, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                ex,
                                0,
                                0.54
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.075,
                                        h - 0.015,
                                        0.042
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 723,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                    color: 0x252a30,
                                    roughness: 0.25,
                                    metalness: 0.9,
                                    clearcoat: 0.5
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 724,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 722,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackScrew, {
                            position: [
                                ex,
                                h * 0.35,
                                0.562
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 726,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackScrew, {
                            position: [
                                ex,
                                -h * 0.35,
                                0.562
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 727,
                            columnNumber: 11
                        }, this)
                    ]
                }, `ear${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 721,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    h / 2 - 0.022,
                    0.552
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.08,
                            0.022,
                            0.006
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 732,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: accentColor
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 733,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 731,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -h / 2 + 0.012,
                    0.552
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.08,
                            0.012,
                            0.004
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: accentColor
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 738,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 736,
                columnNumber: 7
            }, this),
            type === "switch" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.13,
                        color: "#049fd9",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.95,
                            h / 2 - 0.065,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "CISCO"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 745,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.048,
                        color: "#6a8a9a",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.95,
                            h / 2 - 0.14,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "Catalyst 9300-48T"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 751,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandStrip, {
                        position: [
                            -0.45,
                            h / 2 - 0.065,
                            0.558
                        ],
                        color: 0x049fd9,
                        width: 0.12
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 756,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0,
                            0.542
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    1.68,
                                    h * 0.72,
                                    0.028
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 759,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x08090c,
                                roughness: 0.95
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 760,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 758,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 48
                    }).map((_, sp)=>{
                        const row = Math.floor(sp / 24);
                        const col = sp % 24;
                        const px = -0.7 + col * 0.058;
                        const py = 0.09 - row * 0.14;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        px,
                                        py,
                                        0.557
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.048,
                                                0.052,
                                                0.022
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 771,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x040507,
                                            roughness: 0.9
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 772,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 770,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        px - 0.014,
                                        py - 0.032,
                                        0.568
                                    ],
                                    baseColor: 0x00ff44,
                                    altColor: 0x001a00,
                                    rate: 1.2 + sp % 7 * 0.5,
                                    offset: sp * 0.13,
                                    size: 0.005
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 775,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        px + 0.014,
                                        py - 0.032,
                                        0.568
                                    ],
                                    baseColor: 0xffaa00,
                                    altColor: 0x140a00,
                                    rate: 6 + sp % 11 * 1.2,
                                    offset: sp * 0.17,
                                    size: 0.005
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 777,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, sp, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 769,
                            columnNumber: 15
                        }, this);
                    }),
                    Array.from({
                        length: 4
                    }).map((_, sfp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SFPModule, {
                            position: [
                                0.8 + sfp % 2 * 0.085,
                                0.07 - Math.floor(sfp / 2) * 0.115,
                                0.557
                            ]
                        }, `sfp${sfp}`, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 783,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.88,
                            0.05,
                            0.557
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.045,
                                    0.032,
                                    0.018
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 787,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x1a3a5a
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 788,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 786,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.88,
                            -0.04,
                            0.557
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.042,
                                    0.032,
                                    0.018
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 792,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x004488
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 793,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.78,
                            -0.1,
                            0.556
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.17,
                                    0.075,
                                    0.012
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 797,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x000e00,
                                roughness: 0.6
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 798,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 796,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.78,
                            -0.1,
                            0.563
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.15,
                                    0.058,
                                    0.003
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 801,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x00dd44,
                                transparent: true,
                                opacity: 0.85
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 802,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 800,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            -0.88,
                            -0.1,
                            0.557
                        ],
                        baseColor: 0x00ff00,
                        size: 0.009,
                        rate: 0.5
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 805,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpinningFan, {
                        position: [
                            0.7,
                            0,
                            -0.54
                        ],
                        size: 0.09
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 807,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpinningFan, {
                        position: [
                            0.5,
                            0,
                            -0.54
                        ],
                        size: 0.09
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 808,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            type === "fw" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.105,
                        color: "#cc0000",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.065,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "FORTINET"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 816,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.055,
                        color: "#cccccc",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.165,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "FortiGate 600E"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 822,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandStrip, {
                        position: [
                            -0.38,
                            h / 2 - 0.065,
                            0.558
                        ],
                        color: 0xcc0000,
                        width: 0.12
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 827,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            -h / 2 + 0.028,
                            0.553
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    2.1,
                                    0.038,
                                    0.007
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 830,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0xcc0000
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 831,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 829,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.3,
                            0,
                            0.546
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    1.28,
                                    h * 0.68,
                                    0.022
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 835,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x0c0e12,
                                roughness: 0.9
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 836,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 834,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 16
                    }).map((_, pp)=>{
                        const row = Math.floor(pp / 8);
                        const col = pp % 8;
                        const px = -0.84 + col * 0.125;
                        const py = 0.115 - row * 0.175;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        px,
                                        py,
                                        0.558
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.078,
                                                0.058,
                                                0.022
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 847,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x060810,
                                            roughness: 0.8
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 848,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 846,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        px - 0.022,
                                        py + 0.037,
                                        0.569
                                    ],
                                    baseColor: 0x00ff00,
                                    altColor: 0x001800,
                                    rate: 1.5 + pp % 5 * 0.7,
                                    offset: pp * 0.2,
                                    size: 0.006
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 850,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        px + 0.022,
                                        py + 0.037,
                                        0.569
                                    ],
                                    baseColor: 0xffaa00,
                                    altColor: 0x150800,
                                    rate: 7 + pp % 9 * 1.5,
                                    offset: pp * 0.15,
                                    size: 0.006
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 851,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, pp, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 845,
                            columnNumber: 15
                        }, this);
                    }),
                    Array.from({
                        length: 4
                    }).map((_, sfp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SFPModule, {
                            position: [
                                0.22 + sfp % 2 * 0.095,
                                0.075 - Math.floor(sfp / 2) * 0.14,
                                0.558
                            ]
                        }, `fwsfp${sfp}`, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 857,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.72,
                            0.1,
                            0.557
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.33,
                                    0.21,
                                    0.02
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 861,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x06080a,
                                roughness: 0.65
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 862,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 860,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.72,
                            0.1,
                            0.568
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.3,
                                    0.18,
                                    0.005
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 865,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x00ee44,
                                transparent: true,
                                opacity: 0.88
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 866,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 864,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.72,
                            -0.1,
                            0.558
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.055,
                                    0.04,
                                    0.016
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 870,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x0a2a4a
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 871,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 869,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.85,
                            -0.1,
                            0.558
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.04,
                                    0.02,
                                    0.012
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 875,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x202020
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 876,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 874,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.93,
                            0,
                            0.557
                        ],
                        rotation: [
                            Math.PI / 2,
                            0,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.02,
                                    0.02,
                                    0.01,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 880,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x383838,
                                metalness: 0.9,
                                roughness: 0.15
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 881,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 879,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.93,
                            0,
                            0.564
                        ],
                        baseColor: 0x00ff00,
                        size: 0.009,
                        rate: 0.4
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 883,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 5
                    }).map((_, v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0.93,
                                -h / 2 + 0.06 + v * 0.055,
                                -0.535
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.15,
                                        0.016,
                                        0.01
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 887,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0x080c10
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 888,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, v, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 886,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true),
            type === "srv" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.11,
                        color: "#007db8",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.08,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "DELL"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 900,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.045,
                        color: "#888888",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.17,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "PowerEdge R750"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 906,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandStrip, {
                        position: [
                            -0.45,
                            h / 2 - 0.08,
                            0.558
                        ],
                        color: 0x007db8,
                        width: 0.15
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 911,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.8,
                            0.05,
                            0.548
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.3,
                                    0.5,
                                    0.015
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 915,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x06080a,
                                roughness: 0.9
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 916,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 914,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 15
                    }).map((_, vx)=>Array.from({
                            length: 10
                        }).map((_, vy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    -0.92 + vx * 0.018,
                                    -0.15 + vy * 0.045 + vx % 2 * 0.02,
                                    0.556
                                ],
                                rotation: [
                                    Math.PI / 2,
                                    0,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                        args: [
                                            0.007,
                                            0.007,
                                            0.004,
                                            6
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 921,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                        color: 0x030405
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 922,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `v${vx}-${vy}`, true, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 920,
                                columnNumber: 15
                            }, this))),
                    Array.from({
                        length: 12
                    }).map((_, db)=>{
                        const row = Math.floor(db / 6);
                        const col = db % 6;
                        const bx = -0.5 + col * 0.22;
                        const by = 0.15 - row * 0.35;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        bx,
                                        by,
                                        0.555
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.2,
                                                0.28,
                                                0.03
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 937,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                            color: 0x3a4048,
                                            roughness: 0.3,
                                            metalness: 0.8
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 938,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 936,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        bx - 0.07,
                                        by,
                                        0.57
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.04,
                                                0.25,
                                                0.005
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 941,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x15181c
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 942,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 940,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        bx + 0.07,
                                        by - 0.08,
                                        0.57
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.03,
                                                0.08,
                                                0.01
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 946,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x600000
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 947,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 945,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        bx + 0.07,
                                        by + 0.1,
                                        0.575
                                    ],
                                    baseColor: 0x4488ff,
                                    altColor: 0x081828,
                                    rate: 4 + Math.random() * 6,
                                    offset: Math.random() * 6,
                                    size: 0.007
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 950,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        bx + 0.07,
                                        by + 0.05,
                                        0.575
                                    ],
                                    baseColor: 0x00ff88,
                                    altColor: 0x081808,
                                    rate: 15 + Math.random() * 20,
                                    offset: Math.random() * 6,
                                    size: 0.005
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 952,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, db, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 934,
                            columnNumber: 15
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.88,
                            0.15,
                            0.555
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.15,
                                    0.25,
                                    0.015
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 959,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x080a0c
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 960,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 958,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.88,
                            0.2,
                            0.563
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.1,
                                    0.08,
                                    0.005
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 963,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x00aacc,
                                transparent: true,
                                opacity: 0.6
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 964,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 962,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.85,
                            0,
                            0.558
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.04,
                                    0.025,
                                    0.015
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 969,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x0044aa
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 970,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 968,
                        columnNumber: 11
                    }, this),
                    [
                        0,
                        0.05
                    ].map((offset, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0.92,
                                -0.05 + offset,
                                0.558
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.035,
                                        0.015,
                                        0.01
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 975,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0x1a1a1a
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 976,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `usb${i}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 974,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.88,
                            -0.15,
                            0.558
                        ],
                        rotation: [
                            Math.PI / 2,
                            0,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.02,
                                    0.02,
                                    0.01,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 981,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x404040,
                                metalness: 0.8
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 982,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 980,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.88,
                            -0.15,
                            0.565
                        ],
                        baseColor: 0x00ff00,
                        size: 0.008,
                        rate: 0
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 984,
                        columnNumber: 11
                    }, this),
                    [
                        -0.8,
                        -0.6
                    ].map((px, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            position: [
                                px,
                                -0.15,
                                -0.535
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.16,
                                                0.2,
                                                0.02
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 990,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x202428
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 991,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 989,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpinningFan, {
                                    position: [
                                        0,
                                        0,
                                        -0.01
                                    ],
                                    size: 0.04
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 994,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        0.05,
                                        0,
                                        -0.015
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.02,
                                                0.12,
                                                0.04
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 997,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x404448
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 998,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 996,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        -0.05,
                                        0.06,
                                        -0.015
                                    ],
                                    baseColor: 0x00ff44,
                                    size: 0.005
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1001,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `psu${i}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 988,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true),
            type === "aruba" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.11,
                        color: "#ff6600",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.025,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "ARUBA"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1011,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.05,
                        color: "#eeeeee",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.98,
                            h / 2 - 0.115,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "ClearPass 7280"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1017,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandStrip, {
                        position: [
                            -0.45,
                            h / 2 - 0.025,
                            0.558
                        ],
                        color: 0xff6600,
                        width: 0.15
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1022,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0,
                            0.546
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    1.5,
                                    h * 0.65,
                                    0.018
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1026,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0xc0c4c8,
                                roughness: 0.8
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1027,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1025,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 6
                    }).map((_, p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        -0.5 + p * 0.16,
                                        0,
                                        0.556
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.075,
                                                0.052,
                                                0.018
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1034,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x080808
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1033,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        -0.51 + p * 0.16,
                                        -0.038,
                                        0.566
                                    ],
                                    baseColor: 0x00ff44,
                                    altColor: 0x001a00,
                                    rate: 2 + Math.random() * 3,
                                    offset: Math.random() * 6,
                                    size: 0.005
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1037,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, p, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1032,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.55,
                            0,
                            0.556
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.22,
                                    0.12,
                                    0.01
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1043,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x080808
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1044,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1042,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.55,
                            0,
                            0.562
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.2,
                                    0.1,
                                    0.002
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1047,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x2288ff,
                                transparent: true,
                                opacity: 0.9
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1048,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1046,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.8,
                            0.04,
                            0.556
                        ],
                        baseColor: 0x00ff00,
                        size: 0.008
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1052,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.8,
                            0,
                            0.556
                        ],
                        baseColor: 0xffaa00,
                        rate: 1.2,
                        size: 0.008
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1053,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.8,
                            -0.04,
                            0.556
                        ],
                        baseColor: 0x00aaff,
                        rate: 0,
                        size: 0.008
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1054,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            type === "patch" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0,
                            0.546
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    2.08,
                                    h * 0.9,
                                    0.022
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1063,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x121418,
                                roughness: 0.6,
                                metalness: 0.8
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1064,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1062,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 24
                    }).map((_, pp)=>{
                        const px = -0.92 + pp * 0.08;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        px,
                                        -0.02,
                                        0.558
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.052,
                                                0.065,
                                                0.015
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1074,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x050608,
                                            roughness: 0.8
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1073,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        px,
                                        -0.02,
                                        0.562
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.038,
                                                0.045,
                                                0.01
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x0a0c10
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1080,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        px,
                                        0.06,
                                        0.558
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.045,
                                                0.025,
                                                0.003
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1084,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0xf8f9fa
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1085,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1083,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, pp, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1071,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true),
            type === "ups" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.13,
                        color: "#00aa44",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.95,
                            h / 2 - 0.1,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "APC"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1097,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontSize: 0.055,
                        color: "#aaaaaa",
                        anchorX: "left",
                        anchorY: "middle",
                        position: [
                            -0.95,
                            h / 2 - 0.22,
                            0.562
                        ],
                        font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
                        children: "Smart-UPS SRT 3000VA"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandStrip, {
                        position: [
                            -0.5,
                            h / 2 - 0.1,
                            0.558
                        ],
                        color: 0x00aa44,
                        width: 0.15
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1108,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 12
                    }).map((_, vx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                -0.95 + vx * 0.08,
                                -0.1,
                                0.552
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.04,
                                        0.4,
                                        0.015
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1113,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0x06080a
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1114,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `upsv${vx}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1112,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.2,
                            0.1,
                            0.555
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.38,
                                    0.28,
                                    0.02
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x040506,
                                roughness: 0.6
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.2,
                            0.1,
                            0.566
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.34,
                                    0.22,
                                    0.005
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0x00ffaa,
                                transparent: true,
                                opacity: 0.75
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1123,
                        columnNumber: 11
                    }, this),
                    [
                        -0.08,
                        0,
                        0.08
                    ].map((ox, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0.2 + ox,
                                -0.08,
                                0.56
                            ],
                            rotation: [
                                Math.PI / 2,
                                0,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                    args: [
                                        0.02,
                                        0.02,
                                        0.01,
                                        8
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0x2a2a2a
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `btn${bi}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1129,
                            columnNumber: 13
                        }, this)),
                    Array.from({
                        length: 5
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        0.5,
                                        0.2 - i * 0.04,
                                        0.558
                                    ],
                                    baseColor: i < 3 ? 0x00ff00 : i === 3 ? 0xffaa00 : 0xff0000,
                                    altColor: 0x001100,
                                    rate: i < 2 ? 0 : 0.5,
                                    offset: i * 0.3,
                                    size: 0.01
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                                    position: [
                                        0.55,
                                        0.2 - i * 0.04,
                                        0.558
                                    ],
                                    baseColor: 0x00ff00,
                                    altColor: 0x002200,
                                    rate: 0,
                                    size: 0.01
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1141,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `bat${i}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1137,
                            columnNumber: 13
                        }, this)),
                    Array.from({
                        length: 8
                    }).map((_, o)=>{
                        const ox = 0.7 + o % 2 * 0.18;
                        const oy = 0.15 - Math.floor(o / 2) * 0.15;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        ox,
                                        oy,
                                        0.558
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.12,
                                                0.1,
                                                0.015
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1152,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x181a1c
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1151,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        ox,
                                        oy,
                                        0.566
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                            args: [
                                                0.06,
                                                0.08,
                                                0.005
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1156,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                            color: 0x040404
                                        }, void 0, false, {
                                            fileName: "[project]/components/datacenter-scene.tsx",
                                            lineNumber: 1157,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1155,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, `out${o}`, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1150,
                            columnNumber: 15
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpinningFan, {
                        position: [
                            -0.7,
                            0,
                            -0.53
                        ],
                        size: 0.12
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1164,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpinningFan, {
                        position: [
                            -0.4,
                            0,
                            -0.53
                        ],
                        size: 0.12
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1165,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 696,
        columnNumber: 5
    }, this);
}
_c19 = RackDevice;
// Server rack
function ServerRack({ x, onHover, onClick }) {
    const devs = [
        {
            y: 4.4,
            h: 0.28,
            type: "patch"
        },
        {
            y: 4.0,
            h: 0.28,
            type: "patch"
        },
        {
            y: 3.35,
            h: 0.55,
            type: "switch",
            section: "rack",
            label: "Cisco Core Switch L3"
        },
        {
            y: 2.65,
            h: 0.55,
            type: "switch",
            section: "rack",
            label: "Cisco Distribution Sw"
        },
        {
            y: 1.75,
            h: 0.82,
            type: "fw",
            section: "firewall",
            label: "FortiGate NGFW"
        },
        {
            y: 0.75,
            h: 0.55,
            type: "switch",
            section: "rack",
            label: "Cisco Access Switch"
        },
        {
            y: 0.08,
            h: 0.55,
            type: "switch",
            section: "rack",
            label: "Cisco Access Switch 2"
        },
        {
            y: -0.55,
            h: 0.28,
            type: "aruba",
            section: "skills",
            label: "ClearPass 7200"
        },
        {
            y: -1.15,
            h: 0.72,
            type: "srv",
            section: "projects",
            label: "Server Node A"
        },
        {
            y: -2.0,
            h: 0.72,
            type: "srv",
            section: "projects",
            label: "Server Node B"
        },
        {
            y: -2.85,
            h: 0.28,
            type: "patch"
        },
        {
            y: -3.4,
            h: 0.78,
            type: "ups"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            x,
            5.3,
            0
        ],
        children: [
            [
                -1.225,
                1.225
            ].map((ex, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        ex,
                        0,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.055,
                                10.4,
                                1.58
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x0d1a24,
                            roughness: 0.5,
                            metalness: 0.7,
                            clearcoat: 0.5
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1194,
                            columnNumber: 11
                        }, this)
                    ]
                }, `fp${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1192,
                    columnNumber: 9
                }, this)),
            [
                5.175,
                -5.175
            ].map((ty, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        ty,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                2.45,
                                0.06,
                                1.58
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1200,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x0d1a24,
                            roughness: 0.5,
                            metalness: 0.7,
                            clearcoat: 0.5
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1201,
                            columnNumber: 11
                        }, this)
                    ]
                }, `tb${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1199,
                    columnNumber: 9
                }, this)),
            [
                -1.1,
                1.1
            ].map((rx, ri)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                rx,
                                0,
                                0.56
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.055,
                                        10.2,
                                        0.05
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                    color: 0x2a3a4a,
                                    roughness: 0.3,
                                    metalness: 0.9,
                                    clearcoat: 0.6
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1209,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1207,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 42
                        }).map((_, u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    rx,
                                    -4.9 + u * 0.245,
                                    0.588
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: [
                                            0.016,
                                            0.01,
                                            0.007
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 1213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                        color: 0x404850,
                                        metalness: 0.95,
                                        roughness: 0.1
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 1214,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, u, true, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1212,
                                columnNumber: 13
                            }, this))
                    ]
                }, `fr${ri}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1206,
                    columnNumber: 9
                }, this)),
            [
                -1.1,
                1.1
            ].map((rx, ri)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        rx,
                        0,
                        -0.56
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.055,
                                10.2,
                                0.05
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x1e2c38,
                            roughness: 0.3,
                            metalness: 0.9
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1223,
                            columnNumber: 11
                        }, this)
                    ]
                }, `rr${ri}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1221,
                    columnNumber: 9
                }, this)),
            [
                -1.26,
                1.26
            ].map((sx, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        sx,
                        0,
                        0
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.01,
                                10.3,
                                1.5
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x0a1218,
                            roughness: 0.6,
                            metalness: 0.4,
                            transparent: true,
                            opacity: 0.88
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1230,
                            columnNumber: 11
                        }, this)
                    ]
                }, `sp${si}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1228,
                    columnNumber: 9
                }, this)),
            [
                -1.26,
                1.26
            ].map((sx, si)=>Array.from({
                    length: 28
                }).map((_, pi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            sx,
                            -4.2 + pi * 0.31,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.014,
                                    0.04,
                                    1.3
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: 0x111820
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1237,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `pf${si}-${pi}`, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1235,
                        columnNumber: 11
                    }, this))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    1.08,
                    0,
                    -0.38
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.05,
                            9.8,
                            0.05
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x0e1820,
                        roughness: 0.5,
                        metalness: 0.65
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1244,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1242,
                columnNumber: 7
            }, this),
            Array.from({
                length: 10
            }).map((_, o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    position: [
                        1.08,
                        -4.2 + o * 0.95,
                        -0.38
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        0.05,
                                        0.065,
                                        0.05
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: 0x18242e
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1250,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1248,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                            position: [
                                0,
                                0.038,
                                0.028
                            ],
                            baseColor: 0x00ff88,
                            altColor: 0x002200,
                            rate: 0.4,
                            offset: o * 0.6,
                            size: 0.005
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1252,
                            columnNumber: 11
                        }, this)
                    ]
                }, `pdu${o}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1247,
                    columnNumber: 9
                }, this)),
            [
                3.72,
                3.04,
                -0.18,
                -0.83
            ].map((by, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            position: [
                                0,
                                by,
                                0.545
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                    args: [
                                        2.08,
                                        0.23,
                                        0.01
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                    color: 0x141c24,
                                    roughness: 0.7,
                                    metalness: 0.5
                                }, void 0, false, {
                                    fileName: "[project]/components/datacenter-scene.tsx",
                                    lineNumber: 1260,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1258,
                            columnNumber: 11
                        }, this),
                        Array.from({
                            length: 8
                        }).map((_, s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                position: [
                                    -0.72 + s * 0.21,
                                    by,
                                    0.551
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                        args: [
                                            0.13,
                                            0.055,
                                            0.004
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 1264,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                        color: 0x090e14
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 1265,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s, true, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1263,
                                columnNumber: 13
                            }, this))
                    ]
                }, `bl${bi}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1257,
                    columnNumber: 9
                }, this)),
            Array.from({
                length: 11
            }).map((_, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        1.13,
                        -4.5 + r * 0.9,
                        0.6
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                            args: [
                                0.028,
                                0.006,
                                6,
                                10,
                                Math.PI
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1273,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0x2e3840,
                            metalness: 0.8,
                            roughness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1274,
                            columnNumber: 11
                        }, this)
                    ]
                }, `dr${r}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1272,
                    columnNumber: 9
                }, this)),
            devs.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackDevice, {
                    y: d.y,
                    h: d.h,
                    type: d.type,
                    section: d.section,
                    label: d.label,
                    onHover: onHover,
                    onClick: onClick
                }, i, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1279,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1189,
        columnNumber: 5
    }, this);
}
_c20 = ServerRack;
// Canvas texture hook - optimized for performance
function useCanvasTex(w, h, draw) {
    _s7();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tex, setTex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCanvasTex.useEffect": ()=>{
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            canvasRef.current = c;
            const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
            t.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            t.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            setTex(t);
        }
    }["useCanvasTex.useEffect"], [
        w,
        h
    ]);
    const lastDraw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "useCanvasTex.useFrame": ({ clock })=>{
            if (clock.elapsedTime - lastDraw.current > 0.033) {
                if (canvasRef.current && tex) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                        draw(ctx, clock.elapsedTime);
                        tex.needsUpdate = true;
                    }
                }
                lastDraw.current = clock.elapsedTime;
            }
        }
    }["useCanvasTex.useFrame"]);
    return tex;
}
_s7(useCanvasTex, "MizR800c8HzpwE6UubrAKIipcuw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
// Wall monitor
function WallMonitor({ position, size, section, label, draw, onHover, onClick }) {
    _s8();
    const tex = useCanvasTex(1024, 640, draw);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        onPointerOver: ()=>onHover?.(label),
        onPointerOut: ()=>onHover?.(null),
        onClick: ()=>onClick?.(section),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            size[0],
                            size[1],
                            0.06
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x101820,
                        roughness: 0.5,
                        metalness: 0.6,
                        clearcoat: 0.4
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1340,
                columnNumber: 7
            }, this),
            tex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.035
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            size[0] - 0.12,
                            size[1] - 0.08
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1346,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        map: tex,
                        emissiveMap: tex,
                        emissive: 0xffffff,
                        emissiveIntensity: 1.5
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1347,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1345,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1339,
        columnNumber: 5
    }, this);
}
_s8(WallMonitor, "3o3WrtHAYekJW1DnjrfNu5QOB9M=", false, function() {
    return [
        useCanvasTex
    ];
});
_c21 = WallMonitor;
// Wall monitors bank
function WallMonitors({ onHover, onClick }) {
    _s9();
    const drawNist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawNist]": (ctx, t)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 40px Arial";
            ctx.fillText("NIST 800-53 COMPLIANCE", 20, 55);
            const controls = [
                "AC-2  Account Management",
                "AU-2  Audit Events",
                "CM-8  Information Inventory",
                "IA-2  Identification & Auth",
                "SC-7  Boundary Protection",
                "SI-4  System Monitoring"
            ];
            for(let i = 0; i < controls.length; i++){
                const y = 120 + i * 70;
                ctx.fillStyle = "#050a0f";
                ctx.fillRect(20, y - 30, 984, 55);
                ctx.fillStyle = "#00ffe7";
                ctx.font = "bold 28px Arial";
                ctx.fillText(controls[i], 35, y);
                const p = i < 4 ? 1.0 : Math.sin(t * 0.5) * 0.1 + 0.85;
                ctx.fillStyle = p > 0.9 ? "#00ff44" : "#ffaa00";
                ctx.fillRect(550, y - 25, 430 * p, 35);
                ctx.fillStyle = "#000";
                ctx.font = "bold 22px Arial";
                ctx.fillText(p > 0.9 ? "PASS" : "WARN", 560, y);
            }
        }
    }["WallMonitors.useCallback[drawNist]"], []);
    const drawDna = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawDna]": (ctx)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 38px Arial";
            ctx.fillText("CISCO DNA // ASSURANCE", 20, 55);
            const cx = 200, cy = 320, r = 110;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = "#112233";
            ctx.lineWidth = 20;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.98);
            ctx.strokeStyle = "#00ff44";
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = "bold 60px Arial";
            ctx.textAlign = "center";
            ctx.fillText("98%", cx, cy + 18);
            ctx.fillStyle = "#aaa";
            ctx.font = "28px Arial";
            ctx.fillText("HEALTH", cx, cy + 55);
            ctx.textAlign = "left";
            ctx.fillStyle = "#00ffe7";
            ctx.font = "bold 28px Arial";
            ctx.fillText("WIRED: 1,248", 420, 200);
            ctx.fillText("WIRELESS: 8,432", 420, 280);
            ctx.fillStyle = "#00ff44";
            ctx.fillText("ROGUE: 0", 420, 360);
        }
    }["WallMonitors.useCallback[drawDna]"], []);
    const drawLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawLogs]": (ctx, t)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 38px Arial";
            ctx.fillText("FORTIANALYZER // LIVE LOGS", 20, 55);
            const logs = [
                "srcip=10.0.4.15      dstip=192.168.1.10   action=ACCEPT",
                "logid=0000000013  type=traffic  level=notice",
                'app="Web.Client"  policyid=42  service=HTTPS',
                "sentbyte=4512    rcvdbyte=18492    pkt=24",
                "[!!] BLOCKED  srcip=45.33.32.156  dstport=22",
                "IPS MATCH: ET.SCAN.SSH.BRUTE  ACTION=DROP"
            ];
            ctx.font = "26px monospace";
            for(let i = 0; i < 6; i++){
                const idx = (Math.floor(t * 1.5) + i) % logs.length;
                const isErr = logs[idx].includes("[!!]");
                const isDrop = logs[idx].includes("DROP");
                ctx.fillStyle = isErr ? "#ff5555" : isDrop ? "#ffaa00" : "#00ffe7";
                ctx.fillText(logs[idx], 20, 120 + i * 55);
            }
        }
    }["WallMonitors.useCallback[drawLogs]"], []);
    const drawOspf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawOspf]": (ctx, t)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 38px Arial";
            ctx.fillText("OSPF TOPOLOGY", 20, 55);
            const nodes = [
                {
                    x: 160,
                    y: 280,
                    name: "CORE-1",
                    col: "#00ffe7"
                },
                {
                    x: 340,
                    y: 420,
                    name: "CORE-2",
                    col: "#00ffe7"
                },
                {
                    x: 500,
                    y: 200,
                    name: "DIST-A",
                    col: "#00ff88"
                },
                {
                    x: 680,
                    y: 450,
                    name: "DIST-B",
                    col: "#00ff88"
                },
                {
                    x: 840,
                    y: 260,
                    name: "ACCESS",
                    col: "#4466ff"
                }
            ];
            const links = [
                [
                    0,
                    1
                ],
                [
                    0,
                    2
                ],
                [
                    1,
                    3
                ],
                [
                    2,
                    4
                ],
                [
                    3,
                    4
                ],
                [
                    0,
                    3
                ]
            ];
            for (const [a, b] of links){
                ctx.strokeStyle = "#0055a4";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(nodes[a].x, nodes[a].y);
                ctx.lineTo(nodes[b].x, nodes[b].y);
                ctx.stroke();
                const pp = (t * 0.6 + a * 0.18) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * pp;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * pp;
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fill();
            }
            for (const n of nodes){
                ctx.fillStyle = "#020608";
                ctx.beginPath();
                ctx.arc(n.x, n.y, 40, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = n.col;
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.fillStyle = n.col;
                ctx.font = "bold 22px Arial";
                ctx.textAlign = "center";
                ctx.fillText(n.name, n.x, n.y + 8);
            }
            ctx.textAlign = "left";
        }
    }["WallMonitors.useCallback[drawOspf]"], []);
    const drawPrtg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawPrtg]": (ctx, t)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 38px Arial";
            ctx.fillText("PRTG // SENSORS", 20, 55);
            const sensors = [
                {
                    name: "CPU Load",
                    val: 23 + Math.floor(Math.sin(t) * 5)
                },
                {
                    name: "Memory",
                    val: 67 + Math.floor(Math.sin(t * 0.7) * 3)
                },
                {
                    name: "Disk I/O",
                    val: 45 + Math.floor(Math.sin(t * 1.2) * 8)
                },
                {
                    name: "Network In",
                    val: 78 + Math.floor(Math.sin(t * 0.5) * 10)
                },
                {
                    name: "Network Out",
                    val: 34 + Math.floor(Math.sin(t * 0.8) * 6)
                },
                {
                    name: "Ping RTT",
                    val: 12 + Math.floor(Math.sin(t * 2) * 4)
                }
            ];
            for(let i = 0; i < sensors.length; i++){
                const y = 115 + i * 65;
                ctx.fillStyle = "#050a0f";
                ctx.fillRect(20, y, 984, 50);
                ctx.fillStyle = sensors[i].val > 70 ? "#ffaa00" : "#00ff44";
                ctx.font = "bold 24px Arial";
                ctx.fillText(sensors[i].name, 35, y + 33);
                ctx.fillStyle = "#00ffe7";
                ctx.fillText(sensors[i].val + "%", 300, y + 33);
                ctx.fillStyle = sensors[i].val > 70 ? "#ffaa00" : "#00ff44";
                ctx.fillRect(420, y + 12, 560 * (sensors[i].val / 100), 26);
            }
        }
    }["WallMonitors.useCallback[drawPrtg]"], []);
    const drawProjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WallMonitors.useCallback[drawProjects]": (ctx, t)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 38px Arial";
            ctx.fillText("PROJECTS HUB", 20, 55);
            const projs = [
                {
                    name: "FortiGate Enterprise",
                    pct: 100
                },
                {
                    name: "802.1X NAC Deploy",
                    pct: 95
                },
                {
                    name: "3D Portfolio",
                    pct: 88
                },
                {
                    name: "Cyber Labs",
                    pct: 75
                },
                {
                    name: "NSE 4 Certification",
                    pct: 60 + Math.floor(Math.sin(t * 0.3) * 5)
                }
            ];
            for(let i = 0; i < projs.length; i++){
                const y = 115 + i * 85;
                ctx.fillStyle = "#fff";
                ctx.font = "bold 26px Arial";
                ctx.fillText(projs[i].name, 35, y + 20);
                ctx.fillStyle = "#333344";
                ctx.fillRect(35, y + 35, 900, 28);
                ctx.fillStyle = projs[i].pct === 100 ? "#00ff44" : projs[i].pct > 80 ? "#00ffe7" : "#ffaa00";
                ctx.fillRect(35, y + 35, 900 * (projs[i].pct / 100), 28);
                ctx.fillStyle = "#fff";
                ctx.font = "22px Arial";
                ctx.fillText(projs[i].pct + "%", 950, y + 20);
            }
        }
    }["WallMonitors.useCallback[drawProjects]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            5.5,
            -12.7
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.2,
                    -0.1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            14,
                            6.5,
                            0.15
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1552,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x181c20,
                        roughness: 0.8
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1553,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1551,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    -4.2,
                    2.8,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "about",
                label: "NIST Compliance",
                draw: drawNist,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    0,
                    2.8,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "skills",
                label: "Cisco DNA",
                draw: drawDna,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1558,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    4.2,
                    2.8,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "firewall",
                label: "FortiAnalyzer",
                draw: drawLogs,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1559,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    -4.2,
                    -0.4,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "rack",
                label: "OSPF Topology",
                draw: drawOspf,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1562,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    0,
                    -0.4,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "skills",
                label: "PRTG Sensors",
                draw: drawPrtg,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1563,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                position: [
                    4.2,
                    -0.4,
                    0
                ],
                size: [
                    3.8,
                    2.4
                ],
                section: "projects",
                label: "Projects Hub",
                draw: drawProjects,
                onHover: onHover,
                onClick: onClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1564,
                columnNumber: 7
            }, this),
            [
                [
                    -4.2,
                    2.8
                ],
                [
                    0,
                    2.8
                ],
                [
                    4.2,
                    2.8
                ],
                [
                    -4.2,
                    -0.4
                ],
                [
                    0,
                    -0.4
                ],
                [
                    4.2,
                    -0.4
                ]
            ].map(([x, y], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        x,
                        y,
                        -0.02
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                3.95,
                                2.55,
                                0.04
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1569,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: 0x101418,
                            roughness: 0.6,
                            metalness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1570,
                            columnNumber: 11
                        }, this)
                    ]
                }, `bezel${i}`, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1568,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1549,
        columnNumber: 5
    }, this);
}
_s9(WallMonitors, "65DwGyunyAZmd5MGgySZd2kO9Zw=");
_c22 = WallMonitors;
// Coffee mug
function CoffeeMug({ position }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.12,
                            0.1,
                            0.28,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1582,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0xeeeeee,
                        roughness: 0.1,
                        clearcoat: 1.0
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1583,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1581,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.12,
                    0,
                    0
                ],
                rotation: [
                    0,
                    Math.PI / 2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            0.08,
                            0.02,
                            8,
                            16,
                            Math.PI
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1586,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0xeeeeee,
                        roughness: 0.1,
                        clearcoat: 1.0
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1587,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1585,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.01,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.098,
                            0.086,
                            0.26,
                            24
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1590,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x180900,
                        roughness: 0.02
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1591,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1589,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.135,
                    0
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            0.097,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1594,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x3a1200,
                        roughness: 0,
                        clearcoat: 1.0
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1595,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1593,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                color: 0x663300,
                intensity: 0.4,
                distance: 0.8,
                position: [
                    0,
                    0.2,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1597,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1580,
        columnNumber: 5
    }, this);
}
_c23 = CoffeeMug;
// Workstation
function Workstation({ onHover, onClick }) {
    _s10();
    const fan1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fan2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Workstation.useFrame": ({ clock })=>{
            if (fan1.current) fan1.current.rotation.z += 0.07;
            if (fan2.current) fan2.current.rotation.z += 0.09;
            if (rgb.current) {
                const t = clock.elapsedTime;
                rgb.current.color.setRGB(Math.sin(t * 0.7) * 0.5 + 0.5, Math.sin(t * 0.7 + 2.09) * 0.5 + 0.5, Math.sin(t * 0.7 + 4.18) * 0.5 + 0.5);
            }
        }
    }["Workstation.useFrame"]);
    const drawProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Workstation.useCallback[drawProfile]": (ctx)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#00ffe7";
            ctx.font = "bold 36px Arial";
            ctx.fillText("MOHAMMAD YASSIN // PROFILE", 20, 55);
            ctx.fillStyle = "#fff";
            ctx.font = "28px Arial";
            ctx.fillText("Network Engineer & Developer", 35, 140);
            ctx.fillStyle = "#aaa";
            ctx.font = "22px Arial";
            ctx.fillText("5+ Years Enterprise Networking Experience", 35, 185);
            ctx.fillText("BGP · OSPF · Fortinet · 802.1X NAC", 35, 220);
            const stats = [
                {
                    l: "YEARS",
                    v: "5+"
                },
                {
                    l: "CERTS",
                    v: "NSE"
                },
                {
                    l: "ROUTING",
                    v: "BGP"
                },
                {
                    l: "DEV",
                    v: "3D"
                }
            ];
            for(let i = 0; i < 4; i++){
                const x = 35 + i % 2 * 220, y = 280 + Math.floor(i / 2) * 120;
                ctx.fillStyle = "#00ffe710";
                ctx.fillRect(x, y, 180, 90);
                ctx.fillStyle = "#00ffe7";
                ctx.font = "bold 40px Arial";
                ctx.fillText(stats[i].v, x + 18, y + 50);
                ctx.fillStyle = "#666";
                ctx.font = "16px Arial";
                ctx.fillText(stats[i].l, x + 18, y + 75);
            }
        }
    }["Workstation.useCallback[drawProfile]"], []);
    const drawSkills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Workstation.useCallback[drawSkills]": (ctx)=>{
            ctx.fillStyle = "#020608";
            ctx.fillRect(0, 0, 1024, 640);
            ctx.fillStyle = "#011118";
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillStyle = "#00ffe7";
            ctx.font = "bold 36px Arial";
            ctx.fillText("SKILLS DASHBOARD", 20, 55);
            const cx = 180, cy = 300, r = 90;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = "#112233";
            ctx.lineWidth = 16;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.98);
            ctx.strokeStyle = "#00ff44";
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = "bold 48px Arial";
            ctx.textAlign = "center";
            ctx.fillText("98%", cx, cy + 15);
            ctx.fillStyle = "#666";
            ctx.font = "20px Arial";
            ctx.fillText("NET HEALTH", cx, cy + 45);
            ctx.textAlign = "left";
            const skills = [
                {
                    n: "Fortinet",
                    p: 92
                },
                {
                    n: "BGP/OSPF",
                    p: 88
                },
                {
                    n: "802.1X",
                    p: 85
                },
                {
                    n: "Python",
                    p: 80
                }
            ];
            for(let i = 0; i < 4; i++){
                const y = 140 + i * 65;
                ctx.fillStyle = "#00ffe7";
                ctx.font = "22px Arial";
                ctx.fillText(skills[i].n, 380, y);
                ctx.fillStyle = "#333344";
                ctx.fillRect(380, y + 12, 300, 18);
                ctx.fillStyle = "#00ffe7";
                ctx.fillRect(380, y + 12, 300 * (skills[i].p / 100), 18);
                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText(skills[i].p + "%", 700, y);
            }
        }
    }["Workstation.useCallback[drawSkills]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            7.5,
            0,
            1.2
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.82,
                    0
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            4.8,
                            0.1,
                            2.3
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1692,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x1a2a38,
                        roughness: 0.55,
                        metalness: 0.3,
                        clearcoat: 0.4
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1693,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1691,
                columnNumber: 7
            }, this),
            [
                [
                    2.2,
                    -1.05
                ],
                [
                    2.2,
                    1.05
                ],
                [
                    -2.2,
                    -1.05
                ],
                [
                    -2.2,
                    1.05
                ]
            ].map(([lx, lz], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        lx,
                        0.91,
                        lz
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                0.08,
                                1.82,
                                0.08
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1698,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x1a2a38,
                            roughness: 0.4,
                            metalness: 0.7
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1699,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1697,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.5,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            4.6,
                            0.06,
                            2.0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1704,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x142028,
                        roughness: 0.6,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1705,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1703,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    0,
                    -1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            2.26,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.08,
                                    0.85,
                                    0.08
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1710,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x2a3a48,
                                roughness: 0.4,
                                metalness: 0.7
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1711,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1709,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.85,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.55,
                                    0.04,
                                    0.38
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1714,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x2a3a48,
                                roughness: 0.4,
                                metalness: 0.7
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1715,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1713,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                        position: [
                            0,
                            3.09,
                            0
                        ],
                        size: [
                            2.6,
                            1.55
                        ],
                        section: "about",
                        label: "My Profile",
                        draw: drawProfile,
                        onHover: onHover,
                        onClick: onClick
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1717,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1708,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    2.2,
                    0,
                    -0.6
                ],
                rotation: [
                    0,
                    -0.28,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            2.22,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.06,
                                    0.75,
                                    0.06
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1722,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x2a3a48,
                                roughness: 0.4,
                                metalness: 0.7
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1723,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1721,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitor, {
                        position: [
                            0,
                            2.78,
                            0
                        ],
                        size: [
                            1.75,
                            1.06
                        ],
                        section: "skills",
                        label: "Skills Dashboard",
                        draw: drawSkills,
                        onHover: onHover,
                        onClick: onClick
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1725,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1720,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.87,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.3,
                            0.04,
                            0.45
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1729,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x141e28,
                        roughness: 0.7,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1730,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1728,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    1.6,
                    1.855,
                    -0.2
                ],
                scale: [
                    1,
                    0.5,
                    1.3
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.11,
                            10,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1734,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x141e28,
                        roughness: 0.5,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1735,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1733,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoffeeMug, {
                position: [
                    -1.3,
                    2.05,
                    0.3
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1738,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    1.8,
                    0.955,
                    -0.2
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.4,
                                    0.85,
                                    0.8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1742,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x1a1a1a,
                                roughness: 0.3,
                                metalness: 0.7
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1743,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1741,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.21,
                            0,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    0.01,
                                    0.82,
                                    0.76
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1746,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                color: 0x0a1420,
                                roughness: 0.05,
                                transparent: true,
                                opacity: 0.3,
                                clearcoat: 1.0
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1747,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1745,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        ref: rgb,
                        color: 0x00ffe7,
                        intensity: 0.8,
                        distance: 1.5
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1749,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        ref: fan1,
                        position: [
                            0,
                            -0.2,
                            0.39
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                                args: [
                                    0.1,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1751,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhongMaterial", {
                                color: 0x050e18,
                                emissive: 0x4466ff,
                                emissiveIntensity: 0.35
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1752,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1750,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        ref: fan2,
                        position: [
                            0,
                            0.1,
                            -0.39
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                                args: [
                                    0.12,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1755,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhongMaterial", {
                                color: 0x050e18,
                                emissive: 0x00ffe7,
                                emissiveIntensity: 0.2
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 1756,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1754,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            -0.12,
                            0.4,
                            0.39
                        ],
                        baseColor: 0x00ff88
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1758,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LED, {
                        position: [
                            0.12,
                            0.4,
                            0.39
                        ],
                        baseColor: 0x00ff88
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1759,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1740,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    3.5,
                    1.5
                ],
                color: 0x0055ff,
                intensity: 1.2,
                distance: 10
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1762,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1689,
        columnNumber: 5
    }, this);
}
_s10(Workstation, "SvqCyk436P17gIY3FgZJeaYONUY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c24 = Workstation;
// Chair
function Chair() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            7.5,
            1.2,
            3.5
        ],
        rotation: [
            0,
            Math.PI,
            0
        ],
        scale: 1.6,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.8,
                            0.07,
                            0.72
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1772,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x141e28,
                        roughness: 0.7,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1773,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1771,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.51,
                    -0.33
                ],
                rotation: [
                    0.08,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.8,
                            0.95,
                            0.07
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1776,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x121a22,
                        roughness: 0.7,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1777,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1775,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.36,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.05,
                            0.05,
                            0.65,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1780,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x2a3a48,
                        roughness: 0.4,
                        metalness: 0.7
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1781,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1779,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.69,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.38,
                            0.35,
                            0.06,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1784,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: 0x141e28,
                        roughness: 0.6,
                        metalness: 0.4
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 1785,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 1783,
                columnNumber: 7
            }, this),
            Array.from({
                length: 5
            }).map((_, wi)=>{
                const a = wi * (Math.PI * 2 / 5);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        Math.cos(a) * 0.35,
                        -0.75,
                        Math.sin(a) * 0.35
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                            args: [
                                0.055,
                                6,
                                6
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1791,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: 0x0a1218,
                            roughness: 0.7,
                            metalness: 0.2
                        }, void 0, false, {
                            fileName: "[project]/components/datacenter-scene.tsx",
                            lineNumber: 1792,
                            columnNumber: 13
                        }, this)
                    ]
                }, wi, true, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 1790,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 1770,
        columnNumber: 5
    }, this);
}
_c25 = Chair;
// Lebanon Internet Traffic Map - wall mounted display
function LebanonTrafficMap({ onHover, onClick }) {
    _s11();
    // Animated data flow particles
    const inboundParticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const outboundParticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Lebanon approximate shape points (simplified)
    const lebanonOutline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LebanonTrafficMap.useMemo[lebanonOutline]": ()=>{
            // Simplified Lebanon shape - a narrow strip along Mediterranean
            const points = [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0, 1.8),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.3, 1.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.4, 1.0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.5, 0.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.4, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.3, -0.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.2, -1.0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0, -1.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.1, -1.0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.15, -0.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.1, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.15, 0.5),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.1, 1.0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](-0.05, 1.5)
            ];
            const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"](points);
            return shape;
        }
    }["LebanonTrafficMap.useMemo[lebanonOutline]"], []);
    // World connection points (major internet hubs)
    const worldHubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LebanonTrafficMap.useMemo[worldHubs]": ()=>[
                {
                    name: "Frankfurt",
                    x: -1.8,
                    y: 1.2,
                    color: 0x00aaff
                },
                {
                    name: "London",
                    x: -2.2,
                    y: 1.5,
                    color: 0x00ff88
                },
                {
                    name: "Paris",
                    x: -2.0,
                    y: 1.0,
                    color: 0x00ffcc
                },
                {
                    name: "Dubai",
                    x: 1.5,
                    y: -0.3,
                    color: 0xff8800
                },
                {
                    name: "Mumbai",
                    x: 2.2,
                    y: -0.8,
                    color: 0xffcc00
                },
                {
                    name: "Singapore",
                    x: 2.8,
                    y: -1.2,
                    color: 0xff00aa
                },
                {
                    name: "New York",
                    x: -3.0,
                    y: 0.8,
                    color: 0x00ff44
                },
                {
                    name: "São Paulo",
                    x: -2.5,
                    y: -1.5,
                    color: 0xaaff00
                }
            ]
    }["LebanonTrafficMap.useMemo[worldHubs]"], []);
    // Animated traffic flows
    const trafficFlows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LebanonTrafficMap.useEffect": ()=>{
            // Initialize traffic flow particles
            trafficFlows.current = Array.from({
                length: 24
            }).map({
                "LebanonTrafficMap.useEffect": (_, i)=>({
                        pos: Math.random(),
                        speed: 0.3 + Math.random() * 0.4,
                        hub: Math.floor(Math.random() * worldHubs.length),
                        inbound: i % 2 === 0
                    })
            }["LebanonTrafficMap.useEffect"]);
        }
    }["LebanonTrafficMap.useEffect"], [
        worldHubs.length
    ]);
    // Traffic stats
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        inbound: 4.2,
        outbound: 1.8
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LebanonTrafficMap.useEffect": ()=>{
            const iv = setInterval({
                "LebanonTrafficMap.useEffect.iv": ()=>{
                    setStats({
                        inbound: 4.0 + Math.random() * 0.8,
                        outbound: 1.5 + Math.random() * 0.6
                    });
                }
            }["LebanonTrafficMap.useEffect.iv"], 2000);
            return ({
                "LebanonTrafficMap.useEffect": ()=>clearInterval(iv)
            })["LebanonTrafficMap.useEffect"];
        }
    }["LebanonTrafficMap.useEffect"], []);
    // Draw the map on canvas
    const drawMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LebanonTrafficMap.useCallback[drawMap]": (ctx, t)=>{
            const w = 1024, h = 768;
            // Dark background with subtle grid
            ctx.fillStyle = "#0a1018";
            ctx.fillRect(0, 0, w, h);
            // Grid lines
            ctx.strokeStyle = "#1a2a3a";
            ctx.lineWidth = 1;
            for(let x = 0; x < w; x += 40){
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for(let y = 0; y < h; y += 40){
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            // Title
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 32px Arial";
            ctx.fillText("LEBANON INTERNET TRAFFIC", 30, 50);
            ctx.font = "18px Arial";
            ctx.fillStyle = "#6a8a9a";
            ctx.fillText("Real-time Data Flow Visualization", 30, 75);
            // World map outline (simplified - just major landmasses as context)
            ctx.strokeStyle = "#2a3a4a";
            ctx.lineWidth = 2;
            // Europe
            ctx.beginPath();
            ctx.ellipse(200, 200, 120, 80, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Africa
            ctx.beginPath();
            ctx.ellipse(280, 450, 100, 150, 0.2, 0, Math.PI * 2);
            ctx.stroke();
            // Asia
            ctx.beginPath();
            ctx.ellipse(600, 280, 180, 120, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Americas
            ctx.beginPath();
            ctx.ellipse(80, 350, 60, 180, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Lebanon position (center-ish, east Mediterranean)
            const lbX = 420, lbY = 300;
            // Lebanon glow
            const gradient = ctx.createRadialGradient(lbX, lbY, 0, lbX, lbY, 80);
            gradient.addColorStop(0, "rgba(0, 255, 136, 0.4)");
            gradient.addColorStop(1, "rgba(0, 255, 136, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(lbX - 80, lbY - 80, 160, 160);
            // Lebanon shape
            ctx.fillStyle = "#00ff88";
            ctx.beginPath();
            ctx.moveTo(lbX, lbY - 35);
            ctx.lineTo(lbX + 12, lbY - 25);
            ctx.lineTo(lbX + 15, lbY - 10);
            ctx.lineTo(lbX + 12, lbY + 10);
            ctx.lineTo(lbX + 8, lbY + 30);
            ctx.lineTo(lbX, lbY + 35);
            ctx.lineTo(lbX - 5, lbY + 25);
            ctx.lineTo(lbX - 8, lbY + 10);
            ctx.lineTo(lbX - 6, lbY - 10);
            ctx.lineTo(lbX - 4, lbY - 25);
            ctx.closePath();
            ctx.fill();
            // Connection hubs
            const hubs = [
                {
                    x: 180,
                    y: 180,
                    name: "Frankfurt",
                    col: "#00aaff"
                },
                {
                    x: 140,
                    y: 150,
                    name: "London",
                    col: "#00ff88"
                },
                {
                    x: 160,
                    y: 200,
                    name: "Paris",
                    col: "#00ffcc"
                },
                {
                    x: 580,
                    y: 380,
                    name: "Dubai",
                    col: "#ff8800"
                },
                {
                    x: 700,
                    y: 420,
                    name: "Mumbai",
                    col: "#ffcc00"
                },
                {
                    x: 800,
                    y: 480,
                    name: "Singapore",
                    col: "#ff00aa"
                },
                {
                    x: 60,
                    y: 250,
                    name: "New York",
                    col: "#00ff44"
                },
                {
                    x: 100,
                    y: 550,
                    name: "São Paulo",
                    col: "#aaff00"
                }
            ];
            // Draw connection lines with animated particles
            for(let i = 0; i < hubs.length; i++){
                const hub = hubs[i];
                // Connection line
                ctx.strokeStyle = hub.col + "40";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(lbX, lbY);
                ctx.lineTo(hub.x, hub.y);
                ctx.stroke();
                // Animated data packets
                const packetCount = 3;
                for(let p = 0; p < packetCount; p++){
                    const progress = (t * 0.5 + i * 0.1 + p * 0.33) % 1;
                    const isInbound = p % 2 === 0;
                    const actualProgress = isInbound ? progress : 1 - progress;
                    const px = lbX + (hub.x - lbX) * actualProgress;
                    const py = lbY + (hub.y - lbY) * actualProgress;
                    ctx.fillStyle = isInbound ? "#00ff88" : "#ff6600";
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Hub marker
                ctx.fillStyle = hub.col;
                ctx.beginPath();
                ctx.arc(hub.x, hub.y, 8, 0, Math.PI * 2);
                ctx.fill();
                // Hub label
                ctx.fillStyle = "#ffffff";
                ctx.font = "12px Arial";
                ctx.fillText(hub.name, hub.x - 25, hub.y - 15);
            }
            // Lebanon label
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 16px Arial";
            ctx.fillText("LEBANON", lbX - 35, lbY + 60);
            ctx.font = "12px monospace";
            ctx.fillStyle = "#00ff88";
            ctx.fillText("● BEIRUT IX", lbX - 30, lbY + 78);
            // Stats panel
            ctx.fillStyle = "#0a1520";
            ctx.fillRect(750, 50, 250, 180);
            ctx.strokeStyle = "#00ff88";
            ctx.lineWidth = 2;
            ctx.strokeRect(750, 50, 250, 180);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 18px Arial";
            ctx.fillText("TRAFFIC STATS", 770, 80);
            // Inbound
            ctx.fillStyle = "#00ff88";
            ctx.font = "14px Arial";
            ctx.fillText("INBOUND", 770, 110);
            ctx.font = "bold 28px Arial";
            const inboundVal = (4.0 + Math.sin(t * 0.8) * 0.5).toFixed(1);
            ctx.fillText(inboundVal + " Gbps", 770, 140);
            // Outbound
            ctx.fillStyle = "#ff6600";
            ctx.font = "14px Arial";
            ctx.fillText("OUTBOUND", 770, 170);
            ctx.font = "bold 28px Arial";
            const outboundVal = (1.5 + Math.sin(t * 1.2) * 0.3).toFixed(1);
            ctx.fillText(outboundVal + " Gbps", 770, 200);
            // Status indicator
            ctx.fillStyle = "#00ff88";
            ctx.font = "14px Arial";
            ctx.fillText("● CONNECTED", 770, 225);
            // ISP breakdown
            ctx.fillStyle = "#0a1520";
            ctx.fillRect(750, 250, 250, 120);
            ctx.strokeStyle = "#0088ff";
            ctx.strokeRect(750, 250, 250, 120);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px Arial";
            ctx.fillText("TOP ISP PEERS", 770, 275);
            const isps = [
                "Ogero Telecom",
                "Touch LB",
                "Alfa Lebanon",
                "IDM"
            ];
            const ispColors = [
                "#00aaff",
                "#ff6600",
                "#00ff88",
                "#ffcc00"
            ];
            for(let i = 0; i < isps.length; i++){
                ctx.fillStyle = ispColors[i];
                ctx.fillRect(770, 290 + i * 20, 8, 12);
                ctx.fillStyle = "#cccccc";
                ctx.font = "12px Arial";
                ctx.fillText(isps[i], 785, 300 + i * 20);
            }
        }
    }["LebanonTrafficMap.useCallback[drawMap]"], []);
    const tex = useCanvasTex(1024, 768, drawMap);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            10.0,
            5.5,
            -12.7
        ],
        scale: 0.8,
        onPointerOver: ()=>onHover?.("Lebanon Internet Traffic"),
        onPointerOut: ()=>onHover?.(null),
        onClick: ()=>onClick?.("contact"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    -0.1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            7.6,
                            5.6,
                            0.18
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2069,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x181c20,
                        roughness: 0.7
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2070,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2068,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            7.4,
                            5.4,
                            0.1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2075,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x101418,
                        roughness: 0.5,
                        metalness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2076,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2074,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2.65,
                    0.06
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            7.2,
                            0.02,
                            0.01
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2081,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0x00ffe7
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2082,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2080,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -2.65,
                    0.06
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            7.2,
                            0.02,
                            0.01
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2085,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0x00ffe7
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2086,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2084,
                columnNumber: 7
            }, this),
            tex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0.055
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            7.0,
                            5.2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2092,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        map: tex,
                        emissiveMap: tex,
                        emissive: 0xffffff,
                        emissiveIntensity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2093,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2091,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    3.5,
                    -2.7,
                    0.06
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.04,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2099,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0x00ff88
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2098,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    3.3,
                    -2.7,
                    0.06
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.04,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0x0088ff
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -2.95,
                    0.03
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            3.5,
                            0.15,
                            0.02
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x00ff88,
                        emissive: 0x00ff88,
                        emissiveIntensity: 0.4,
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -3.2,
                    -0.3
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.5,
                            0.15,
                            0.6
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: 0x202428,
                        metalness: 0.7,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2060,
        columnNumber: 5
    }, this);
}
_s11(LebanonTrafficMap, "20O5n3xGFA1l+/qcBD35CM0N9BE=", false, function() {
    return [
        useCanvasTex
    ];
});
_c26 = LebanonTrafficMap;
// Dust mote particles - realistic floating dust in datacenter
function Particles() {
    _s12();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const phases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const count = 300;
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[pos]": ()=>{
            const p = new Float32Array(count * 3);
            const v = [];
            const ph = [];
            for(let i = 0; i < count; i++){
                p[i * 3] = (Math.random() - 0.5) * 40;
                p[i * 3 + 1] = Math.random() * 9.5;
                p[i * 3 + 2] = (Math.random() - 0.5) * 22;
                v.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.004 + 0.002, (Math.random() - 0.5) * 0.008));
                ph.push(Math.random() * Math.PI * 2);
            }
            vels.current = v;
            phases.current = ph;
            return p;
        }
    }["Particles.useMemo[pos]"], []);
    const sizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[sizes]": ()=>{
            const s = new Float32Array(count);
            for(let i = 0; i < count; i++){
                s[i] = 0.02 + Math.random() * 0.04;
            }
            return s;
        }
    }["Particles.useMemo[sizes]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Particles.useFrame": ({ clock })=>{
            if (ref.current) {
                const p = ref.current.geometry.attributes.position.array;
                const v = vels.current;
                const ph = phases.current;
                const t = clock.elapsedTime;
                for(let i = 0; i < count; i++){
                    // Gentle sinusoidal drift for realistic floating motion
                    const wobble = Math.sin(t * 0.5 + ph[i]) * 0.003;
                    p[i * 3] += v[i].x + wobble;
                    p[i * 3 + 1] += v[i].y + Math.sin(t * 0.3 + ph[i]) * 0.001;
                    p[i * 3 + 2] += v[i].z + Math.cos(t * 0.4 + ph[i]) * 0.002;
                    if (Math.abs(p[i * 3]) > 20) v[i].x *= -1;
                    if (p[i * 3 + 1] > 9.5 || p[i * 3 + 1] < 0.5) v[i].y *= -1;
                    if (Math.abs(p[i * 3 + 2]) > 11) v[i].z *= -1;
                }
                ref.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    }["Particles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-position",
                        count: count,
                        array: pos,
                        itemSize: 3,
                        args: [
                            pos,
                            3
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-size",
                        count: count,
                        array: sizes,
                        itemSize: 1,
                        args: [
                            sizes,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                color: 0xffffff,
                size: 0.03,
                transparent: true,
                opacity: 0.25,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                sizeAttenuation: true
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2178,
        columnNumber: 5
    }, this);
}
_s12(Particles, "mgq4EGF+6TL0gEVb5UvKDdO3a7A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c27 = Particles;
// Data flow visualization - network packets moving through the air
function NetworkFlowParticles() {
    _s13();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const count = 50;
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NetworkFlowParticles.useMemo[pos]": ()=>{
            const p = new Float32Array(count * 3);
            const v = [];
            for(let i = 0; i < count; i++){
                // Start near rack area
                p[i * 3] = -12 + Math.random() * 8;
                p[i * 3 + 1] = 3 + Math.random() * 5;
                p[i * 3 + 2] = -2 + Math.random() * 4;
                // Move towards monitors/workstation
                v.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.05 + Math.random() * 0.03, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02));
            }
            vels.current = v;
            return p;
        }
    }["NetworkFlowParticles.useMemo[pos]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "NetworkFlowParticles.useFrame": ()=>{
            if (ref.current) {
                const p = ref.current.geometry.attributes.position.array;
                const v = vels.current;
                for(let i = 0; i < count; i++){
                    p[i * 3] += v[i].x;
                    p[i * 3 + 1] += v[i].y;
                    p[i * 3 + 2] += v[i].z;
                    // Reset when reaching destination
                    if (p[i * 3] > 15) {
                        p[i * 3] = -12 + Math.random() * 2;
                        p[i * 3 + 1] = 3 + Math.random() * 5;
                        p[i * 3 + 2] = -2 + Math.random() * 4;
                    }
                }
                ref.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    }["NetworkFlowParticles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                    attach: "attributes-position",
                    count: count,
                    array: pos,
                    itemSize: 3,
                    args: [
                        pos,
                        3
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 2231,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                color: 0x00ffe7,
                size: 0.08,
                transparent: true,
                opacity: 0.7,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2229,
        columnNumber: 5
    }, this);
}
_s13(NetworkFlowParticles, "ndYnQMjuSB0dCMeocSgEc9LmkTA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c28 = NetworkFlowParticles;
// Lighting - Realistic datacenter with bright overhead fluorescents
function Lights() {
    _s14();
    const fwGlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rackGlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Lights.useFrame": ({ clock })=>{
            const t = clock.elapsedTime;
            // Subtle equipment glow pulsing
            if (fwGlow.current) fwGlow.current.intensity = 0.6 + Math.sin(t * 1.3) * 0.15;
            if (rackGlow.current) rackGlow.current.intensity = 0.4 + Math.sin(t * 0.75) * 0.1;
        }
    }["Lights.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                color: 0xf8faff,
                intensity: 1.0
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                color: 0xffffff,
                groundColor: 0xe0e4e8,
                intensity: 0.7
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: 0xffffff,
                intensity: 1.4,
                position: [
                    0,
                    14,
                    2
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: 0xf8f8ff,
                intensity: 0.8,
                position: [
                    8,
                    12,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: 0xf8f8ff,
                intensity: 0.6,
                position: [
                    -8,
                    12,
                    -4
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2258,
                columnNumber: 7
            }, this),
            [
                -12,
                -6,
                0,
                6,
                12
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    color: 0xf5f8ff,
                    intensity: 1.8,
                    distance: 14,
                    decay: 2,
                    position: [
                        x,
                        9.5,
                        0
                    ]
                }, `fl${i}`, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 2261,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: rackGlow,
                color: 0x00ffe7,
                intensity: 0.3,
                distance: 6,
                position: [
                    -8,
                    3.5,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                color: 0x00ccff,
                intensity: 0.2,
                distance: 4,
                position: [
                    7.5,
                    3.5,
                    1.5
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: fwGlow,
                color: 0xff6600,
                intensity: 0.4,
                distance: 4,
                position: [
                    0,
                    2.5,
                    -3.5
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                color: 0x00ff88,
                intensity: 0.15,
                distance: 3,
                position: [
                    7,
                    2.8,
                    3
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s14(Lights, "sySRkrcIUPsjQ95y1sPPLsQ5R0w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c29 = Lights;
// Scene content
const SceneContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function SceneContent({ onHover, onSectionClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    0xe8ecf0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    0xe8ecf0,
                    30,
                    80
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Floor, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Room, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableTray, {
                z: 0
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CableTray, {
                z: -3
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerRack, {
                x: -11,
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerRack, {
                x: -8,
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerRack, {
                x: -5,
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackCableSystem, {
                rackX: -11
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackCableSystem, {
                rackX: -8
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RackCableSystem, {
                rackX: -5
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CrossRackFiber, {
                rack1X: -11,
                rack2X: -8
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CrossRackFiber, {
                rack1X: -8,
                rack2X: -5
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WallMonitors, {
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Workstation, {
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chair, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LebanonTrafficMap, {
                onHover: onHover,
                onClick: onSectionClick
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2296,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Particles, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2297,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NetworkFlowParticles, {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2298,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                enableDamping: true,
                dampingFactor: 0.07,
                maxPolarAngle: Math.PI / 2.05,
                minDistance: 4,
                maxDistance: 30,
                target: [
                    0,
                    3,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                    intensity: 0.15,
                    luminanceThreshold: 0.95,
                    luminanceSmoothing: 0.5
                }, void 0, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 2301,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2300,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
});
_c30 = SceneContent;
// Boot loader
function BootLoader({ onComplete }) {
    _s15();
    const [pct, setPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BootLoader.useEffect": ()=>{
            const iv = setInterval({
                "BootLoader.useEffect.iv": ()=>{
                    setPct({
                        "BootLoader.useEffect.iv": (p)=>{
                            const n = p + Math.random() * 7;
                            if (n >= 100) {
                                clearInterval(iv);
                                setTimeout(onComplete, 500);
                                return 100;
                            }
                            return n;
                        }
                    }["BootLoader.useEffect.iv"]);
                }
            }["BootLoader.useEffect.iv"], 55);
            return ({
                "BootLoader.useEffect": ()=>clearInterval(iv)
            })["BootLoader.useEffect"];
        }
    }["BootLoader.useEffect"], [
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] bg-[#020608] flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[clamp(3rem,10vw,8rem)] font-bold tracking-[0.05em] text-[#00ffe7] leading-[0.9] text-center",
                style: {
                    textShadow: "0 0 18px #00ffe7aa"
                },
                children: [
                    "MOHAMMAD",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#ff4d00]",
                        children: "."
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2328,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2329,
                        columnNumber: 9
                    }, this),
                    "YASSIN"
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-[0.7rem] tracking-[0.4em] text-[#2a4a60] uppercase text-center font-mono",
                children: "Network Engineer · Developer · Educator"
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[220px] h-[2px] bg-[#00ffe710] mt-12 rounded overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-gradient-to-r from-[#0080ff] to-[#00ffe7]",
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 2334,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 text-[0.65rem] text-[#00ffe7] tracking-[0.2em] font-mono",
                children: [
                    "BOOTING DATACENTER... ",
                    Math.floor(pct),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2336,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2326,
        columnNumber: 5
    }, this);
}
_s15(BootLoader, "HfwZ8/Grx6oOQimUEoCUcZYGoGk=");
_c31 = BootLoader;
// Top bar
function TopBar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-3 bg-gradient-to-b from-[rgba(2,6,8,0.95)] to-transparent border-b border-[#00ffe712]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[1.5rem] tracking-[0.08em] text-[#00ffe7] font-bold",
                style: {
                    textShadow: "0 0 18px #00ffe7aa"
                },
                children: [
                    "MOHAMMAD",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#ff4d00]",
                        children: "."
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2346,
                        columnNumber: 17
                    }, this),
                    "YASSIN"
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-10 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono",
                        children: [
                            "Status: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#00ffe7]",
                                children: "ONLINE"
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 2350,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono",
                        children: [
                            "Racks: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#00ffe7]",
                                children: "A · B · C ACTIVE"
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 2353,
                                columnNumber: 18
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono",
                        children: [
                            "Click objects to explore ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "animate-pulse text-[#00ffe7]",
                                children: "▌"
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 2356,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2344,
        columnNumber: 5
    }, this);
}
_c32 = TopBar;
// Side nav
function SideNav({ active, onClick }) {
    const items = [
        {
            id: "about",
            label: "Profile"
        },
        {
            id: "experience",
            label: "Experience"
        },
        {
            id: "skills",
            label: "Skills"
        },
        {
            id: "rack",
            label: "Infra"
        },
        {
            id: "firewall",
            label: "Security"
        },
        {
            id: "projects",
            label: "Projects"
        },
        {
            id: "contact",
            label: "Contact"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3.5",
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${active === item.id ? "opacity-100" : "opacity-30"}`,
                onClick: ()=>onClick(item.id),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-[1px] bg-[#00ffe7] transition-all duration-300 ${active === item.id ? "w-8" : "w-[18px]"}`
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2378,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[0.55rem] tracking-[0.22em] text-[#00ffe7] uppercase font-mono",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2379,
                        columnNumber: 11
                    }, this)
                ]
            }, item.id, true, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2377,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2375,
        columnNumber: 5
    }, this);
}
_c33 = SideNav;
// Panel
function Panel({ section, onClose }) {
    const data = section ? SECTIONS[section] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-8da4d65017f33ba6" + " " + `fixed right-0 top-0 bottom-0 w-[460px] z-30 bg-[rgba(2,8,16,0.97)] border-l border-[#00ffe720] transition-transform duration-500 ease-out flex flex-col overflow-hidden backdrop-blur-sm ${section ? "translate-x-0" : "translate-x-full"}`,
        children: [
            data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-8da4d65017f33ba6" + " " + "p-6 pb-4 border-b border-[#00ffe715] flex justify-between items-start shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8da4d65017f33ba6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-8da4d65017f33ba6" + " " + "text-[0.62rem] tracking-[0.35em] text-[#ff4d00] uppercase mb-2 font-mono",
                                        children: data.ey
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 2395,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-8da4d65017f33ba6" + " " + "text-[2.2rem] tracking-[0.06em] text-white leading-none font-bold",
                                        children: data.ti
                                    }, void 0, false, {
                                        fileName: "[project]/components/datacenter-scene.tsx",
                                        lineNumber: 2396,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 2394,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "jsx-8da4d65017f33ba6" + " " + "bg-transparent border border-[#00ffe730] text-[#00ffe7] text-[0.7rem] tracking-[0.15em] px-3 py-1.5 cursor-pointer transition-all hover:bg-[#00ffe7] hover:text-black font-mono",
                                children: "[ CLOSE ]"
                            }, void 0, false, {
                                fileName: "[project]/components/datacenter-scene.tsx",
                                lineNumber: 2398,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2393,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: data.body
                        },
                        className: "jsx-8da4d65017f33ba6" + " " + "flex-1 overflow-y-auto p-6"
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2402,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "8da4d65017f33ba6",
                children: '.p-s{margin-bottom:1.8rem}.p-l{letter-spacing:.3em;color:#2a4a60;text-transform:uppercase;align-items:center;gap:.6rem;margin-bottom:.8rem;font-family:monospace;font-size:.62rem;display:flex}.p-l:before{content:"";background:#00ffe7;width:20px;height:1px;display:block}.p-tx{color:#b8dff5;opacity:.85;font-size:.96rem;font-weight:300;line-height:1.85}.p-sgrid{grid-template-columns:1fr 1fr;gap:.8rem;margin-top:.8rem;display:grid}.p-sc{clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);background:#00ffe706;border:1px solid #00ffe718;padding:1rem}.p-sn{color:#00ffe7;font-size:2rem;font-weight:700}.p-sl{letter-spacing:.15em;color:#2a4a60;text-transform:uppercase;font-family:monospace;font-size:.58rem}.p-cr{flex-wrap:wrap;gap:.5rem;margin-top:.8rem;display:flex}.p-ch{letter-spacing:.15em;color:#00ffe7;text-transform:uppercase;border:1px solid #00ffe730;padding:.25rem .7rem;font-family:monospace;font-size:.6rem}.p-ch.o{color:#ff4d00;border-color:#ff4d0040}.skr{margin-bottom:.8rem}.skr-t{color:#b8dff5;justify-content:space-between;margin-bottom:.4rem;font-family:monospace;font-size:.62rem;display:flex}.skr-bg{background:#00ffe710;border-radius:1px;height:2px}.skr-f{background:linear-gradient(90deg,#0080ff,#00ffe7);height:100%;box-shadow:0 0 6px #00ffe7}.p-pr{background:#00ffe705;border:1px solid #00ffe715;margin-bottom:.8rem;padding:1rem;position:relative}.p-pr:before{content:"";background:linear-gradient(90deg,#0000,#00ffe7,#0000);height:1px;position:absolute;top:0;left:0;right:0}.p-pt{letter-spacing:.06em;color:#fff;font-size:1.2rem;font-weight:700}.p-pd{color:#b8dff5;opacity:.7;margin-top:.3rem;font-size:.85rem;line-height:1.6}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2390,
        columnNumber: 5
    }, this);
}
_c34 = Panel;
// Tooltip
function Tooltip({ label }) {
    _s16();
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tooltip.useEffect": ()=>{
            const h = {
                "Tooltip.useEffect.h": (e)=>setPos({
                        x: e.clientX + 18,
                        y: e.clientY - 12
                    })
            }["Tooltip.useEffect.h"];
            window.addEventListener("mousemove", h);
            return ({
                "Tooltip.useEffect": ()=>window.removeEventListener("mousemove", h)
            })["Tooltip.useEffect"];
        }
    }["Tooltip.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed z-25 pointer-events-none text-[0.62rem] tracking-[0.15em] text-white bg-[rgba(0,255,231,0.1)] border border-[#00ffe7] px-4 py-1.5 uppercase whitespace-nowrap transition-opacity duration-200 font-mono ${label ? "opacity-100" : "opacity-0"}`,
        style: {
            left: pos.x,
            top: pos.y,
            clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)"
        },
        children: [
            ">",
            " ",
            label
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2439,
        columnNumber: 5
    }, this);
}
_s16(Tooltip, "CEZBNFl7D5unz7QADBFJF8EM04A=");
_c35 = Tooltip;
// Camera hint
function CameraHint() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-6 z-20 text-[0.57rem] tracking-[0.15em] text-[#2a4a60] text-right leading-[2.2] pointer-events-none font-mono",
        children: [
            "DRAG · ORBIT",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2453,
                columnNumber: 7
            }, this),
            "SCROLL · ZOOM",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2455,
                columnNumber: 7
            }, this),
            "CLICK · EXPLORE"
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2451,
        columnNumber: 5
    }, this);
}
_c36 = CameraHint;
// Custom cursor
// Custom cursor
function Cursor({ hovering }) {
    _s17();
    const dotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let ringX = mouseX;
            let ringY = mouseY;
            let rafId;
            const handleMouseMove = {
                "Cursor.useEffect.handleMouseMove": (e)=>{
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                }
            }["Cursor.useEffect.handleMouseMove"];
            const animate = {
                "Cursor.useEffect.animate": ()=>{
                    ringX += (mouseX - ringX) * 0.15;
                    ringY += (mouseY - ringY) * 0.15;
                    if (dotRef.current) {
                        dotRef.current.style.left = `${mouseX}px`;
                        dotRef.current.style.top = `${mouseY}px`;
                    }
                    if (ringRef.current) {
                        ringRef.current.style.left = `${ringX}px`;
                        ringRef.current.style.top = `${ringY}px`;
                    }
                    rafId = requestAnimationFrame(animate);
                }
            }["Cursor.useEffect.animate"];
            window.addEventListener("mousemove", handleMouseMove);
            rafId = requestAnimationFrame(animate);
            return ({
                "Cursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                    cancelAnimationFrame(rafId);
                }
            })["Cursor.useEffect"];
        }
    }["Cursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dotRef,
                className: "fixed pointer-events-none z-[9999] rounded-full transition-all duration-100",
                style: {
                    transform: "translate(-50%, -50%)",
                    width: hovering ? 20 : 10,
                    height: hovering ? 20 : 10,
                    background: hovering ? "#fff" : "#00ffe7",
                    boxShadow: hovering ? "0 0 16px #fff" : "0 0 10px #00ffe7"
                }
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2506,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ringRef,
                className: "fixed pointer-events-none z-[9998] rounded-full border transition-all duration-200",
                style: {
                    transform: "translate(-50%, -50%)",
                    width: hovering ? 46 : 30,
                    height: hovering ? 46 : 30,
                    borderColor: hovering ? "#fff" : "#00ffe7",
                    opacity: hovering ? 0.8 : 0.4
                }
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2511,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s17(Cursor, "2fNvfCAqhzAXAJQ0ree4LU3uDAY=");
_c37 = Cursor;
function DatacenterScene() {
    _s18();
    const [booting, setBooting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showUI, setShowUI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleBootComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DatacenterScene.useCallback[handleBootComplete]": ()=>{
            setBooting(false);
            setTimeout({
                "DatacenterScene.useCallback[handleBootComplete]": ()=>setShowUI(true)
            }["DatacenterScene.useCallback[handleBootComplete]"], 100);
        }
    }["DatacenterScene.useCallback[handleBootComplete]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-screen bg-[#020608] overflow-hidden cursor-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cursor, {
                hovering: !!hovered
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2534,
                columnNumber: 7
            }, this),
            booting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BootLoader, {
                onComplete: handleBootComplete
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2535,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    fov: 52,
                    near: 0.1,
                    far: 200,
                    position: [
                        6,
                        5,
                        10
                    ]
                },
                shadows: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFShadowMap"]
                },
                gl: {
                    antialias: true,
                    toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
                    toneMappingExposure: 1.1
                },
                style: {
                    opacity: booting ? 0 : 1,
                    transition: "opacity 0.8s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneContent, {
                        onHover: setHovered,
                        onSectionClick: setActiveSection
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2538,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/datacenter-scene.tsx",
                    lineNumber: 2537,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/datacenter-scene.tsx",
                lineNumber: 2536,
                columnNumber: 7
            }, this),
            showUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopBar, {}, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2543,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SideNav, {
                        active: activeSection,
                        onClick: setActiveSection
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2544,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Panel, {
                        section: activeSection,
                        onClose: ()=>setActiveSection(null)
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2545,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                        label: hovered
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraHint, {}, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2547,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 pointer-events-none z-[9990]",
                        style: {
                            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,231,0.01) 2px, rgba(0,255,231,0.01) 4px)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/datacenter-scene.tsx",
                        lineNumber: 2548,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/datacenter-scene.tsx",
        lineNumber: 2533,
        columnNumber: 5
    }, this);
}
_s18(DatacenterScene, "iM4P4pmygjAmS4y30Lxx18hL8SA=");
_c38 = DatacenterScene;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38;
__turbopack_context__.k.register(_c, "LED");
__turbopack_context__.k.register(_c1, "Floor");
__turbopack_context__.k.register(_c2, "WarningLabel");
__turbopack_context__.k.register(_c3, "FireSuppressionNozzle");
__turbopack_context__.k.register(_c4, "ExitSign");
__turbopack_context__.k.register(_c5, "Room");
__turbopack_context__.k.register(_c6, "DataPulse");
__turbopack_context__.k.register(_c7, "FiberCable");
__turbopack_context__.k.register(_c8, "CableTray");
__turbopack_context__.k.register(_c9, "CopperCable");
__turbopack_context__.k.register(_c10, "PowerCable");
__turbopack_context__.k.register(_c11, "CableTie");
__turbopack_context__.k.register(_c12, "CableBundle");
__turbopack_context__.k.register(_c13, "RackCableSystem");
__turbopack_context__.k.register(_c14, "CrossRackFiber");
__turbopack_context__.k.register(_c15, "SFPModule");
__turbopack_context__.k.register(_c16, "SpinningFan");
__turbopack_context__.k.register(_c17, "RackScrew");
__turbopack_context__.k.register(_c18, "BrandStrip");
__turbopack_context__.k.register(_c19, "RackDevice");
__turbopack_context__.k.register(_c20, "ServerRack");
__turbopack_context__.k.register(_c21, "WallMonitor");
__turbopack_context__.k.register(_c22, "WallMonitors");
__turbopack_context__.k.register(_c23, "CoffeeMug");
__turbopack_context__.k.register(_c24, "Workstation");
__turbopack_context__.k.register(_c25, "Chair");
__turbopack_context__.k.register(_c26, "LebanonTrafficMap");
__turbopack_context__.k.register(_c27, "Particles");
__turbopack_context__.k.register(_c28, "NetworkFlowParticles");
__turbopack_context__.k.register(_c29, "Lights");
__turbopack_context__.k.register(_c30, "SceneContent");
__turbopack_context__.k.register(_c31, "BootLoader");
__turbopack_context__.k.register(_c32, "TopBar");
__turbopack_context__.k.register(_c33, "SideNav");
__turbopack_context__.k.register(_c34, "Panel");
__turbopack_context__.k.register(_c35, "Tooltip");
__turbopack_context__.k.register(_c36, "CameraHint");
__turbopack_context__.k.register(_c37, "Cursor");
__turbopack_context__.k.register(_c38, "DatacenterScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/datacenter-scene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/datacenter-scene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_datacenter-scene_tsx_0ro~5we._.js.map