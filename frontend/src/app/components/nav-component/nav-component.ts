import { Component } from '@angular/core';
import { BntToggleTheme } from '../bnt-toggle-theme/bnt-toggle-theme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'melia-nav-component',
  imports: [BntToggleTheme, RouterLink],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.scss',
})
export class NavComponent {}
