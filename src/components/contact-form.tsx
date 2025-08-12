'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, type FormState } from '@/app/actions';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-primary-foreground text-base font-semibold h-12">
      {pending ? 'Enviando...' : 'Enviar Mensagem'}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Sucesso!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        const errorDescription = state.errors 
            ? Object.values(state.errors).flat().join(' ') 
            : state.message;
        toast({
          title: 'Erro no Envio',
          description: errorDescription,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" placeholder="Seu nome completo" required aria-describedby="name-error" />
        {state.errors?.name && <p id="name-error" className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" required aria-describedby="phone-error" />
        {state.errors?.phone && <p id="phone-error" className="text-sm text-destructive mt-1">{state.errors.phone[0]}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" placeholder="Como podemos ajudar?" rows={4} required aria-describedby="message-error" />
        {state.errors?.message && <p id="message-error" className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
