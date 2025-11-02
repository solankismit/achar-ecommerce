import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Achar & Papad - Authentic Indian Pickles & Traditional Foods',
  description: 'Authentic homemade Indian pickles, papads, chutneys, and masalas crafted with traditional recipes. Fresh, natural, and delivered to your doorstep.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
