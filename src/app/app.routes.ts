import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  {
    path: 'backoffice',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
