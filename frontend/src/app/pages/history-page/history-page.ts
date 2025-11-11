import { Component, computed, inject } from '@angular/core';
import { HistoryService } from '../../services/history-service';

@Component({
  selector: 'melia-history-page',
  imports: [],
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.scss'],
})
export class HistoryPage {
  private readonly historyServ = inject(HistoryService);
  public readonly history = computed(() => this.historyServ.history());

  public readonly emptyHistory = computed(() => this.history().length === 0);

  clearHistory() {
    this.historyServ.clearHistory();
  }
}
