import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './shared/components/login-page/login-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
