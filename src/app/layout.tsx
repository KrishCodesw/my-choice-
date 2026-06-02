import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyChoice — Electric, Hardware & Sanitary Ware Mumbai",
    template: "%s | MyChoice",
  },
  description:
    "Mumbai's exclusive showroom for premium electrical fittings, hardware and sanitary ware. Expert guidance, trusted brands, verified workers.",
  keywords: [
    "electrical store Mumbai",
    "hardware store Mumbai",
    "sanitary ware Mumbai",
    "Havells dealer Mumbai",
    "Jaquar showroom Mumbai",
  ],
  openGraph: {
    title: "MyChoice — Electric, Hardware & Sanitary Ware",
    description:
      "Mumbai's exclusive showroom. Premium brands, expert guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
