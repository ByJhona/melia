import { Component, DestroyRef, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';
import { CardFormAnalizeComponent } from '../../components/card-form-analize-component/card-form-analize-component';
import { ApiService } from '../../services/api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'melia-home-page',
  imports: [HeroComponent, CardFormAnalizeComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiServ = inject(ApiService);

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
        next: () => console.log('Arquivo enviado com sucesso!'),
        error: () => console.error('Erro ao enviar arquivo:'),
      });
  }

  private sendText(text: string) {
    this.apiServ
      .sendText(text)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => console.log('Texto enviado com sucesso!'),
        error: () => console.error('Erro ao enviar texto:'),
      });
  }
}
