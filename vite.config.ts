import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { jsonLdTags, sitemapXml, llmsTxt } from "./src/lib/seo";

/** Zet JSON-LD statisch in index.html en maakt sitemap.xml + llms.txt, allemaal vanuit src/lib/site.ts. */
function seoFiles(): Plugin {
  return {
    name: "flipforward-seo",
    transformIndexHtml: {
      order: "pre",
      // Enkel de publieke site; admin.html krijgt geen JSON-LD.
      handler: (html, ctx) =>
        ctx.path.endsWith("admin.html") ? html : html.replace("</head>", `    ${jsonLdTags("/")}\n  </head>`),
    },
    generateBundle(options) {
      if (options.format !== "es") return;
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(today) });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt() });
    },
  };
}

/** Dev-server: /admin en /admin/... tonen de beheeromgeving (op Vercel doet vercel.json dat). */
function adminRewrite(): Plugin {
  return {
    name: "flipforward-admin-rewrite",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/admin(\/|$|\?)/.test(req.url) && !req.url.startsWith("/admin.html")) req.url = "/admin.html";
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), adminRewrite(), ...(isSsrBuild ? [] : [seoFiles()])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Twee ingangen: de publieke site en de beheeromgeving (/admin), elk met een eigen bundel.
      input: isSsrBuild
        ? undefined
        : { main: path.resolve(__dirname, "index.html"), admin: path.resolve(__dirname, "admin.html") },
      output: isSsrBuild
        ? undefined
        : {
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom"],
            },
          },
    },
  },
}));
