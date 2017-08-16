import {Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, QueryList} from '@angular/core';
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
import {NgxAutoScroll} from "ngx-auto-scroll/lib/ngx-auto-scroll.directive";

import {ReversePipe} from './reversepipe';
import {RoomObject} from '../shared/roomobject/roomobject';

import 'rxjs/Rx';
import {observable} from 'rxjs/symbol/observable';
import {Subject} from "rxjs/Subject";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [],

})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('latestDate') latestDate;
  @ViewChild('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  public roomID: any;

  public tempArray: Array<any>;
  public rawChannelArray$: Observable<any>;
  public selectedOption: string;
  public result: any
  public channellist$: Observable<any>;
  public newChannelList$ :Subject<any>;
  public messages$: Observable<any>;
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




*/this.streamingRoomMessages(localStorage.getItem('room-id')).subscribe(
      (data) => console.log('room-message' + JSON.stringify(data)),
      (err) => console.log(err),
      () => console.log('Completed')
    );

    this.ws.streamnotifyUser('message')
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => console.log('Completed'));
  }


  ngOnInit() {

  }
  ngAfterViewInit() {
    // this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = (): void => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
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
    this.messages$ = this.loadingHistory(rid, null , 50, Number(localStorage.getItem('ts')));
    this.getLastMsgTimestamp(rid);
    console.log('rid' + rid);
    localStorage.setItem('room-id', rid);

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
    this.ws.sendChatMessage(this.roomID, text).subscribe((data) => console.log('Send message response :' + JSON.stringify(data)));

  }

  getSubscription() {
    return this.ws.getsubscription();
  }
  streamingRoomMessages(roomId: string){
      return this.ws.streamRoomMessages(roomId).share();
  }
  loadingHistory(roomid: string, olddate: number, msgquantity: number, newdate: number){
    return this.ws.loadhistory(roomid, olddate, msgquantity, newdate);
  }
}
