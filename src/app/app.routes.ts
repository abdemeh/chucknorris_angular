import { Routes } from '@angular/router';
import { JokesComponent } from './features/jokes/jokes.component';

export const routes: Routes = [
  {
    path: '',
    component: JokesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
