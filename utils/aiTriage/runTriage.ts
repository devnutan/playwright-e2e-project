import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import type { FailureArtifact } from './types';
import { formatFailureForAI } from './formatFailure';
import { analyzeFailureWithAI } from './analyzeFailure';

dotenv.config();
console.log('runTriage.ts file loaded');

function getInputPath(): string {
  const inputIndex = process.argv.indexOf('--input');

  if (inputIndex === -1 || !process.argv[inputIndex + 1]) {
    throw new Error(
      'Usage: npm run ai:triage -- --input failure-artifacts/example.json',
    );
  }

  return process.argv[inputIndex + 1];
}

function saveReport(inputFile: string, report: unknown): string {
  const outputDir = path.join(process.cwd(), 'ai-triage-reports');
  fs.mkdirSync(outputDir, { recursive: true });

  const baseName = path.basename(inputFile, '.json');
  const outputPath = path.join(outputDir, `${baseName}-analysis.json`);

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  return outputPath;
}

async function main() {
  const inputPath = getInputPath();

  const raw = fs.readFileSync(inputPath, 'utf-8');
  const failure = JSON.parse(raw) as FailureArtifact;

  const formatted = formatFailureForAI(failure);
  const analysis = await analyzeFailureWithAI(formatted);

  const reportPath = saveReport(inputPath, {
    generatedAt: new Date().toISOString(),
    input: failure,
    analysis,
  });

  console.log('\nAI Failure Analysis\n');
  console.log(`Root cause: ${analysis.rootCause}`);
  console.log(`Category: ${analysis.category}`);
  console.log(`Confidence: ${analysis.confidence}`);

  console.log('\nSuggested next steps:');
  analysis.suggestedNextSteps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });

  console.log(`\nReasoning: ${analysis.reasoning}`);
  console.log(`\nSaved report: ${reportPath}`);
}

main().catch((error) => {
  console.error('AI triage failed.');
  console.error(error);
  process.exit(1);
});

main().catch((error) => {
  console.error('AI triage failed.');
  console.error(error);
  process.exit(1);
});