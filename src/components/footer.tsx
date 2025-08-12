import { Logo } from '@/components/logo';
import Link from 'next/link';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>;

export function Footer() {
    return (
        <footer className="bg-muted text-muted-foreground">
            <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="flex flex-col items-start gap-4">
                        <Logo />
                        <p className="text-sm">Saúde natural ao seu alcance.</p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-base font-semibold text-foreground">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li><Link href="#produtos" className="hover:text-foreground text-sm">Produtos</Link></li>
                            <li><Link href="#sobre" className="hover:text-foreground text-sm">Sobre Nós</Link></li>
                            <li><Link href="#contato" className="hover:text-foreground text-sm">Contato</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-base font-semibold text-foreground">Contato</h3>
                        <address className="not-italic space-y-2 text-sm">
                            <p>Av. Jerônimo Gueiros - Centro, Abreu e Lima - PE</p>
                            <a href="tel:+5581991676177" className="block hover:text-foreground">(81) 99167-6177</a>
                            <a href="mailto:contato@verdeconexao.com.br" className="block hover:text-foreground">contato@emporioverde.com</a>
                        </address>
                    </div>
                    <div>
                        <h3 className="mb-4 text-base font-semibold text-foreground">Redes Sociais</h3>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Facebook"><FacebookIcon className="h-6 w-6 hover:text-foreground" /></a>
                            <a href="#" aria-label="Instagram"><InstagramIcon className="h-6 w-6 hover:text-foreground" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Empório Verde Grãos. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
