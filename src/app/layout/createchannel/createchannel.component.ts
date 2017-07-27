import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import {MdDialogModule, MdSlideToggleModule} from '@angular/material';
@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.css']
})
export class CreatechannelComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CreatechannelComponent>) { }

  ngOnInit() {
  }

}
