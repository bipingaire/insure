import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supertruck.ai Insurance",
  description: "Gamified trucking insurance quote flow."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
