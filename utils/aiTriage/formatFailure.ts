import type { FailureArtifact } from './types';

export function formatFailureForAI(failure: FailureArtifact): string {
  const trimmedStack = failure.stackTrace?.slice(0, 2500) || 'N/A';

  const attachments =
    failure.attachments
      ?.map((a) => `- ${a.name} (${a.contentType}): ${a.path ?? 'N/A'}`)
      .join('\n') || 'N/A';

  return `
Analyze this Playwright test failure.

Test title:
${failure.testTitle}

File:
${failure.file ?? 'N/A'}

Project:
${failure.projectName ?? 'N/A'}

Retry:
${failure.retry ?? 0}

Error message:
${failure.errorMessage}

Stack trace:
${trimmedStack}

Attachments:
${attachments}

Classify the failure into one of:
- test_issue
- product_bug
- flaky_or_environment
- unknown

Return a practical analysis that helps an automation engineer decide what to do next.
`.trim();
}