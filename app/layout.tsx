import { Cormorant_Garamond, Jost } from 'next/font/google';
import "./globals.css";
import Header from "./components/Header";
import ClientLayout from "./components/ClientLayout";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  title: "Amaya by Vera Vita",
  description: "Independent senior living by Vera Vita, designed around comfort, community, nature, and quiet reassurance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
