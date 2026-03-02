import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-kufi",
});

export const metadata: Metadata = {
  title: "مجمع غوشة الطبي الجراحي",
  description:
    "مجمع غوشة الطبي الجراحي - كل ما تحتاج إليه من رعاية صحية متكاملة في مكان واحد. عيادات خارجية، عمليات جراحية، أشعة، مختبر، طوارئ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufi.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
