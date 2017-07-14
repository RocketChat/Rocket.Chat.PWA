import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import { FlexLayoutModule} from '@angular/flex-layout';

import {LayoutComponent} from './layout.component'
import { LayoutRoutingModule } from './layout-routing.module';
import {
  MdToolbarModule, MdSidenavModule, MdIconModule,
  MdButtonModule, MdMenuModule, MdListModule, MdInputModule, MdCardModule
  } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdListModule,
    FlexLayoutModule,
    MdInputModule,
    MdCardModule

  ],
  declarations: [LayoutComponent]
})
export class LayoutModule{
  constructor(){
  }

}
