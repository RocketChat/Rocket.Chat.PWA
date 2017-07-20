import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import { FlexLayoutModule} from '@angular/flex-layout';
import {CreatechannelModule} from './chat/createchannel/createchannel.module';
import {CreatechannelComponent} from '../layout/chat/createchannel/createchannel.component';
import {LayoutComponent} from './layout.component'
import { LayoutRoutingModule } from './layout-routing.module';
import {
  MdToolbarModule, MdSidenavModule, MdIconModule,
  MdButtonModule, MdMenuModule, MdListModule, MdInputModule, MdCardModule,
  MdDialogModule, MdTooltipModule, MdSlideToggleModule , MdSnackBarModule} from '@angular/material';

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
    MdCardModule,
    MdDialogModule,
    MdTooltipModule,
    MdSlideToggleModule,
    CreatechannelModule,
    MdSnackBarModule

  ],
  declarations: [LayoutComponent]
})
export class LayoutModule{
  constructor(){
  }

}
