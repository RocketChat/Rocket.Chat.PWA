import {Component, OnInit, ViewChild} from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MdDialog, MdDialogRef} from '@angular/material';
import {CreatechannelService} from '../shared/createchannelservice/createchannel.service';
import {CreatechannelComponent} from '../layout/chat/createchannel/createchannel.component';
import {WebsocketService} from '../shared/websocket/websocket.service';
import {MdSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RoomObject} from '../shared/roomobject/roomobject';
import 'rxjs/Rx';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('channellist') channellistDOM;
  public messages: Object[] = [];
  public selectedOption: string;
  public result: any
  public channellist$: Observable<any>;

  constructor(public media: ObservableMedia,
              private createchanneldialogue: CreatechannelService,
              private ws: WebsocketService, private snackBar: MdSnackBar) {
    Observable.of([
      {name: 'Joe'},
      {name: 'Bob'},
      {name: 'Susy'}
    ]).subscribe((data) => console.log(data));
    this.channellist$ = this.getSubscription();

  }
  ngOnInit() {

  }

  openDialog() {
    this.createchanneldialogue.confirm().subscribe(res => this.result = res);
  }

  foo() {
    console.log('Foo clicked');
  }



  getChannels(time: number) {
    this.ws.listChannels(time)
      .subscribe(
        (data) => console.log(data));
  }

  channelnameclicked(name: string) {
    console.log('main click hua :D' + name);
  }

  getSubscription() {
    return this.ws.getsubscription();
  }
}
