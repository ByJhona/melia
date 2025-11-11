import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { ToastEnum } from '../../types/ToastEnum';

@Component({
  selector: 'melia-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss',
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);
  public readonly toasts = computed(() => this.toastService.getToasts()());
  public readonly toastEnum = ToastEnum;
}
