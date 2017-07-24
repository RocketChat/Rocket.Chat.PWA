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

  openingRooms(rid: string) {
    this.ws.getRooms(rid).subscribe((data) => console.log('open room' + JSON.stringify(data)));
    this.loadingHistory(rid, null , 50,1500939357);
    this.streamingRoomMessages(rid).subscribe((data) => console.log('stream room message' + JSON.stringify(data)));

  }

  getSubscription() {
    return this.ws.getsubscription();
  }
  streamingRoomMessages(roomId: string){
      return this.ws.streamRoomMessages(roomId);
  }
  loadingHistory(roomid: string, olddate: number, msgquantity: number, newdate: number){
    return this.ws.loadhistory(roomid, olddate, msgquantity, newdate);
  }
}
