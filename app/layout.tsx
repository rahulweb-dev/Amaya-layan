import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}