import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';
import { CardFormAnalizeComponent } from '../../components/card-form-analize-component/card-form-analize-component';

@Component({
  selector: 'melia-home-page',
  imports: [HeroComponent, CardFormAnalizeComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
