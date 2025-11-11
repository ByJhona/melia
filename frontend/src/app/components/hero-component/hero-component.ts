import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CardMediumComponent } from '../card-medium-component/card-medium-component';

@Component({
  selector: 'melia-hero-component',
  imports: [LucideAngularModule, CardMediumComponent],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.scss',
})
export class HeroComponent {
  scrollToForm() {
    const el = document.getElementById('email-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
