# Mohammad Yassin — portfolio (3D data-centre rack)

Live: https://mohammadyassin.vercel.app — Vercel project `portfolio` (team `engcompyassin-7906s-projects`), deploys from GitHub **HakaiDark/Portfolio** `main` (PUBLIC repo).
Status (2026-10-11): **LIVE.** The redesign is on `main` (merged with `-s ours` over the old site, old history kept as a parent).
Work: local branch `feature/redesign-rack` tracks the remote. `git push origin feature/redesign-rack:main` = **production deploy**; push to `:redesign` first for a private preview (behind Vercel login): https://portfolio-git-redesign-engcompyassin-7906s-projects.vercel.app

## Stack & commands
Next 16 (Turbopack, App Router), React 19, @react-three/fiber 9, drei 10, three 0.186, @react-three/postprocessing, Tailwind 4. **npm only** (no pnpm lockfile — Vercel picks the package manager from the lockfile).
- Windows/PowerShell 5.1. If `node`/`git` aren't found: `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- `npm run dev` · `npx tsc --noEmit -p .` · `npx next build` · CV: `node resume/build.mjs` (headless Edge/Chrome)
- Dev server for the browser pane: `.claude/launch.json` → `next-dev` (port 3000)

## Map
- `app/page.tsx` — homepage: `RackSection` hero (+ `HeroOverlay`) then text sections (`components/site/*`).
- Content: `content/profile.ts` (site text), `content/rack-cards.ts` (3D hotspot cards), `lib/dc/terminal.ts` (laptop CLI), `resume/resume.html` (CV). Source of truth: `linkedin-profile.md` (git-ignored, private).
- 3D (`components/dc/*`, `lib/dc/*`):
  - `lib/dc/devices.ts` — hardware config + hero rack layout (header explains how to add a device); textures in `public/3d/devices/*.webp` (+ `-1k` low-res).
  - `rack-scene.tsx` — camera stops, `CameraRig` (azimuth ±75°, 48° on the side a desktop framing offset shifts toward, so it never clips into racks), `SceneReady` (chunked GPU warm-up while `frameloop="never"`), `CaptureHook`.
  - `rack-section.tsx` — lazy mount on scroll, boot/loading sequence (`boot-sequence.tsx`), pauses rendering when off screen, static fallback `public/3d/rack-fallback.webp`.
  - `lib/dc/quality.ts` tiers: high / low (phones, weak GPUs: no AO, no rain) / static (no WebGL).
  - `lib/dc/cables.ts` (cached; routing, sag, HA + console cables; each path has an `owner` = device key / "ha" / "console"), `textures.ts` (procedural canvas textures, tiled grain), `laptop.ts`, `contact.ts`.
  - Wow features (no perf cost): **HA failover demo** (`lib/dc/ha.ts` timeline + per-phase LED states / paused cable owners / role badges; button in the FortiGate card via `failover-panel.tsx`; terminal `execute ha failover set 1`; the passive FGT-02 never shows traffic in normal operation). **Server slide-out** (`slide` in `devices.ts`: the ProLiant pulls out on rails with the lid off, internals only mounted while out). **Ambient sound** (`lib/dc/ambience.ts`, Web Audio, no files, off by default, fans louder up close). **Focus pull** (`FocusPull` in `rack-scene.tsx`: one DoF effect animated, never rebuilt).
- Side racks (`components/dc/room.tsx`): LEFT_RACK = display-only photo gear (Aruba CX 6300M ×2, Dell PowerEdge 2U, BlueCat 1U, PowerVault ME5024 ×2, APC SRT 2U ×2; configs at the end of `devices.ts`). The right rack carries the **monitor wall** (`monitor-wall.tsx` + `lib/dc/noc-screens.ts`: FortiAnalyzer-style + AirWave-style canvases redrawn at 2 Hz, react to the HA demo; stop `monitoring`, card `monitoring`). Only tools in his profile get branded screens (no PRTG).
- Realism details (all cheap, mostly merged/instanced): SFP+ DACs, dust plugs, optic pull-tabs and label-maker flags (`cables.ts` → `rack-cabling.tsx`); rear A/B PDUs + dual-PSU cords (`lib/dc/power.ts`, `rear-power.tsx`); shelf clutter + sticky note (`desk-props.tsx`); 1U **console drawer** at U16 (`kvm-drawer.tsx`, RackSlot kind `kvm`, stop `kvm` "Automation" + card `automation`: slides out, screen flips up, PowerShell validation run types out).
- MacBook look: `public/3d/devices/macbook-deck.webp` (keyboard + trackpad flattened from a photo) via `useMacDeck()` + `ALUMINIUM` in `laptop.tsx`; used by the shelf laptop and the console drawer.
- Cisco 8800 desk phone (`desk-phone.tsx`, photo cut out with a border flood-fill so black keys stay solid; 3D handset + coiled cord; own speed-dial screen) on a shelf at U19 of the right rack; stop `contact` + card `contact` + `contact-panel.tsx` (WhatsApp message button + email, no call buttons).
- Hero card hides on every screen while "focused" (any stop open, zoomed in at the overview, or terminal open: `onFocus` signal); the top-left "Mohammad Yassin ▾" tab then returns to the overview (`resetNonce`). Phones still also hide it on first exploration.
- Wi-Fi stop: minPolar 96° so the camera stays below the AP and never rises through the ceiling. Monitor stop uses `fitH` (fits height above the phone sheet too). 3D buttons/badges use `HOTSPOT_Z` [19,10] so they stay under the view bar (z-20) and cards (z-30). Hidden overlays are `inert`.
- Capture: `__rack.lookAt` frees the camera (lifts the close-up arc narrowing) until the next `setStop`; `__rack.pose()` returns camera/target/azimuth.
- `tools/capture-receiver.mjs`, `tools/crop-faceplates.mjs`, `tools/warp-faceplate.mjs` (perspective-flattens an angled product photo: 4 corners -> WebP).

