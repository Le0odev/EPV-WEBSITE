import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Truck, Users, Award, Utensils, Sprout, Wheat, Coffee, Phone, Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

const WHATSAPP_LINK = "https://wa.me/5581991676177?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos.";

function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[400px] w-full">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Produtos naturais em uma mesa"
        data-ai-hint="natural products grains"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline">Empório Verde Grãos</h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          Produtos naturais de qualidade para sua vida saudável.
        </p>
        <Button asChild size="lg" className="mt-8 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-primary-foreground">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Peça pelo WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const highlights = [
    { icon: Truck, title: "Entrega Local", description: "Receba seus produtos no conforto de casa." },
    { icon: Users, title: "Atendimento Personalizado", description: "Nossa equipe está pronta para te ajudar." },
    { icon: Award, title: "Qualidade Garantida", description: "Produtos selecionados com o máximo cuidado." },
    { icon: Utensils, title: "Dicas e Orientações", description: "Aproveite ao máximo seus ingredientes." },
  ];

  return (
    <section id="diferenciais" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Nossos Diferenciais</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">Mais que produtos, oferecemos uma experiência completa.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold font-headline">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
    const categories = [
        { name: "Grãos e Cereais", icon: Wheat, image: "https://images.unsplash.com/photo-1574484152510-903878da786c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxnciVDMyVBM29zJTIwZSUyMGNlcmVhaXN8ZW58MHx8fHwxNzU1MDI2NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "grains cereals" },
        { name: "Chás e infusões", icon: Coffee, image: "https://images.unsplash.com/photo-1550058062-61048adffb7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2glQzMlQTElMjBoaWJpc2N1c3xlbnwwfHx8fDE3NTUwMjY3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "tea herbs" },
        { name: "Ervas e Temperos", icon: Leaf, image: "https://placehold.co/600x400.png", hint: "herbs spices" },
        { name: "Produtos Naturais", icon: Sprout, image: "https://placehold.co/600x400.png", hint: "natural products" },
    ];
  return (
    <section id="produtos" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Nossos Produtos</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">Explore nossas categorias e encontre o que precisa.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="p-0">
                <Image src={category.image} alt={category.name} data-ai-hint={category.hint} width={600} height={400} className="h-48 w-full object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Nossa História</h2>
            <p className="text-muted-foreground md:text-lg">
              Nascido da paixão por uma vida saudável e pelo poder da natureza, o Empório Verde Grãos é um sonho que se tornou realidade. Há mais de X anos, nos dedicamos a selecionar os melhores grãos, ervas e produtos naturais, acreditando que a qualidade do que comemos reflete diretamente em nosso bem-estar.
            </p>
            <p className="text-muted-foreground md:text-lg">
              Nossa missão é simples: levar saúde e sabor à sua mesa, com a confiança e o carinho de quem entende do assunto. Valorizamos a tradição, o atendimento próximo e a pureza de cada item que oferecemos.
            </p>
          </div>
          <Image src="https://placehold.co/600x400.png" alt="Loja Empório Verde Grãos" data-ai-hint="natural store staff" width={600} height={400} className="mx-auto aspect-video overflow-hidden rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Entre em Contato</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">Tire suas dúvidas, faça seu pedido ou venha nos visitar.</p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Informações de Contato</h3>
                    <div className="space-y-2 text-muted-foreground">
                        <a href="https://maps.app.goo.gl/yQ4u2v6AozY7RzP36" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><MapPin className="h-5 w-5"/>Av. Jerônimo Gueiros - Centro, Abreu e Lima - PE</a>
                        <a href="tel:+5581991676177" className="flex items-center gap-2 hover:text-primary"><Phone className="h-5 w-5"/>(81) 99167-6177</a>
                        <a href="mailto:contato@emporioverde.com" className="flex items-center gap-2 hover:text-primary"><Mail className="h-5 w-5"/>contato@emporioverde.com</a>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Horário de Funcionamento</h3>
                    <p className="text-muted-foreground">Segunda a Sábado: 08:00 às 18:00</p>
                </div>
                <div className="aspect-video w-full">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8993722249224!2d-34.90283332499381!3d-7.905580592117551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab15a46d6ca755%3A0xb6d31d0cce748388!2zRW1ww7NyaW8gVmVyZGUgR3LDo29z!5e0!3m2!1spt-BR!2sbr!4v1755026480401!5m2!1spt-BR!2sbr" 
                        width="100%" 
                        height="100%" 
                        style={{ border:0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Mande uma mensagem</h3>
                <ContactForm />
            </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HighlightsSection />
        <CategoriesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
