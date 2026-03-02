"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#about" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
      style={{
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="مجمع غوشة الطبي الجراحي"
              width={52}
              height={52}
              className="h-[52px] w-[52px] rounded-2xl object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-foreground leading-tight">
                {"مجمع غوشة"}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium">
                {"الطبي الجراحي"}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl hover:bg-muted/50 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+96200000000"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-secondary/[0.07] flex items-center justify-center">
                <Phone className="h-4 w-4 text-secondary" />
              </div>
              <span className="font-medium">{"اتصل بنا"}</span>
            </a>
            <Button
              asChild
              className="rounded-2xl px-7 h-11 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, oklch(0.68 0.17 130), oklch(0.62 0.12 220))",
                boxShadow: "0 2px 12px oklch(0.68 0.17 130 / 0.2)",
              }}
            >
              <a href="#contact">{"احجز موعد"}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-foreground rounded-xl hover:bg-muted/50 transition-colors"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-xl border-t border-border/50 px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-foreground hover:text-primary px-4 py-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="rounded-2xl mt-3 w-full h-12 font-semibold text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, oklch(0.68 0.17 130), oklch(0.62 0.12 220))",
            }}
          >
            <a href="#contact" onClick={() => setIsOpen(false)}>{"احجز موعد"}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
