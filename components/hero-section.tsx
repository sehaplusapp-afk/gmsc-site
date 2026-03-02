"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MessageCircle,
  Scan,
  FlaskConical,
  Siren,
  Stethoscope,
  Award,
  Users,
  Clock,
  ArrowLeft,
  Heart,
  Shield,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2200;
          const start = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 4);
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor(ease(p) * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-triggered visibility                                        */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  ECG Heartbeat Line (animated SVG)                                  */
/* ------------------------------------------------------------------ */
function ECGLine() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-[0.06]" aria-hidden="true">
      <div className="animate-ecg-scroll flex w-[200%]">
        <svg className="w-1/2 h-16" viewBox="0 0 1400 60" fill="none" preserveAspectRatio="none">
          <path
            d="M0 30 L200 30 L260 30 L280 30 L300 12 L320 48 L340 6 L360 54 L380 30 L440 30 L700 30 L760 30 L780 30 L800 12 L820 48 L840 6 L860 54 L880 30 L940 30 L1400 30"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
        <svg className="w-1/2 h-16" viewBox="0 0 1400 60" fill="none" preserveAspectRatio="none">
          <path
            d="M0 30 L200 30 L260 30 L280 30 L300 12 L320 48 L340 6 L360 54 L380 30 L440 30 L700 30 L760 30 L780 30 L800 12 L820 48 L840 6 L860 54 L880 30 L940 30 L1400 30"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Background with floating medical shapes                            */
/* ------------------------------------------------------------------ */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft gradient orbs - floating */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-primary/[0.05] blur-[100px] animate-float-slow" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] rounded-full bg-secondary/[0.06] blur-[100px] animate-float-slower" />
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[80px] animate-float-slow" style={{ animationDelay: "3s" }} />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 0.7px, transparent 0.7px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative rings - slowly pulsing */}
      <div className="absolute top-28 right-[8%] w-80 h-80 rounded-full border border-primary/[0.06] animate-pulse-ring" />
      <div className="absolute top-36 right-[10%] w-56 h-56 rounded-full border border-dashed border-secondary/[0.05] animate-spin-very-slow" />
      <div className="absolute -bottom-16 left-[3%] w-72 h-72 rounded-full border border-secondary/[0.05] animate-pulse-ring" style={{ animationDelay: "3s" }} />

      {/* Medical cross - ultra faint */}
      <svg className="absolute top-44 left-[5%] w-20 h-20 text-primary/[0.04]" viewBox="0 0 100 100" fill="currentColor">
        <rect x="38" y="12" width="24" height="76" rx="6" />
        <rect x="12" y="38" width="76" height="24" rx="6" />
      </svg>

      {/* DNA helix outline - ultra faint */}
      <svg className="absolute bottom-32 right-[7%] w-12 h-40 text-secondary/[0.04]" viewBox="0 0 40 140" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 10 Q20 35 35 35 Q20 35 5 60 Q20 85 35 85 Q20 85 5 110 Q20 135 35 135" />
        <path d="M35 10 Q20 35 5 35 Q20 35 35 60 Q20 85 5 85 Q20 85 35 110 Q20 135 5 135" />
        <line x1="5" y1="35" x2="35" y2="35" opacity="0.4" />
        <line x1="5" y1="60" x2="35" y2="60" opacity="0.4" />
        <line x1="5" y1="85" x2="35" y2="85" opacity="0.4" />
        <line x1="5" y1="110" x2="35" y2="110" opacity="0.4" />
      </svg>

      {/* Small medical dots */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-primary/[0.06] animate-float-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 rounded-full bg-secondary/[0.06] animate-float-slower" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[45%] w-1 h-1 rounded-full bg-primary/[0.05] animate-float-slow" style={{ animationDelay: "4s" }} />

      {/* Corner accent lines */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px]">
        <div className="absolute top-20 right-20 w-px h-16 bg-primary/[0.06]" />
        <div className="absolute top-20 right-20 h-px w-16 bg-primary/[0.06]" />
      </div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px]">
        <div className="absolute bottom-16 left-16 w-px h-12 bg-secondary/[0.05]" />
        <div className="absolute bottom-16 left-16 h-px w-12 bg-secondary/[0.05]" />
      </div>

      {/* ECG heartbeat */}
      <ECGLine />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Card (glass style)                                         */
/* ------------------------------------------------------------------ */
const featureCards = [
  {
    icon: Scan,
    title: "قسم الأشعة",
    desc: "تصوير بالرنين المغناطيسي والطبقي المحوري والألتراساوند",
    accent: "green" as const,
    badge: "تقنيات متقدمة",
  },
  {
    icon: FlaskConical,
    title: "المختبر الطبي",
    desc: "تحاليل شاملة بنتائج دقيقة وسريعة على مدار الساعة",
    accent: "blue" as const,
    badge: "معتمد دوليًا",
  },
  {
    icon: Siren,
    title: "قسم الطوارئ",
    desc: "استجابة فورية بكادر طبي مؤهل ومتخصص",
    accent: "green" as const,
    badge: "24/7",
  },
  {
    icon: Stethoscope,
    title: "العيادات التخصصية",
    desc: "أطباء استشاريون في جميع التخصصات الطبية",
    accent: "blue" as const,
    badge: "+50 طبيب",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  desc,
  accent,
  badge,
  index,
  visible,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent: "green" | "blue";
  badge: string;
  index: number;
  visible: boolean;
}) {
  const isGreen = accent === "green";

  return (
    <div
      className="group relative rounded-[20px] border border-card/80 bg-card/70 backdrop-blur-xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)",
      }}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 ${
          isGreen
            ? "bg-[radial-gradient(ellipse_at_top_right,_oklch(0.68_0.17_130_/_0.07),_transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.12_220_/_0.07),_transparent_70%)]"
        }`}
      />

      {/* Top accent line */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ${
          isGreen
            ? "bg-gradient-to-l from-primary to-primary/40"
            : "bg-gradient-to-l from-secondary to-secondary/40"
        }`}
      />

      <div className="relative p-5 flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
            isGreen
              ? "bg-primary/[0.08] group-hover:bg-primary/[0.12]"
              : "bg-secondary/[0.08] group-hover:bg-secondary/[0.12]"
          }`}
        >
          <Icon className={`h-5 w-5 ${isGreen ? "text-primary" : "text-secondary"}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="font-bold text-card-foreground text-[15px]">{title}</p>
            <span
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                isGreen
                  ? "bg-primary/[0.08] text-primary"
                  : "bg-secondary/[0.08] text-secondary"
              }`}
            >
              {badge}
            </span>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
        </div>

        {/* Arrow */}
        <ArrowLeft
          className={`h-4 w-4 shrink-0 mt-1.5 transition-all duration-300 opacity-0 translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 ${
            isGreen ? "text-primary" : "text-secondary"
          }`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Item                                                          */
/* ------------------------------------------------------------------ */
function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  color,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: "green" | "blue";
}) {
  const isGreen = color === "green";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
          isGreen ? "bg-primary/[0.07]" : "bg-secondary/[0.07]"
        }`}
      >
        <Icon className={`h-[18px] w-[18px] ${isGreen ? "text-primary" : "text-secondary"}`} />
      </div>
      <div>
        <p className={`text-2xl font-extrabold tabular-nums leading-none ${isGreen ? "text-primary" : "text-secondary"}`}>
          <AnimatedCounter target={value} suffix={suffix} />
        </p>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO SECTION                                                       */
