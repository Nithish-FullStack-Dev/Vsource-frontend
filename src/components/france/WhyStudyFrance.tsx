import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* Small hook: toggles inView when element enters/leaves viewport */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { root: null, threshold: 0.25, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function WhyStudyFrance() {
  // Animate the whole left content block
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();

  const leftStyle: React.CSSProperties = {
    transform: leftInView ? "translate3d(0,0,0)" : "translate3d(-40px,0,0)",
    opacity: leftInView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "650ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Intro (slides from LEFT) */}
        <div ref={leftRef} style={leftStyle}>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            Study in France — Learn, Innovate, Thrive
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700">
            France is the world’s 4th-largest study destination and a leading non-English speaking hub.
            Choose from 1,500+ English-taught programs and 500+ scholarships, benefit from a system that
            blends theory with hands-on practice, and tap into a vibrant innovation ecosystem—backed by
            64 Nobel Laureates and 15 Fields Medals. Degrees are mutually recognized with India and
            open doors to 570+ French companies operating in India.
          </p>

          {/* Accent divider */}
          <div
            className="mt-6 h-1 w-20 rounded-full"
            style={{ backgroundColor: "#e40000" }}
          />

          {/* Bulleted highlights */}
          <ul className="mt-6 space-y-3">
            {[
              "1,500+ English-taught programmes",
              "500+ scholarships for Indian students",
              "Mutual degree recognition with India",
              "Research excellence: 64 Nobel & 15 Fields Medals",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#e40000" }}
                />
                <span className="text-sm md:text-base text-neutral-800">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-white font-semibold shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: "#e40000" }}
            >
              Get a Free Profile Evaluation
            </Link>
          </div>
        </div>

        {/* Right: Feature cards (each slides from LEFT with stagger) */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Professionally Oriented",
              body:
                "Programmes combine theory and real-world practice using industry-standard tools.",
              icon: "🛠️",
            },
            {
              title: "Research & Excellence",
              body:
                "A global leader in innovation with 64 Nobel Laureates and 15 Fields Medals.",
              icon: "🔬",
            },
            {
              title: "Entrepreneurial Ecosystem",
              body:
                "A startup-friendly environment that supports young innovators and founders.",
              icon: "🚀",
            },
          ].map((c, i) => (
            <AnimatedFeatureCard
              key={c.title}
              title={c.title}
              body={c.body}
              icon={c.icon}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedFeatureCard({
  title,
  body,
  icon,
  index = 0,
}: {
  title: string;
  body: string;
  icon: string;
  index?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayMs = 120 * index; // stagger

  const style: React.CSSProperties = {
    transform: inView ? "translate3d(0,0,0)" : "translate3d(-32px,0,0)",
    opacity: inView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "650ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: inView ? `${delayMs}ms` : "0ms",
  };

  return (
    <div
      ref={ref}
      style={style}
      className="rounded-xl border bg-white p-5 md:p-6 shadow-sm hover:shadow transition will-change-transform"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <h3 className="text-base md:text-lg font-semibold text-black">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-neutral-700">
        {body}
      </p>

      <div
        className="mt-4 h-0.5 w-12 rounded-full"
        style={{ backgroundColor: "#e40000" }}
      />
    </div>
  );
}
