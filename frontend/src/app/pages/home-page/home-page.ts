import { Component, DestroyRef, inject, NgZone, signal } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';
import { CardFormAnalizeComponent } from '../../components/card-form-analize-component/card-form-analize-component';
import { ApiService } from '../../services/api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toast-service';
import { TextAnalysisResponseInterface } from '../../types/TextAnalysisResponseInterface';
import { CardAnalysisResult } from '../../components/card-analysis-result/card-analysis-result';
import { ViewportScroller } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'melia-home-page',
  imports: [HeroComponent, CardFormAnalizeComponent, CardAnalysisResult],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly apiServ = inject(ApiService);
  private readonly toastServ = inject(ToastService);
  private readonly scroller = inject(ViewportScroller);
  analisysisResult = signal<TextAnalysisResponseInterface | null>(null);

  onEmailSent(payload: string | File) {
    if (payload instanceof File) {
      this.sendFile(payload);
    } else {
      this.sendText(payload);
    }
  }

  private sendFile(file: File) {
    this.apiServ
      .sendFile(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: TextAnalysisResponseInterface) => {
          this.analisysisResult.set(result);
          this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
              this.scrollToAnalysis();
            });

          this.toastServ.success('Arquivo enviado com sucesso!');
        },
        error: () => {
          this.analisysisResult.set(null);
          this.toastServ.error('Erro ao enviar arquivo.');
        },
      });
  }

  private sendText(text: string) {
    this.apiServ
      .sendText(text)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: TextAnalysisResponseInterface) => {
          this.analisysisResult.set(result);
          this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
              this.scrollToAnalysis();
            });

          this.toastServ.success('Texto enviado com sucesso!');
        },
        error: () => {
          this.analisysisResult.set(null);
          this.toastServ.error('Erro ao enviar texto.');
        },
      });
  }

  scrollToAnalysis() {
    const el = document.getElementById('analysis-result');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
