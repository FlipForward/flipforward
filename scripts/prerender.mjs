/**
 * Prerendering na `vite build`:
 *  - dist/index.html        homepage met volledige HTML
 *  - dist/<route>.html      privacyverklaring, algemene voorwaarden
 *  - dist/404.html          nette 404 (Vercel serveert die automatisch)
 * Zo zien zoekmachines, AI-crawlers en link-previews de inhoud zonder JavaScript.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routeMeta, jsonLdTags, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const routes = [
  { url: "/", file: "index.html" },
  { url: "/privacyverklaring", file: "privacyverklaring.html" },
  { url: "/algemene-voorwaarden", file: "algemene-voorwaarden.html" },
  { url: "/404", file: "404.html", noindex: true },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const r of routes) {
  let html = template;
  const meta = routeMeta[r.url];
  if (meta) {
    const canonical = `${SITE_URL}${r.url}`;
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(meta.description)}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`)
      .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(meta.title)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(meta.description)}`)
      .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(meta.description)}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonical}`)
      // FAQ- en WebSite-schema horen enkel bij de homepage
      .replace(/(<script type="application\/ld\+json">[\s\S]*?<\/script>\s*)+/, `${jsonLdTags(r.url)}\n  `);
    html = r.noindex
      ? html.replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />')
      : html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`);
  }

  const appHtml = render(r.url === "/404" ? "/__niet-gevonden__" : r.url);
  if (!appHtml || appHtml.length < 200) throw new Error(`Prerender van ${r.url} gaf (bijna) lege HTML`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(path.join(dist, r.file), html);
  console.log(`prerender ✓ ${r.url.padEnd(24)} → dist/${r.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
