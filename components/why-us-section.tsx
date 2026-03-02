"use client";

import { Monitor, Users, ShieldCheck, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Monitor,
    title: "أحدث أجهزة الأشعة",
    description: "نمتلك أحدث أجهزة التصوير الطبي من رنين مغناطيسي وتصوير طبقي وألتراساوند لتشخيص دقيق وسريع.",
    color: "green" as const,
  },
  {
    icon: Users,
    title: "كادر طبي متخصص",
    description: "فريق من أمهر الأطباء والجراحين المتخصصين في مختلف المجالات الطبية بخبرات واسعة.",
    color: "blue" as const,
  },
  {
    icon: ShieldCheck,
    title: "رعاية طبية متكاملة",
    description: "جميع الخدمات الطبية التي تحتاجها في مكان واحد من تشخيص وعلاج وجراحة ومتابعة.",
    color: "green" as const,
  },
  {
    icon: Clock,
    title: "خدمة طوارئ 24/7",
    description: "قسم طوارئ متاح على مدار الساعة مع فريق متخصص للتعامل مع الحالات الطارئة بسرعة وكفاءة.",
    color: "blue" as const,
  },
];

function useScrollReveal(threshold = 0.1) {
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

export function WhyUsSection() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section id="why-us" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-[5%] w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
        <div className="absolute bottom-20 left-[5%] w-[350px] h-[350px] rounded-full bg-secondary/[0.02] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="inline-block text-[11px] font-bold text-secondary tracking-wider bg-secondary/[0.07] rounded-full px-5 py-2 mb-5">
            {"مميزاتنا"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground text-balance">
            {"لماذا تختار مجمع غوشة؟"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-[1.8] text-[15px]">
            {"نلتزم بتقديم أعلى مستويات الرعاية الصحية مع الحرص على راحة المريض وسلامته"}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const isGreen = feature.color === "green";
            return (
              <div
                key={feature.title}
                className="group relative flex gap-5 rounded-[20px] p-7 border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${200 + i * 120}ms`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.02)",
                }}
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 ${
                    isGreen
                      ? "bg-[radial-gradient(ellipse_at_top_right,_oklch(0.68_0.17_130_/_0.05),_transparent_60%)]"
                      : "bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.12_220_/_0.05),_transparent_60%)]"
                  }`}
                />

                {/* Top accent */}
                <div
                  className={`absolute top-0 inset-x-0 h-[2px] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ${
                    isGreen
                      ? "bg-gradient-to-l from-primary to-primary/30"
                      : "bg-gradient-to-l from-secondary to-secondary/30"
                  }`}
                />

                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
                    isGreen ? "bg-primary/[0.07]" : "bg-secondary/[0.07]"
                  }`}
                >
                  <feature.icon
                    className={`h-7 w-7 ${isGreen ? "text-primary" : "text-secondary"}`}
                  />
                </div>

                <div className="relative">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-[1.8] text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
