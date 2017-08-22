import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatechannelComponent } from './createchannel.component';
import { MdSlideToggleModule, MdDialogModule, MdInputModule, MdButtonModule } from '@angular/material';
import { CreatechannelService } from '../../shared/createchannelservice/createchannel.service';
@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdSlideToggleModule
  ],
  exports: [
    CreatechannelComponent
  ],
  declarations: [CreatechannelComponent],
  providers: [CreatechannelService],
  entryComponents: [CreatechannelComponent]
})
export class CreatechannelModule { }
