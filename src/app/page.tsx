import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CTRcraft - AI-Powered YouTube Thumbnail Generator | Boost Your CTR by 300%",
  description: "Create viral YouTube thumbnails with AI that get clicks. Boost your channel's CTR by up to 300%. Join 10,000+ creators using CTRcraft's AI-powered thumbnail generator. Start free today!",
  keywords: ["YouTube thumbnail generator", "AI thumbnail creator", "increase CTR", "YouTube optimization", "thumbnail design", "viral thumbnails", "YouTube growth", "content creator tools"],
  openGraph: {
    title: "CTRcraft - AI-Powered YouTube Thumbnail Generator",
    description: "Create viral YouTube thumbnails with AI that get clicks. Boost your channel's CTR by up to 300%.",
    type: "website",
    url: "https://ctrcraft.com",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CTRcraft",
  "description": "AI-powered YouTube thumbnail generator that helps creators boost their click-through rates by up to 300%",
  "url": "https://ctrcraft.com",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "10000"
  },
  "features": [
    "AI-powered thumbnail generation",
    "300% average CTR increase",
    "50,000+ thumbnails created",
    "10,000+ happy creators"
  ]
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main>
        <HeroSection/>
        <TestimonialsSection autoplay={true}/>
      </main>
    </>
  );
}
