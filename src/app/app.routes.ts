import { Routes } from '@angular/router';
import { SitesComponent } from './sites/sites.component';

export const routes: Routes = [
  { 
    path: 'sites', 
    component: SitesComponent,
  },
  { 
    path: '',
    redirectTo: '/sites',
    pathMatch: 'full',
  },
];
  