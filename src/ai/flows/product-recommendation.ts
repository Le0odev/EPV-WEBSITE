
'use server';
/**
 * @fileOverview Um fluxo de IA para recomendar produtos com base em categorias.
 *
 * - recommendProducts - Uma função que recebe o nome de uma categoria e retorna produtos recomendados.
 * - RecommendProductsInput - O tipo de entrada para a função recommendProducts.
 * - RecommendProductsOutput - O tipo de retorno para a função recommendProducts.
 */

import { productService, Product } from '@/services/product-service';
import { z } from 'genkit';

const RecommendProductsInputSchema = z.object({
  categoryName: z.string().describe('O nome da categoria para a qual recomendar produtos.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
    }),
    imageUrl: z.string(),
    imageHint: z.string(),
});

const RecommendProductsOutputSchema = z.object({
  products: z.array(ProductSchema).describe('Uma lista de produtos recomendados.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

// This function now directly calls the product service, bypassing the Genkit flow
// to avoid the API key error until AI functionality is actually needed.
export async function recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsOutput> {
  const products = await productService.getProductsByCategory(input.categoryName);
  return { products };
}
