import { Injectable, signal } from '@angular/core';
import { ToastInterface } from '../types/ToastInterface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toasts = signal<ToastInterface[]>([]);
  private counter = 0;

  getToasts() {
    return this.toasts;
  }

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration = 3000
  ) {
    const id = this.counter++;
    const newToast: ToastInterface = { id, message, type, duration };
    this.toasts.set([...this.toasts(), newToast]);

    setTimeout(() => {
      this.toasts.set(this.toasts().filter((t) => t.id !== id));
    }, duration);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}
