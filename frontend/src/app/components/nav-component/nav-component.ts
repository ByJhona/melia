import { Component } from '@angular/core';
import { BntToggleTheme } from '../bnt-toggle-theme/bnt-toggle-theme';

@Component({
  selector: 'melia-nav-component',
  imports: [BntToggleTheme],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.scss',
})
export class NavComponent {}
