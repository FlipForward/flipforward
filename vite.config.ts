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
      handler: (html) => html.replace("</head>", `    ${jsonLdTags("/")}\n  </head>`),
    },
    generateBundle(options) {
      if (options.format !== "es") return;
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(today) });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt() });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), ...(isSsrBuild ? [] : [seoFiles()])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
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
