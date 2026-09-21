import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padel & Football Egypt • منصة حجز ملاعب البادل وكرة القدم بالصعيد (أسيوط وسوهاج)",
  description: "منصة حجز ملاعب البادل وكرة القدم الخماسي والسباعي الأولى في أسيوط وسوهاج والمنيا وقنا والصعيد. جداول لحظية وتأكيد فوري بالدقيقة.",
  keywords: ["حجز ملاعب أسيوط", "حجز ملاعب سوهاج", "ملاعب باديل الصعيد", "ملاعب كرة قدم خماسي أسيوط", "Padel Assiut", "Football Sohag"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full scroll-smooth antialiased dark">
      <body className="min-h-full flex flex-col bg-[#02122f] text-slate-100 selection:bg-[#cff40e] selection:text-[#02122f]">
        {children}
      </body>
    </html>
  );
}
