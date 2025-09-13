import type { Metadata } from "next";
import { Sora, Lexend } from "next/font/google";
import "./globals.css";

const geistSans = Sora({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Lexend({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voting for ambassadorship for passion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
