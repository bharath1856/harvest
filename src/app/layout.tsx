import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'HarvestLink — AI-Powered Farm-to-Table Platform',
  description:
    'Connecting farmers, buyers, and supply-chain partners through intelligent, transparent, and sustainable agriculture technology.',
  openGraph: {
    title: 'HarvestLink',
    description: 'AI-powered farm-to-table platform for the modern agricultural supply chain.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
