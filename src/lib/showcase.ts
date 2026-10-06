/** Projectscreenshots voor de hero-varianten (zelfde bestanden als het portfolio). */
import hytale from "@/assets/portfolio/hytale-desktop.webp";
import driverdash from "@/assets/portfolio/driverdash-desktop.webp";
import clawd from "@/assets/portfolio/clawd-desktop.webp";
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
  { title: "finnvangronsveld.be", link: "https://finnvangronsveld.be", thumbnail: finn },
  { title: "DriverDash", link: "https://driverdash.be", thumbnail: driverdash },
  { title: "Clawd", link: "https://clawd-desktop-pet.vercel.app", thumbnail: clawd },
  { title: "ATLAZ", link: "https://atlazmusic.be", thumbnail: atlaz },
  { title: "Hytale Vlaanderen", link: "https://hytalevlaanderen.be", thumbnail: hytale },
  { title: "Feest Op Tafel", link: "https://feestoptafel.com", thumbnail: feest },
  { title: "Spuddy", link: "https://spuddy.be", thumbnail: spuddy },
  { title: "Hyperdrive Festival", link: "https://hyperdrivefestival.netlify.app", thumbnail: hyperdrive },
  { title: "WingByte", link: "https://wingbyte.netlify.app", thumbnail: wingbyte },
  { title: "B&B Booking System", thumbnail: bnb },
  { title: "Webdesign Essentials", link: "https://finnvangronsveld.sinners.be", thumbnail: essentials },
];

/** Anker van een case in het portfolio, bv. "project-driverdash". */
export const projectAnchor = (title: string) => "project-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Projecten die als case in het portfolio staan (de hero scrollt daarnaartoe in plaats van de site te openen). */
export const FEATURED = ["finnvangronsveld.be", "DriverDash", "Clawd", "ATLAZ"];
