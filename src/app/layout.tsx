import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mychoice-mumbai.com"), // Replace with your actual domain
  title: {
    default: "MyChoice — Premium Electric, Hardware & Sanitary Ware Mumbai",
    template: "%s | MyChoice Mumbai",
  },
  description:
    "Mumbai's #1 exclusive showroom for premium electrical fittings, luxury hardware, and designer sanitary ware. Expert guidance, authorized dealer for Havells, Jaquar, Kohler, and Hettich. Verified workers and architect-grade sourcing.",
  keywords: [
    "My Choice",
    "MyChoice",
    "MyChoice Mumbai",
    "MyChoice Electric",
    "MyChoice Hardware",
    "My Choice Sanitary Ware",
    "best electrical store Mumbai",
    "luxury hardware Mumbai",
    "designer bathroom fittings Mumbai",
    "Havells showroom Mumbai",
    "Jaquar authorized dealer Mumbai",
    "Kohler sanitary ware Mumbai",
    "Hettich hardware dealer Mumbai",
    "Legrand switches Mumbai",
    "premium light fittings Mumbai",
    "architectural hardware Mumbai",
    "electrical wholesale Mumbai",
    "sanitary ware wholesale Mumbai",
    "luxury home fittings Mumbai",
    "best hardware shop in Andheri",
    "top electrical dealers Mumbai",
    "MyChoice showroom photos",
    "MyChoice Mumbai contact number",
  ],
  authors: [{ name: "MyChoice Team" }],
  creator: "MyChoice",
  publisher: "MyChoice",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "MyChoice — Mumbai's Exclusive Electric & Hardware Showroom",
    description:
      "Source premium electrical, hardware, and sanitary ware. Visit our luxury showroom in Mumbai for expert guidance and global brands.",
    url: "https://mychoice-mumbai.com",
    siteName: "MyChoice Mumbai",
    images: [
      {
        url: "/showroom2.jpg",
        width: 1200,
        height: 630,
        alt: "MyChoice Luxury Showroom Mumbai",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyChoice — Premium Electric & Hardware Mumbai",
    description: "Mumbai's premier destination for luxury home fittings and expert sourcing.",
    images: ["/showroom2.jpg"],
    creator: "@mychoice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
