export interface TextAnalysisResponseInterface {
  original: string;
  cleaned: string;
  category: string;
  response: string;
  filename?: string;
}
