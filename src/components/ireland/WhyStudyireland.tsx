import { WhyStudyin } from "@/types/StudyInPage";
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
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { root: null, threshold: 0.25, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

type Prop = {
  whyStudyin: WhyStudyin;
};

export default function WhyStudyireland({ whyStudyin }: Prop) {
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
            {whyStudyin?.title ||
              "Study in Ireland — Build a Global-Ready Career"}
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700">
            {whyStudyin?.description ||
              "Ireland blends world-class universities, research-driven learning, and welcoming multicultural campuses. Earn an internationally recognized degree, gain hands-on industry exposure, and access clear post-study work pathways in a safe, innovative economy."}
          </p>

          <div
            className="mt-6 h-1 w-20 rounded-full"
            style={{ backgroundColor: "#e40000" }}
          />

          <ul className="mt-6 space-y-3">
            {whyStudyin?.highlights_points?.map((point) => (
              <li key={point.id} className="flex items-start gap-3">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#e40000" }}
                />
                <span className="text-sm md:text-base text-neutral-800">
                  {point.description}
                </span>
              </li>
            ))}
          </ul>

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

        {/* Right: Feature cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {whyStudyin?.whyStudyin_cards?.map((c, i) => (
            <AnimatedFeatureCard
              key={c.id}
              title={c.title}
              body={c.description}
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
  index = 0,
}: {
  title: string;
  body: string;
  index?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayMs = 120 * index;

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
