import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HostnameComponent} from './hostname.component'
import { HostnameRoutingModule } from './hostname-routing.module';
import {MdCardModule, MdInputModule, MdButtonModule, MdIconModule, MdProgressSpinnerModule } from '@angular/material';

import {FlexLayoutModule,} from '@angular/flex-layout'
@NgModule({
  imports: [
    CommonModule,
    HostnameRoutingModule,
    MdCardModule, MdInputModule,
    MdButtonModule, MdIconModule,
    FlexLayoutModule, MdProgressSpinnerModule
  ],
  declarations: [HostnameComponent]
})
export class HostnameModule { }
