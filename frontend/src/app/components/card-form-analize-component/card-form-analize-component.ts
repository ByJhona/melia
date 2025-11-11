import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'melia-card-form-analize-component',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-form-analize-component.html',
  styleUrl: './card-form-analize-component.scss',
})
export class CardFormAnalizeComponent {
  public readonly isloading = input<boolean>(false);
  private readonly toastServ = inject(ToastService);
  public readonly form = new FormGroup({
    email: new FormControl<string>(''),
  });

  private readonly selectedFile = signal<File | null>(null);
  public readonly emailSent = output<string | File>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && file.size > 5 * 1024 * 1024) {
      this.toastServ.error(
        'O arquivo selecionado excede o tamanho máximo de 5MB.'
      );
      input.value = '';
      this.selectedFile.set(null);
      return;
    }

    if (file) {
      this.form.reset();
    }

    this.selectedFile.set(file);
  }

  onSubmit(fileInput: HTMLInputElement) {
    const email = this.getFormControl('email').value?.trim();
    const file = this.selectedFile();

    if (file) {
      this.emailSent.emit(file);
      this.selectedFile.set(null);
      fileInput.value = '';
    } else if (email) {
      this.emailSent.emit(email);
      this.form.reset();
    } else {
      this.toastServ.error(
        'Por favor, informe um texto ou selecione um arquivo!'
      );
    }
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
