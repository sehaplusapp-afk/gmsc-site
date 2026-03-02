"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const highlights = [
  "رعاية طبية متكاملة تحت سقف واحد",
  "كادر طبي من أمهر الأطباء والجراحين",
  "أحدث الأجهزة والمعدات الطبية",
  "أكثر من 75 عامًا من الخبرة والتميز",
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function AboutSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-secondary/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div className="rounded-3xl overflow-hidden border border-border/40"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
            >
              <Image
                src="/images/GMSCBuilding.png"
                alt="مبنى مجمع غوشة الطبي الجراحي"
                width={600}
                height={450}
                className="w-full h-[420px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Decorative accents */}
            <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-3xl bg-primary/[0.06] -z-10" />
            <div className="absolute -top-5 -right-5 w-36 h-36 rounded-3xl bg-secondary/[0.06] -z-10" />

            {/* Year badge */}
            <div
              className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-xl rounded-2xl p-5 border border-border/50"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
                {"1949"}
              </p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{"سنة التأسيس"}</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-6 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transitionDelay: "200ms",
            }}
          >
            <span
              className="inline-block text-[11px] font-bold text-secondary tracking-wider bg-secondary/[0.07] rounded-full px-5 py-2 self-start"
            >
              {"من نحن"}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight text-balance">
              {"مجمع غوشة الطبي الجراحي"}
            </h2>

            <p className="text-muted-foreground leading-[1.85] text-[15px]">
              {"منذ تأسيسه عام 1949، يُعد مجمع غوشة الطبي الجراحي من أعرق المؤسسات الصحية التي تقدم رعاية طبية متكاملة بأعلى المعايير. نسعى دائمًا لتوفير بيئة صحية آمنة ومريحة لمرضانا مع الحرص على مواكبة أحدث التطورات في عالم الطب."}
            </p>
            <p className="text-muted-foreground leading-[1.85] text-[15px]">
              {"يضم المجمع نخبة من الأطباء والجراحين المتخصصين في مختلف المجالات الطبية، إلى جانب أحدث الأجهزة والمعدات التشخيصية والعلاجية لضمان تقديم أفضل خدمة ممكنة."}
            </p>

            <div className="flex flex-col gap-3.5 mt-2">
              {highlights.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${400 + i * 100}ms`,
                  }}
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/[0.08] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
