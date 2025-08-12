'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  phone: z.string().min(10, { message: 'Por favor, insira um telefone válido.' }),
  message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }).max(500),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Erro na validação do formulário.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  // For demonstration, we'll just log the data.
  // In a real app, you would send an email, save to a DB, or call an API.
  console.log('Form submission received:');
  console.log(validatedFields.data);

  return {
    message: 'Obrigado pelo seu contato! Responderemos em breve.',
    success: true,
  };
}