/* ================================================================== */
export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { ref: cardsRef, inView: cardsVisible } = useInView(0.08);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-24 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">

          {/* ======== Right: Text Content (7 cols) ======== */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-right">

            {/* Badge pill */}
            <div
              className="inline-flex items-center gap-2.5 self-center lg:self-start rounded-full px-5 py-2.5 mb-8 bg-card/70 backdrop-blur-sm border border-border/50 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-14px)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-wide">
                {"منذ عام 1949 - رعاية صحية متميزة"}
              </span>
            </div>

            {/* Headline */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.18] text-foreground text-balance">
                {"رعاية صحية"}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary/80">
                  {" متكاملة "}
                </span>
                {"بأحدث"}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary to-secondary/80">
                  {" التقنيات "}
                </span>
                {"الطبية"}
              </h1>
            </div>

            {/* Subtext */}
            <p
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-[1.85] max-w-xl mx-auto lg:mx-0 lg:max-w-lg transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(18px)",
                transitionDelay: "250ms",
              }}
            >
              {"مجمع غوشة الطبي الجراحي يقدم خدمات طبية شاملة تشمل العيادات التخصصية، غرف العمليات، قسم الأشعة المتطور، المختبر الطبي المعتمد، وخدمة الطوارئ على مدار الساعة."}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-9 transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(18px)",
                transitionDelay: "380ms",
              }}
            >
              <Button
                asChild
                size="lg"
                className="rounded-2xl text-base px-9 h-14 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.68 0.17 130), oklch(0.62 0.12 220))",
                  boxShadow: "0 4px 20px oklch(0.68 0.17 130 / 0.25)",
                }}
              >
                <a href="#contact">
                  <CalendarDays className="ml-2.5 h-5 w-5" />
                  {"احجز موعد"}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/60 bg-card/50 backdrop-blur-sm text-foreground hover:bg-card/80 rounded-2xl text-base px-9 h-14 font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                <a href="#contact">
                  <MessageCircle className="ml-2.5 h-5 w-5" />
                  {"تواصل معنا"}
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 sm:gap-8 pt-9 mt-9 border-t border-border/30 transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "520ms",
              }}
            >
              <StatItem icon={Award} value={75} suffix="+" label="عامًا من الخبرة" color="green" />
              <StatItem icon={Users} value={50} suffix="+" label="طبيب متخصص" color="blue" />
              <StatItem icon={Clock} value={24} suffix="/7" label="خدمة الطوارئ" color="green" />
            </div>

            {/* Trust bar */}
            <div
              className="mt-8 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transitionDelay: "660ms",
              }}
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2.5">
                {[
                  { icon: Shield, text: "معتمد من وزارة الصحة" },
                  { icon: Award, text: "أكثر من 75 عامًا من التميز" },
                  { icon: Heart, text: "رعاية إنسانية شاملة" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-muted-foreground/60">
                    <item.icon className="h-3.5 w-3.5 text-primary/50" />
                    <span className="text-[11px] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======== Left: Feature Card Stack (5 cols) ======== */}
          <div className="lg:col-span-5" ref={cardsRef}>
            {/* Section divider */}
            <div
              className="flex items-center gap-3 mb-6 transition-all duration-600"
              style={{ opacity: cardsVisible ? 1 : 0, transitionDelay: "80ms" }}
            >
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[11px] font-bold text-muted-foreground/60 tracking-wider">
                {"خدماتنا الرئيسية"}
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3.5">
              {featureCards.map((f, i) => (
                <FeatureCard
                  key={f.title}
                  icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                  accent={f.accent}
                  badge={f.badge}
                  index={i}
                  visible={cardsVisible}
                />
              ))}
            </div>

            {/* Bottom link */}
            <div
              className="flex justify-center mt-6 transition-all duration-600"
              style={{ opacity: cardsVisible ? 1 : 0, transitionDelay: "600ms" }}
            >
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              >
                <span>{"اكتشف المزيد"}</span>
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
