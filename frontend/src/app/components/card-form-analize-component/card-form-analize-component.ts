import { Component, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'melia-card-form-analize-component',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-form-analize-component.html',
  styleUrl: './card-form-analize-component.scss',
})
export class CardFormAnalizeComponent {
  public readonly form = new FormGroup({
    email: new FormControl<string>(''),
  });

  private readonly selectedFile = signal<File | null>(null);

  emailFileSelected = output<File | null>();
  emailSent = output<string | File>();

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert('Arquivo excede 5MB!');
      this.selectedFile.set(null);
      this.emailFileSelected.emit(null);
      return;
    }

    if (file) {
      this.form.reset();
    }

    this.selectedFile.set(file);
    this.emailFileSelected.emit(file);
  }

  onSubmit() {
    const email = this.getFormControl('email').value?.trim();
    const file = this.selectedFile();

    if (file) {
      console.log('📤 Enviando arquivo:', file.name);
      this.emailSent.emit(file);
      this.selectedFile.set(null);
    } else if (email) {
      console.log('✉️ Enviando mensagem:', email);
      this.emailSent.emit(email);
      this.form.reset();
    } else {
      alert('Por favor, informe um texto ou selecione um arquivo!');
    }
  }
}
