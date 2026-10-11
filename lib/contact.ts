// Phone contact. The number is stored in pieces and only assembled in the browser, so it never
// appears as plain text in the server-rendered HTML (most spam scrapers read raw HTML only).
const PARTS = ["549", "762", "3", "961"] // reversed groups of +961 3 762 549

/** "9613762549" */
export const phoneDigits = () => [...PARTS].reverse().join("")
/** "+961 3 762 549" */
export const phonePretty = () => `+${PARTS[3]} ${PARTS[2]} ${PARTS[1]} ${PARTS[0]}`
export const phoneTel = () => `tel:+${phoneDigits()}`

const WHATSAPP_GREETING = "Hi Mohammad, I came across your portfolio and would like to talk about a role."
export const whatsappUrl = () => `https://wa.me/${phoneDigits()}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
