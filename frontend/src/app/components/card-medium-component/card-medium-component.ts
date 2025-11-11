import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'melia-card-medium-component',
  imports: [LucideAngularModule],
  templateUrl: './card-medium-component.html',
  styleUrl: './card-medium-component.scss',
})
export class CardMediumComponent {
  icon = input<string>('circle-question-mark');
  color = input<string>('text-blue-500');
  title = input<string>('Default title');

  message = input<string>('Default message');
}
