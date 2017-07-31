import {Component, OnInit, ViewChild} from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MdDialog, MdDialogRef} from '@angular/material';
import {CreatechannelService} from '../shared/createchannelservice/createchannel.service';
import {CreatechannelComponent} from '../layout/createchannel/createchannel.component';
import {WebsocketService} from '../shared/websocket/websocket.service';
import {MdSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ReversePipe} from './reversepipe';
import {RoomObject} from '../shared/roomobject/roomobject';

import 'rxjs/Rx';
import {observable} from "rxjs/symbol/observable";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: []
})
export class LayoutComponent implements OnInit {
  @ViewChild('latestDate') latestDate;
  public roomID: any;
  public messages: Object[] = [];
  public selectedOption: string;
  public result: any
  public channellist$: Observable<any>;
  public messages$: Observable<any>;
  public searchValue: string;

  constructor(public media: ObservableMedia,
              private createchanneldialogue: CreatechannelService,
              private ws: WebsocketService, private snackBar: MdSnackBar,
              private router: Router) {
      this.searchValue = null;
      localStorage.setItem('ts',null);
      this.channellist$ = this.getSubscription();
  }
  ngOnInit() {
    this.ws.streamnotifyUser('message').subscribe((data) => console.log('Notify Room User' + JSON.stringify(data)));

  }

  openDialog() {
    this.createchanneldialogue.confirm().subscribe(res => this.result = res);
  }
  signout(){
    localStorage.clear();
    this.router.navigate(['../']);
  }




  getChannels(time: number) {
    this.ws.listChannels(time)
      .subscribe(
        (data) => console.log(data));
  }

  openingRooms(rid: string) {
    this.roomID = rid;
    this.messages$ = this.loadingHistory(rid, null , 50, Number(localStorage.getItem('ts')));
    this.getLastMsgTimestamp(rid);
    setTimeout(function () {
      console.log('Timestamp', localStorage.getItem('ts'));
    }, 3000);
  }

  foo() {
    console.log('Foo clicked');
  }
  getLastMsgTimestamp(rid: string){
    this.loadingHistory(rid, null, 50, Number(localStorage.getItem('ts')))
      .flatMap(data => Observable.from(data).first())
      .map(res => {
        if (res.hasOwnProperty('ts') !== null) {
          if (res.ts.hasOwnProperty('$data') !== null){
            return res.ts.$date;
          }
        }
      }).subscribe((data) => {
      console.log('data i got :' + data);
        localStorage.setItem('ts', data);
      },
        (err) => {
          localStorage.setItem('ts', null);
        },
            () => console.log('completed')
        );
  }

  sendMessage(text: string){
    this.searchValue = '';
    console.log('I am sending :' + text);
    this.ws.sendChatMessage(this.roomID, text).subscribe((data) => console.log('Send message response :' + data));

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
