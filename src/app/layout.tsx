import type { Metadata, Viewport } from 'next';
import './globals.css';
import { WalletProvider } from '@/context/WalletContext';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'NVStore Exclusive | Luxury Designer Bags on Solana',
  description: 'Discover authenticated luxury designer bags from the world\'s most prestigious houses. Shop Hermès, Chanel, Louis Vuitton, and more with seamless crypto payments on Solana.',
  keywords: 'luxury bags, designer bags, Hermès, Chanel, Louis Vuitton, Gucci, Solana, crypto, NFT, blockchain',
  authors: [{ name: 'NVStore Exclusive' }],
  openGraph: {
    title: 'NVStore Exclusive | Luxury Designer Bags on Solana',
    description: 'Discover authenticated luxury designer bags with seamless crypto payments.',
    type: 'website',
    locale: 'en_US',
    siteName: 'NVStore Exclusive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NVStore Exclusive | Luxury Designer Bags on Solana',
    description: 'Discover authenticated luxury designer bags with seamless crypto payments.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0D0D0D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen">
        <WalletProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WalletProvider>
      </body>
    </html>
  );
}