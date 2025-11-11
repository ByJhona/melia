export interface ToastInterface {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}
