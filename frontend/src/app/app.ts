import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav-component/nav-component';
import { FooterComponent } from './components/footer-component/footer-component';
import { ToastComponent } from './components/toast-component/toast-component';
import { ApiService } from './services/api-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('melia');
  private readonly pingInterval = 1 * 60 * 1000;
  private readonly apiServ = inject(ApiService);

  constructor() {
    setInterval(() => {
      this.apiServ.ping().subscribe();
    }, this.pingInterval);
  }

  ngOnInit(): void {
    this.apiServ.ping().subscribe();
  }
}
