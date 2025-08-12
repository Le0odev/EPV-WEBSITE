'use client';

import { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !phone || !message) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    const WHATSAPP_NUMBER = "5581991676177";
    const personalizedMessage = `Olá! Meu nome é ${name} e meu telefone é ${phone}. Mensagem: ${message}`;
    const encodedMessage = encodeURIComponent(personalizedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    toast({
      title: 'Quase lá!',
      description: 'Sua mensagem foi preparada. Basta enviá-la no WhatsApp.',
    });

    formRef.current?.reset();
    setIsSubmitting(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" placeholder="Seu nome completo" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(81) 99167-6177" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" placeholder="Como podemos ajudar?" rows={4} required />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-primary-foreground text-base font-semibold h-12">
        {isSubmitting ? 'Gerando mensagem...' : 'Enviar via WhatsApp'}
      </Button>
    </form>
  );
}
