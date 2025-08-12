import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { seoOptimize } from '@/ai/flows/seo-optimizer';

const getSeoData = async () => {
    const pageContentSummary = `
      Empório Verde Grãos: uma loja de produtos naturais em português do Brasil.
      Slogan: "Saúde natural ao seu alcance".
      O site apresenta nossos produtos, incluindo grãos, cereais, chás, infusões, ervas e temperos.
      Destacamos nossos diferenciais: entrega local, atendimento personalizado e produtos de alta qualidade.
      Contamos nossa história e missão, com foco em saúde, bem-estar, e tradição.
      Facilitamos o contato via WhatsApp, telefone e um formulário de contato.
      O objetivo é que os clientes façam pedidos e tirem dúvidas.
    `;
    try {
        const seoData = await seoOptimize({
            websiteContent: pageContentSummary,
            keyword: 'produtos naturais',
        });
        return seoData;
    } catch (error) {
        console.error("Failed to generate SEO metadata:", error);
        return {
            metaTags: '<title>Verde Conexão | Empório Verde Grãos</title><meta name="description" content="Produtos naturais de qualidade para sua vida saudável. Saúde natural ao seu alcance."/>',
            schemaMarkup: '{}'
        };
    }
};

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData();

  const titleMatch = seoData.metaTags.match(/<title>(.*?)<\/title>/);
  const descriptionMatch = seoData.metaTags.match(/<meta name="description" content="(.*?)"/);
  
  const title = titleMatch ? titleMatch[1] : 'Verde Conexão | Empório Verde Grãos';
  const description = descriptionMatch ? descriptionMatch[1] : 'Produtos naturais de qualidade para sua vida saudável.';

  return {
    title,
    description,
    applicationName: 'Verde Conexão',
    authors: [{ name: 'Empório Verde Grãos' }],
    keywords: ['produtos naturais', 'grãos', 'chás', 'ervas', 'temperos', 'vida saudável'],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seoData = await getSeoData();
  const schemaMarkupMatch = seoData.schemaMarkup.match(/<script.*?>(.*?)<\/script>/s);
  const schemaJsonString = schemaMarkupMatch ? schemaMarkupMatch[1] : null;

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        {schemaJsonString && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJsonString }}
          />
        )}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
