import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachfileComponent } from './attachfile.component';
import { MdSlideToggleModule, MdDialogModule, MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';
import { AttachfileService } from '../../shared/attachfile/attachfile.service';
import { CovalentFileModule } from '@covalent/core';


@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdSlideToggleModule,
    MdIconModule,
    CovalentFileModule
  ],
  exports: [
    AttachfileComponent
  ],
  declarations: [AttachfileComponent],
  providers: [AttachfileService],
  entryComponents: [AttachfileComponent]
})
export class AttachfileModule { }
