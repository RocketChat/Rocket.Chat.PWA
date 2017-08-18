import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import {MdButtonModule, MdIconModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
