import "./globals.css";
import type { Metadata } from "next";
import { Agentation } from "agentation";

export const metadata: Metadata = {
  title: "OPENSTAT",
  description: "대한민국 정부 데이터 기반 통계 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {children}
        <Agentation />
      </body>
    </html>
  );
}
