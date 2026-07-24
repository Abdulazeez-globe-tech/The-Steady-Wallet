import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesteadywallet.vercel.app"),
  title: {
    default: "The Steady Wallet | Practical money guidance for women",
    template: "%s | The Steady Wallet",
  },
  description:
    "Budgeting, debt payoff, side hustles, and free printables. Practical, judgment-free money guidance for women who want a plan that actually works.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    siteName: "The Steady Wallet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <meta name="p:domain_verify" content="6e7d3708b98b57345dca67545dde0398"/>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
