import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';

@Component({
  selector: 'melia-home-page',
  imports: [HeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
