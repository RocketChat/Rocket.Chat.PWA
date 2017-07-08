import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {MdCardModule, MdInputModule} from '@angular/material';


import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MdCardModule, MdInputModule,

  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
