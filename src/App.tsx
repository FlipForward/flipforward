import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

/** De router zelf (Browser- of StaticRouter) wordt in main.tsx / entry-server.tsx eromheen gezet. */
const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/privacyverklaring" element={<PrivacyPolicy />} />
      <Route path="/algemene-voorwaarden" element={<Terms />} />
      <Route path="/privacy" element={<Navigate to="/privacyverklaring" replace />} />
      <Route path="/terms" element={<Navigate to="/algemene-voorwaarden" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ThemeProvider>
);

export default App;
