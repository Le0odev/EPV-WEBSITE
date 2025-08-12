'use client';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.13c-1.55 0-3.04-.42-4.34-1.21l-.31-.18-3.22.84.86-3.14-.2-.33a8.16 8.16 0 0 1-1.26-4.24c0-4.53 3.68-8.21 8.21-8.21 2.21 0 4.23.86 5.81 2.44s2.44 3.6 2.44 5.81c-.01 4.53-3.69 8.21-8.22 8.21zm4.43-5.32c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.41-1.54-1.58-1.81c-.17-.27-.02-.42.11-.54s.24-.28.36-.42c.12-.14.16-.24.24-.41s.04-.31-.02-.43c-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.47c-.16 0-.43.06-.66.31s-.86.84-.86 2.04c0 1.2.88 2.36 1 2.52.12.16 1.73 2.63 4.18 3.63.59.24 1.05.38 1.41.48.59.16 1.13.14 1.54.08.45-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.16-.16-.34-.28z"/>
    </svg>
);

export function WhatsAppButton() {
    return (
        <a 
            href="https://wa.me/5581991676177?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-100"
            aria-label="Fale conosco pelo WhatsApp"
        >
            <WhatsAppIcon className="h-8 w-8" />
        </a>
    );
}
