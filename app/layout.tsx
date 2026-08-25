import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookMarketing — Editorial Campaign Desk",
  description: "A product design study for sequencing a book campaign around one clear editorial promise.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
