import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauki PHC Clinic",
  description: "Sauki Patient Record System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
