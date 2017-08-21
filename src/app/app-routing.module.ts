import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AuthgaurdService} from './shared/gaurd/authgaurd.service';

const routes: Routes = [
    { path: '', loadChildren: './hostname/hostname.module#HostnameModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule'},
    { path: 'app' , loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'callback', redirectTo: 'login'},
    { path: '404' , loadChildren: './not-found/not-found.module#NotFoundModule'},
    { path: '**' , redirectTo: '404'}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
