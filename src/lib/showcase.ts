/** Projectscreenshots voor de hero-varianten (zelfde bestanden als het portfolio). */
import hytale from "@/assets/portfolio/hytale-desktop.webp";
import atlaz from "@/assets/portfolio/atlaz-desktop.webp";
import feest from "@/assets/portfolio/feestoptafel-desktop.webp";
import finn from "@/assets/portfolio/finn-desktop.webp";
import spuddy from "@/assets/portfolio/spuddy-desktop.webp";
import bnb from "@/assets/portfolio/bnb-desktop.webp";
import hyperdrive from "@/assets/portfolio/hyperdrive-desktop.webp";
import wingbyte from "@/assets/portfolio/wingbyte-desktop.webp";
import essentials from "@/assets/portfolio/essentials-desktop.webp";

export interface ShowcaseItem {
  title: string;
  link?: string;
  thumbnail: string;
}

export const showcase: ShowcaseItem[] = [
  { title: "Hytale Vlaanderen", link: "https://hytalevlaanderen.be", thumbnail: hytale },
  { title: "ATLAZ", link: "https://atlazmusic.be", thumbnail: atlaz },
  { title: "Feest Op Tafel", link: "https://feestoptafel.com", thumbnail: feest },
  { title: "Persoonlijke website", link: "https://finnvangronsveld.be", thumbnail: finn },
  { title: "Spuddy", link: "https://spuddy.be", thumbnail: spuddy },
  { title: "Hyperdrive Festival", link: "https://hyperdrivefestival.netlify.app", thumbnail: hyperdrive },
  { title: "WingByte", link: "https://wingbyte.netlify.app", thumbnail: wingbyte },
  { title: "B&B Booking System", thumbnail: bnb },
  { title: "Webdesign Essentials", link: "https://finnvangronsveld.sinners.be", thumbnail: essentials },
];

/** Lijst herhalen tot `n` items (voor rijen/kolommen die vol moeten). */
export const repeatTo = <T,>(list: T[], n: number) => Array.from({ length: n }, (_, i) => list[i % list.length]);
