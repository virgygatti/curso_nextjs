import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: "E-commerce - Tu tienda online",
    template: "%s | E-commerce",
  },
  description:
    "E-commerce autoadministrable con Next.js. Catálogo, carrito y checkout.",
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "E-commerce",
    title: "E-commerce - Tu tienda online",
    description:
      "E-commerce autoadministrable con Next.js. Catálogo, carrito y checkout.",
    images: [
      { url: "/images/product1.jpg", width: 1200, height: 630, alt: "E-commerce" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce - Tu tienda online",
    description: "E-commerce autoadministrable con Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
