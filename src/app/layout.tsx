import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Merriweather } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CTRcraft - AI-Powered YouTube Thumbnail Generator | Boost Your CTR by 300%",
  description: "Create viral YouTube thumbnails with AI that get clicks. Boost your channel's CTR by up to 300%. Join 10,000+ creators using CTRcraft's AI-powered thumbnail generator. Start free!",
  keywords: ["YouTube thumbnail generator", "AI thumbnail creator", "increase CTR", "YouTube optimization", "thumbnail design", "viral thumbnails", "YouTube growth"],
  authors: [{ name: "CTRcraft Team" }],
  creator: "CTRcraft",
  publisher: "CTRcraft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ctrcraft.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ctrcraft.com",
    title: "CTRcraft - AI-Powered YouTube Thumbnail Generator",
    description: "Create viral YouTube thumbnails with AI that get clicks. Boost your channel's CTR by up to 300%. Join 10,000+ creators using CTRcraft.",
    siteName: "CTRcraft",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CTRcraft - AI-Powered YouTube Thumbnail Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRcraft - AI-Powered YouTube Thumbnail Generator",
    description: "Create viral YouTube thumbnails with AI that get clicks. Boost your channel's CTR by up to 300%.",
    images: ["/twitter-image.jpg"],
    creator: "@ctrcraft",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${merriweather.variable} antialiased`}
      >
        <NavbarDemo/>
        {children}
      </body>
    </html>
  );
}
