import { Observable } from 'rxjs/Rx';
import { CreatechannelComponent } from '../../layout/chat/createchannel/createchannel.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class CreatechannelService {

  constructor(private dialog: MdDialog) { }

  public confirm(): Observable<boolean> {
    let dialogRef: MdDialogRef<CreatechannelComponent>;
    dialogRef = this.dialog.open(CreatechannelComponent);
    return dialogRef.afterClosed();
  }
}
