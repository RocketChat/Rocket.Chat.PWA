import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import {CreatechannelModule} from './createchannel/createchannel.module';
import {LayoutComponent} from './layout.component'
import { LayoutRoutingModule } from './layout-routing.module';
import {ReversePipe} from  './reversepipe';

import {
  MdToolbarModule, MdSidenavModule, MdIconModule,
  MdButtonModule, MdMenuModule, MdListModule, MdInputModule, MdCardModule,
  MdDialogModule, MdTooltipModule, MdSlideToggleModule , MdSnackBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdListModule,
    FlexLayoutModule,
    MdInputModule,
    MdCardModule,
    MdDialogModule,
    MdTooltipModule,
    MdSlideToggleModule,
    CreatechannelModule,
    MdSnackBarModule

  ],
  declarations: [LayoutComponent, ReversePipe],
  providers:[]
})
export class LayoutModule{
  constructor(){
  }

}
