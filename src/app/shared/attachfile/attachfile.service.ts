import { Observable } from 'rxjs/Rx';
import { AttachfileComponent } from '../../layout/attachfile/attachfile.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class AttachfileService {

  constructor(private dialog: MdDialog) { }

  public confirm(): Observable<boolean> {
    let dialogRef: MdDialogRef<AttachfileComponent>;
    dialogRef = this.dialog.open(AttachfileComponent);
    return dialogRef.afterClosed();
  }
}
