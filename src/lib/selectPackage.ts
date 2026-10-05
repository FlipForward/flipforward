import type { PackageId } from "./site";

export const PACKAGE_EVENT = "pakket-select";

/** Zet ?pakket=… in de URL, laat het contactformulier het pakket overnemen en scrolt ernaartoe. */
export function selectPackage(id: PackageId | "") {
  const url = id ? `?pakket=${id}#contact` : "#contact";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: id }));
  const section = document.getElementById("contact");
  section?.scrollIntoView({ behavior: "smooth" });
  // Focus naar het eerste veld voor toetsenbord- en schermlezergebruikers.
  window.setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 400);
}
