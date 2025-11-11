import { Injectable, signal } from '@angular/core';
import { TextAnalysisResponseInterface } from '../types/TextAnalysisResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly history_ = signal<TextAnalysisResponseInterface[]>([]);

  constructor() {
    const stored = JSON.parse(localStorage.getItem('melia_history') || '[]');
    this.history_.set(stored);
  }

  saveAnalysis(analysis: TextAnalysisResponseInterface) {
    this.history_.update((current) => {
      const updated = [...current, analysis];
      localStorage.setItem('melia_history', JSON.stringify(updated));
      return updated;
    });
  }

  get history() {
    return this.history_;
  }

  clearHistory() {
    this.history_.set([]);
    localStorage.removeItem('melia_history');
  }
}
