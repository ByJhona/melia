import { Component, DestroyRef, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';
import { CardFormAnalizeComponent } from '../../components/card-form-analize-component/card-form-analize-component';
import { ApiService } from '../../services/api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toast-service';
import { TextAnalysisResponseInterface } from '../../types/TextAnalysisResponseInterface';

@Component({
  selector: 'melia-home-page',
  imports: [HeroComponent, CardFormAnalizeComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiServ = inject(ApiService);
  private readonly toastServ = inject(ToastService);

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
          console.log(result);
          this.toastServ.success('Arquivo enviado com sucesso!');
        },
        error: () => this.toastServ.error('Erro ao enviar arquivo.'),
      });
  }

  private sendText(text: string) {
    this.apiServ
      .sendText(text)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: TextAnalysisResponseInterface) => {
          console.log(result);
          this.toastServ.success('Texto enviado com sucesso!');
        },
        error: () => this.toastServ.error('Erro ao enviar texto.'),
      });
  }
}
