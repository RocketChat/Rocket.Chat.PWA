import {Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, QueryList, Directive} from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MdDialog, MdDialogRef} from '@angular/material';
import {CreatechannelService} from '../shared/createchannelservice/createchannel.service';
import {AttachfileService} from '../shared/attachfile/attachfile.service';
import {CreatechannelComponent} from '../layout/createchannel/createchannel.component';
import {WebsocketService} from '../shared/websocket/websocket.service';
import {MdSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import {ReversePipe} from './reversepipe';
import {RoomObject} from '../shared/roomobject/roomobject';

import 'rxjs/Rx';
import {observable} from 'rxjs/symbol/observable';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  public roomID: any;

  public tempArray: Array<any>;
  public rawChannelArray$: Observable<any>;
  public selectedOption: string;
  public result: any
  public channellist$: Observable<any>;
  public newChannelList$ :Subject<any>;
  public messages: Array<any>;
  public searchValue: string;

  constructor(public media: ObservableMedia,
              private createchanneldialogue: CreatechannelService,
              private attachfile: AttachfileService,
              private ws: WebsocketService, private snackBar: MdSnackBar,
              private router: Router) {
      this.searchValue = null;
      localStorage.setItem('ts', null);
       this.channellist$ = this.getSubscription();
    /*this.rawChannelArray$ = this.getSubscription();


    this.rawChannelArray$
      .map((res) => {
      for (const i in res){
        if (res[i].hasOwnProperty('t') !== null) {
          if (res[i].t === 'c') {
                this.logChannel(res[i]);
          }else {
            this.logDirect(res[i]);
          }
        }
      }
      })
      .subscribe((data) => console.log(data));

    this.ws.streamnotifyUser('message')
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => console.log('Completed'));
    */
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }

  openDialog(){
    this.createchanneldialogue.confirm().subscribe(res => this.result = res);
  }

  logChannel(data: any){
    Observable.defer(() => Observable.from(data))
  }

  logDirect(data: any){
    Observable.of(data).subscribe((res) => console.log(res));
  }

  attachFile(){
    console.log('Attach file clicked');
    this.attachfile.confirm().subscribe((data) => {
      if (data === true)
      {
        console.log('Hell yeah');
      }
    });
  }

  signout(){
    localStorage.clear();
    window.open('/', '_self')
  }

  getChannels(time: number) {
    this.ws.listChannels(time)
      .subscribe(
        (data) => console.log(data));
  }

  openingRooms(rid: string) {
    this.roomID = rid;
    this.loadingHistory(rid, null , 50, Number(localStorage.getItem('ts'))).subscribe(value => this.messages = value);
    this.getLastMsgTimestamp(rid);
    this.streamingRoomMessages(rid);
  }

  streamingRoomMessages(roomId: string){
      this.ws.streamRoomMessages(roomId).subscribe(
        (data) => {
          this.messages.push(data.fields.args[0]);
        },
        (err) => console.log(err),
        () => console.log('Completed')
      );
  }

  bottom() {
    console.log('bottom');
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
      }).subscribe(
        (data) => {
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
    this.ws.sendChatMessage(this.roomID, text).subscribe((data) => console.log('Send message response :' + JSON.stringify(data)));

  }

  getSubscription() {
    return this.ws.getsubscription();
  }

  loadingHistory(roomid: string, olddate: number, msgquantity: number, newdate: number){
    return this.ws.loadhistory(roomid, olddate, msgquantity, newdate);
  }
}
