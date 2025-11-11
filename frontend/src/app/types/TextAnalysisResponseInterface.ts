import { CategoryEmailEnum } from './CategoryEmailEnum';

export interface TextAnalysisResponseInterface {
  original: string;
  cleaned: string;
  category: CategoryEmailEnum;
  response: string;
  filename?: string;
}
