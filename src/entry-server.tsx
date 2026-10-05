import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { routeMeta, jsonLdTags } from "./lib/seo";
export { SITE_URL } from "./lib/site";

/** Gebruikt door scripts/prerender.mjs om statische HTML per publieke route te maken. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
