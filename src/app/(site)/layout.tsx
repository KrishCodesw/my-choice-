import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shared/CartDrawer";

import { CartProvider } from "@/components/shared/CartProvider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SmoothScroll />
      <div className="grain relative">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
