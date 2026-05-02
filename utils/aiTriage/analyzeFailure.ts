import dotenv from 'dotenv';
import OpenAI from 'openai';
import { z } from 'zod';
import type { FailureAnalysis } from './types';

dotenv.config();
console.log("API KEY LOADED:", !!process.env.OPENAI_API_KEY);
const FailureAnalysisSchema = z.object({
  rootCause: z.string(),
  category: z.enum([
    'test_issue',
    'product_bug',
    'flaky_or_environment',
    'unknown',
  ]),
  confidence: z.number().min(0).max(1),
  suggestedNextSteps: z.array(z.string()),
  reasoning: z.string(),
});

export async function analyzeFailureWithAI(
  formattedFailure: string,
): Promise<FailureAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Add it to your .env file.');
  }

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: `
You are a senior QA automation engineer.

Analyze Playwright test failures carefully.

Rules:
- Be practical and concise.
- Do not overclaim.
- If the failure is unclear, use category "unknown".
- Distinguish between product bugs, test issues, and flaky/environment issues.
- Return only valid JSON.
            `.trim(),
          },
        ],
      },
      {
        role: 'user',
        content: [{ type: 'input_text', text: formattedFailure }],
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'failure_analysis',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            rootCause: { type: 'string' },
            category: {
              type: 'string',
              enum: [
                'test_issue',
                'product_bug',
                'flaky_or_environment',
                'unknown',
              ],
            },
            confidence: { type: 'number' },
            suggestedNextSteps: {
              type: 'array',
              items: { type: 'string' },
            },
            reasoning: { type: 'string' },
          },
          required: [
            'rootCause',
            'category',
            'confidence',
            'suggestedNextSteps',
            'reasoning',
          ],
        },
      },
    },
  });

  return FailureAnalysisSchema.parse(JSON.parse(response.output_text));
}