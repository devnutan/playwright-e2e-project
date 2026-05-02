export type FailureCategory =
  | 'test_issue'
  | 'product_bug'
  | 'flaky_or_environment'
  | 'unknown';

export interface FailureArtifact {
  testTitle: string;
  file?: string;
  projectName?: string;
  retry?: number;
  errorMessage: string;
  stackTrace?: string;
  attachments?: {
    name: string;
    contentType: string;
    path?: string;
  }[];
}

export interface FailureAnalysis {
  rootCause: string;
  category: FailureCategory;
  confidence: number;
  suggestedNextSteps: string[];
  reasoning: string;
}
