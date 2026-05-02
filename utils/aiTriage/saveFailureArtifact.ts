import fs from 'fs';
import path from 'path';
import type { TestInfo } from '@playwright/test';
import type { FailureArtifact } from './types';

function safeFileName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

export function saveFailureArtifact(testInfo: TestInfo): string | null {
  if (testInfo.status === testInfo.expectedStatus) return null;

  const artifact: FailureArtifact = {
    testTitle: testInfo.title,
    file: testInfo.file,
    projectName: testInfo.project.name,
    retry: testInfo.retry,
    errorMessage: testInfo.error?.message ?? '',
    stackTrace: testInfo.error?.stack ?? '',
    attachments: testInfo.attachments.map((attachment) => ({
      name: attachment.name,
      contentType: attachment.contentType,
      path: attachment.path,
    })),
  };

  const outputDir = path.join(process.cwd(), 'failure-artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `${safeFileName(testInfo.title)}.json`);

  fs.writeFileSync(filePath, JSON.stringify(artifact, null, 2), 'utf-8');

  console.log(`Failure artifact saved: ${filePath}`);

  return filePath;
}