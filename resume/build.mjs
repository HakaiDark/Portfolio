// Prints resume/resume.html to PDF with headless Edge or Chrome.
//   public copy  -> public/Mohammad-Yassin-Resume.pdf          (served on the site; phone only if onPublicCv)
//   private copy -> resume/private/Mohammad-Yassin-Resume.pdf  (for applications; only if resume/private.json exists)
// resume/private.json (git-ignored): { "phone": "+000 0 000 000", "onPublicCv": true }
// Usage: node resume/build.mjs
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dir, "..")
const template = readFileSync(path.join(dir, "resume.html"), "utf8")

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

function print(html, out) {
  const tmp = path.join(dir, `.build-${process.pid}.html`)
  writeFileSync(tmp, html)
  try {
    mkdirSync(path.dirname(out), { recursive: true })
    execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, pathToFileURL(tmp).href], {
      stdio: ["ignore", "ignore", "ignore"],
    })
  } finally {
    rmSync(tmp, { force: true })
  }
  console.log("wrote", path.relative(root, out))
}

const privateFile = path.join(dir, "private.json")
// strip a UTF-8 BOM (Windows editors / PowerShell add one)
const priv = existsSync(privateFile) ? JSON.parse(readFileSync(privateFile, "utf8").replace(/^﻿/, "")) : {}
const withPhone = (phone) => template.replaceAll("{{CONTACT_PHONE}}", phone ? ` | ${phone}` : "")

// public copy carries the phone only when private.json sets "onPublicCv": true
print(withPhone(priv.onPublicCv ? priv.phone : ""), path.join(root, "public", "Mohammad-Yassin-Resume.pdf"))
if (priv.phone) print(withPhone(priv.phone), path.join(dir, "private", "Mohammad-Yassin-Resume.pdf"))
