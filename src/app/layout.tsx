import ThemeProviderClient from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://koom.kishor.tech"),
  title: {
    default: "KoomAI • Next-Gen Loom Alternative Powered by Real-Time AI & WebRTC",
    template: "%s | KoomAI",
  },
  description:
    "Record 60 FPS screen & camera with sub-120ms WebRTC streaming, instant link sharing, and automated Whisper AI speech-to-text transcripts. Built for high-velocity teams.",
  applicationName: "KoomAI",
  authors: [{ name: "Kishor Kumar Paroi", url: "https://kishor.tech" }],
  generator: "Next.js",
  keywords: [
    "KoomAI",
    "Loom alternative",
    "WebRTC screen recorder",
    "AI video messaging",
    "Whisper speech to text",
    "async video communication",
    "instant video sharing",
    "60 FPS screen capture",
    "real-time AI transcription",
    "Kishor Kumar Paroi",
    "enterprise video SaaS",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Kishor Kumar Paroi",
  publisher: "KoomAI Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://koom.kishor.tech",
    siteName: "KoomAI",
    title: "KoomAI — Next-Gen Loom Alternative Powered by Real-Time AI",
    description:
      "Record your screen and camera, share instantaneously with sub-120ms WebRTC streaming, and generate automated AI speech-to-text transcripts with Whisper.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KoomAI — Next-Gen Loom Alternative Powered by Real-Time AI",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KoomAI — Next-Gen Loom Alternative Powered by Real-Time AI",
    description:
      "Record your screen & camera with sub-120ms WebRTC streaming, instant link sharing, and automated Whisper AI transcripts.",
    site: "@Mr_paroi",
    creator: "@Mr_paroi",
    images: ["/og-image.png"],
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${manrope.className} bg-[#171717]`}
        >
          <ThemeProviderClient>
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProviderClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
