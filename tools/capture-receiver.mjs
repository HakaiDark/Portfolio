// Saves canvas stills posted from the page in ?capture mode (see CLAUDE.md, "Verifying visuals").
// Usage: node tools/capture-receiver.mjs [outDir=.shots]
//   in the page: fetch("http://127.0.0.1:3999/save?name=x.webp", { method: "POST", body: window.__rack.snapshot() })
import http from "node:http"
import fs from "node:fs"
import path from "node:path"

const dir = path.resolve(process.argv[2] ?? ".shots")
fs.mkdirSync(dir, { recursive: true })

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    if (req.method === "OPTIONS") return res.end()
    const url = new URL(req.url, "http://x")
    const name = path.basename(url.searchParams.get("name") || "shot.webp")
    let body = ""
    req.on("data", (c) => (body += c))
    req.on("end", () => {
      const file = path.join(dir, name)
      fs.writeFileSync(file, Buffer.from(body.slice(body.indexOf(",") + 1), "base64"))
      res.end(file)
    })
  })
  .listen(3999, "127.0.0.1", () => console.log("capture receiver on :3999 ->", dir))
