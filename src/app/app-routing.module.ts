import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './hostname/hostname.module#HostnameModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule'},
    { path: 'app' , loadChildren: './layout/layout.module#LayoutModule'},
    { path: '404' , loadChildren: './not-found/not-found.module#NotFoundModule'},
    { path: '**' , redirectTo: '404'}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
