"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    label: "العنوان",
    value: "مجمع المناره التجاري- ط6و7و8 امتداد جامع عبد الناصر",
    color: "green" as const,
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: "0599600625",
    color: "blue" as const,
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "GMSC@gousheh.com",
    color: "green" as const,
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "9:00 ص - 10:00 م",
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
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function ContactSection() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-[10%] w-[450px] h-[450px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute top-0 left-[10%] w-[350px] h-[350px] rounded-full bg-secondary/[0.02] blur-[100px]" />
      </div>

      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="inline-block text-[11px] font-bold text-primary tracking-wider bg-primary/[0.07] rounded-full px-5 py-2 mb-5">
            {"تواصل معنا"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground text-balance">
            {"نحن هنا لخدمتكم"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-[1.8] text-[15px]">
            {
              "لا تتردد في التواصل معنا لحجز موعد أو للاستفسار عن أي من خدماتنا الطبية"
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Cards */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((item, i) => {
              const isGreen = item.color === "green";
              return (
                <div
                  key={item.label}
                  className="group flex items-center gap-5 rounded-[20px] p-6 border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:-translate-y-0.5"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: `${200 + i * 100}ms`,
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
                      isGreen ? "bg-primary/[0.07]" : "bg-secondary/[0.07]"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isGreen ? "text-primary" : "text-secondary"}`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[15px] font-semibold text-card-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}

            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "650ms",
              }}
            >
              <Button
                asChild
                size="lg"
                className="w-full rounded-2xl h-14 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.17 130), oklch(0.62 0.12 220))",
                  boxShadow: "0 4px 20px oklch(0.68 0.17 130 / 0.2)",
                }}
              >
                <a href="tel:+97022223333">
                  <Phone className="ml-2.5 h-5 w-5" />
                  {"اتصل الآن"}
                </a>
              </Button>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-[20px] overflow-hidden border border-border/50 h-[420px] lg:h-full min-h-[400px] transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "300ms",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d846.7623765350103!2d35.20733852526187!3d31.905252245287993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d2b0ef1a515ab%3A0x5cb61490935b48ac!2z2YXYrNmF2Lkg2KfZhNmF2YbYp9ix2Kkg2KfZhNiq2KzYp9ix2Yo!5e0!3m2!1sar!2s!4v1772453359412!5m2!1sar!2s"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع مجمع غوشة الطبي الجراحي"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
