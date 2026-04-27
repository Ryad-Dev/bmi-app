import './globals.css'
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';


const inter = Inter({ subsets: ['latin'] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Analyse corporelle — IMC & Musculation",
  description: "Calculateur IMC, masse grasse, corpulence et recommandations musculation personnalisées.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
    <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
