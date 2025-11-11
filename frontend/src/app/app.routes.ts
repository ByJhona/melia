import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
