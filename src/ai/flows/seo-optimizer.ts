// This file uses server-side code.
'use server';

/**
 * @fileOverview A flow for optimizing meta tags and schema markup for SEO.
 *
 * - seoOptimize - A function that takes website content and returns optimized meta tags and schema markup.
 * - SeoOptimizeInput - The input type for the seoOptimize function.
 * - SeoOptimizeOutput - The return type for the seoOptimize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeoOptimizeInputSchema = z.object({
  websiteContent: z
    .string()
    .describe('The HTML content of the website to be optimized.'),
  keyword: z
    .string()
    .describe('The primary keyword for which the page should be optimized.'),
});
export type SeoOptimizeInput = z.infer<typeof SeoOptimizeInputSchema>;

const SeoOptimizeOutputSchema = z.object({
  metaTags: z.string().describe('Optimized meta tags for the website.'),
  schemaMarkup: z.string().describe('Optimized schema markup for the website.'),
});
export type SeoOptimizeOutput = z.infer<typeof SeoOptimizeOutputSchema>;

export async function seoOptimize(input: SeoOptimizeInput): Promise<SeoOptimizeOutput> {
  return seoOptimizeFlow(input);
}

const seoOptimizePrompt = ai.definePrompt({
  name: 'seoOptimizePrompt',
  input: {schema: SeoOptimizeInputSchema},
  output: {schema: SeoOptimizeOutputSchema},
  prompt: `You are an SEO expert. You will receive the HTML content of a website and a primary keyword. Your task is to optimize the meta tags and schema markup for the website to improve its search engine ranking.

Website Content:
{{{websiteContent}}}

Primary Keyword:
{{{keyword}}}

Instructions:
1. Analyze the website content and identify relevant information.
2. Generate optimized meta tags, including title, description, and keywords.
3. Generate schema markup to provide structured data about the website.
4. Return the optimized meta tags and schema markup as strings.

Ensure that the meta tags and schema markup are well-formatted and follow the latest SEO best practices.

Output the meta tags and schema markup in a format that can be directly inserted into the HTML of the website.

Example Output:
{
  "metaTags": "<title>Optimized Title</title>\n<meta name=\"description\" content=\"Optimized description\">\n<meta name=\"keywords\" content=\"keyword1, keyword2\">",
  "schemaMarkup": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Organization\",\n  \"name\": \"Your Organization Name\",\n  \"url\": \"https://www.example.com\"\n}\n</script>"
}
`,
});

const seoOptimizeFlow = ai.defineFlow(
  {
    name: 'seoOptimizeFlow',
    inputSchema: SeoOptimizeInputSchema,
    outputSchema: SeoOptimizeOutputSchema,
  },
  async input => {
    const {output} = await seoOptimizePrompt(input);
    return output!;
  }
);
