import { Component, computed } from '@angular/core';

@Component({
  selector: 'melia-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  currentYear = computed(() => new Date().getFullYear());
}
