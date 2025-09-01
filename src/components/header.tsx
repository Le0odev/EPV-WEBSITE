'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useState } from 'react';

const WHATSAPP_LINK = "https://wa.me/5581991676177?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos.";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/catalogo', label: 'Catálogo' },
        { href: '#produtos', label: 'Produtos' },
        { href: '#sobre', label: 'Sobre Nós' },
        { href: '#contato', label: 'Contato' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
                <Logo />
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden items-center gap-4 md:flex">
                    <Button asChild className="bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-primary-foreground">
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                            Peça pelo WhatsApp
                        </a>
                    </Button>
                </div>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden h-11 w-11">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle><span className="sr-only">Menu</span></SheetTitle>
                        <SheetDescription><span className="sr-only">Navegação principal</span></SheetDescription>
                        <div className="flex flex-col p-6 pt-10">
                            <Logo />
                            <nav className="mt-8 flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link key={link.href} href={link.href} onClick={handleLinkClick} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            <Button asChild className="mt-8 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-primary-foreground">
                                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                                    Peça pelo WhatsApp
                                </a>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
