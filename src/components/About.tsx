import { business, steps } from "@/lib/site";
import finnPhoto from "@/assets/finn.webp";
import Reveal from "./motion/Reveal";

/** Wie er bouwt en hoe het loopt, samen in één donker vlak. */
const About = () => (
  <section id="over" aria-labelledby="over-title" className="on-ink scroll-mt-20 py-16 sm:py-28">
    <div className="wrap">
      <Reveal className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
        <img
          src={finnPhoto}
          alt={`${business.owner}, oprichter van FlipForward`}
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className="h-28 w-28 rounded-full object-cover sm:h-40 sm:w-40"
        />
        <div>
          <h2 id="over-title" className="h-section max-w-[18ch]">
            Je spreekt altijd met wie je website bouwt
          </h2>
          <p className="soft mt-6 max-w-[38rem] text-lg leading-relaxed sm:text-xl">
            Ik ben {business.owner}, van {business.city}. FlipForward is mijn eenmanszaak: ik ontwerp en bouw je site, zet ze online en pas
            ze daarna aan als je een nieuwe tekst, een extra pagina of een vraag hebt.
          </p>
        </div>
      </Reveal>

      <div id="werkwijze" className="scroll-mt-24 pt-14 sm:pt-24">
        <h3 className="soft text-lg">Zo loopt het</h3>
        <ol className="line mt-5 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="line border-b py-6 sm:pr-8 lg:border-b-0 lg:py-8">
              <span className="num soft text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-3 text-2xl tracking-[-0.02em]">{s.title}</h4>
              <p className="soft mt-2 text-[15px] leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default About;
