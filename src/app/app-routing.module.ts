import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './hostname/hostname.module#HostnameModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule'}
  ];
    /*{path: ''},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }*/


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
