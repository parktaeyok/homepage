import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QMS 맞춤 개발 | (주)인지아이앤에스",
  description: "ISO 9001·IATF 16949 관련 품질 업무를 위한 QMS 맞춤 개발. 문서, 심사, 부적합·시정조치 관리부터 구축 후 운영까지 (주)인지아이앤에스와 상담하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
