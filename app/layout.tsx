import "./globals.css";
import Header from "./components/Header";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Layan Verde Clone",
  description: "Luxury Resort Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
