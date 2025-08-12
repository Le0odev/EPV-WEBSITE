import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Verde Conexão | Empório Verde Grãos',
  description: 'Produtos naturais de qualidade para sua vida saudável. Saúde natural ao seu alcance.',
  applicationName: 'Verde Conexão',
  authors: [{ name: 'Empório Verde Grãos' }],
  keywords: ['produtos naturais', 'grãos', 'chás', 'ervas', 'temperos', 'vida saudável'],
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Empório Verde Grãos",
  "url": "https://www.emporioverde.com",
  "logo": "",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99999-9999",
    "contactType": "Customer Service"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
