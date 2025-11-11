import { CategoryEmailEnum } from './../../types/CategoryEmailEnum';
import { Component, effect, inject, input } from '@angular/core';
import { TextAnalysisResponseInterface } from '../../types/TextAnalysisResponseInterface';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'melia-card-analysis-result',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-analysis-result.html',
  styleUrl: './card-analysis-result.scss',
})
export class CardAnalysisResult {
  private readonly toastServ = inject(ToastService);
  public readonly analysis = input<TextAnalysisResponseInterface | null>(null);
  public readonly response = new FormControl('');
  public readonly form = new FormGroup({
    response: new FormControl(''),
  });
  public readonly categoryEmailEnum = CategoryEmailEnum;

  constructor() {
    effect(() => {
      const analysis = this.analysis();
      if (analysis) {
        this.setAnalysis(analysis);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  copyResponse() {
    const response = this.getFormControl('response')?.value ?? '';
    if (response) {
      navigator.clipboard
        .writeText(response)
        .then(() =>
          this.toastServ.info('Resposta copiada para a área de transferência')
        )
        .catch((err) => console.error('Erro ao copiar:', err));
    }
  }

  setAnalysis(analysis: any) {
    this.form.patchValue({
      response: analysis.response,
    });
  }
  sendEmail(
    recipient: string = 'exemplo@autou.com',
    subject: string = 'Resposta Automática'
  ) {
    const body = this.getFormControl('response')?.value ?? '';
    const mailtoLink = `mailto:${encodeURIComponent(
      recipient
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    globalThis.location.href = mailtoLink;
  }
}
