// Prints resume/resume.html to public/Mohammad-Yassin-Resume.pdf with headless Edge or Chrome.
// Usage: node resume/build.mjs
import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const src = path.join(root, "resume", "resume.html")
const out = path.join(root, "public", "Mohammad-Yassin-Resume.pdf")

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean)
const browser = candidates.find((p) => existsSync(p))
if (!browser) throw new Error("No Chrome/Edge found; set CHROME_PATH")

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--generate-pdf-document-outline",
  `--print-to-pdf=${out}`,
  pathToFileURL(src).href,
], { stdio: "inherit" })
console.log("wrote", out)
