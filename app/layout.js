import { Geist } from "next/font/google";
import CartProvider from "./_contexts/CartContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "JTicketing",
  description:
    "Jticketing is a platform for securing the hottest tickets with ease and confidence.",
  openGraph: {
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
          <CartProvider>{children}</CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