## Content rules (non-negotiable)
- Never list Fortinet NSE or Cisco CCNA as certifications. No invented metrics, titles or dates. `Flappy_Bird_DeepLearning` is a fork — never present it as his work.
- Never publish anything from the "References — PRIVATE" section of `linkedin-profile.md`. Site/CV say "References available on request".
- Phone is **WhatsApp only** (+961 3 762 549): no `tel:` links/call buttons. Site assembles the number client-side (`lib/contact.ts`) so it isn't in the HTML; CV prints "WhatsApp: …" (`resume/private.json`, git-ignored, `onPublicCv: true`).
- The mug says "In Kelly We Trust" — "Kelly" is his mentor's nickname; never write the mentor's real name anywhere.
- The repo is public: before every push run `git log --all -p | Select-String '<private patterns>'` for reference names/emails.

## Verifying visuals (the browser pane is hidden here)
Hidden tabs don't run requestAnimationFrame/ResizeObserver, so normal screenshots of the canvas are black.
1. Always set a viewport first (`resize_window` 1280x800 or preset `mobile`) — the hidden default is 0×0 and the scene never starts.
2. Load `/?capture&quality=high` (or `low`; `static`; add `&boot` to show the loading screen; clear `sessionStorage['dc-boot-seen']` to see the full sequence).
3. In the page: `window.__rack.setStop(id)`, `.setTraffic(bool)`, `.orbit(deg)`, `.lookAt(px,py,pz,tx,ty,tz)`, `.render(frames)`, `.snapshot()`.
4. Save stills: run `node tools/capture-receiver.mjs` in the background (port 3999 → `.shots/`), then `fetch('http://127.0.0.1:3999/save?name=x.webp',{method:'POST',body:__rack.snapshot()})` and Read the file.
DOM overlays (cards, terminal, hero) do show in normal screenshots. Perf: `performance.getEntriesByType('measure')` entries named `dc:*`. Measure perf on a production build (`npx next build` + `npx next start -p 3001`), not dev.
Stop IDs: `overview`, `<deviceId>@<u>` (e.g. `fortigate-601f@34`), `wireless`, `terminal`.

## Deploy flow
- Preview: `git push origin feature/redesign-rack:redesign`; production: `...:main` (GitHub creds cached in Windows Credential Manager; if a sign-in is needed the user must run the push in their own terminal — this shell can't show the prompt).
- Vercel status: `GET https://api.github.com/repos/HakaiDark/Portfolio/commits/redesign/status` (context `Vercel`).
- Before pushing dependency changes, do a clean-room check: `git archive` the staged tree into a scratch dir → `npm ci` → `npx next build`.

## Gotchas learned
- npm `overrides` for a package that is also a direct dependency must use `"$pkg"`, else `npm ci` fails (EOVERRIDE) — only fresh installs (Vercel) catch it.
- PowerShell: `Set-Content -Encoding utf8` writes a BOM; `git`/`npm` stderr shows as red errors even on success (check exit codes); here-strings with quotes break native args → use `git commit -F file`.
- camera-controls sets `touch-action:none`; the `.rack-canvas` CSS rule (`app/globals.css`) forces `pan-y` so phones can scroll past the hero. Wheel, trackpad and pinch zoom toward the cursor / pinch point (`dollyToCursor`; the wheel handler calls camera-controls' `_dollyInternal`). Closest zoom: `MIN_DISTANCE` 0.32 m (overview 0.55, it orbits a point behind the rack face); the turning arc narrows to half when close so the camera cannot swing into the rack. The wheel zooms the rack only while the page is at the top (scrollY ≤ 40); fully zoomed out (the overview framing is the max), scrolling down hands over to the page (custom `wheel` handler in `CameraRig`; camera-controls wheel stays NONE).
- Phones (`pointer: coarse`): one finger never orbits — it always scrolls the page; two fingers only zoom, no turning; two-finger touches and Safari `gesture*` events on the canvas are preventDefault-ed so iOS Safari never pinch-zooms the page instead (user asked: thumb scrolling fought with orbiting, then dropped two-finger turning too). Hotspots zig-zag left/right down the rack on all screens, placed on plain panel, never over vendor logos/labels (`hotspot` in `devices.ts`). The hero name card slides away on phones once the visitor explores (`onExplore` signal → `rack-section.tsx`); a corner tab restores it.
- Git for Windows may rewrite files to CRLF (e.g. after `git stash`); normalize `\r\n` before string-replacing in scripts.
- Photo mode (three-gpu-pathtracer) was built and then removed (grainy/dark, GPU busy while scrolling) — in git history (`ec5325b`) if ever needed.

## Possible next steps
- User is testing the live site on his phone; act on his feedback (preview on `redesign` first, then `main`).
- Optional: make `terminal.ts` and `rack-cards.ts` read from `content/profile.ts` (single source).
