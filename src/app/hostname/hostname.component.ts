import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../shared/websocket/websocket.service';
import { RealTimeAPI } from "rocket.chat.realtime.api.rxjs";
@Component({
  selector: 'app-hostname',
  templateUrl: './hostname.component.html',
  styleUrls: ['./hostname.component.css']
})
export class HostnameComponent implements OnInit {

  constructor(private _ws: WebsocketService) { }

  ngOnInit() {
  }
  loadhostname(url: string){
    let wsurl: string;
    wsurl = 'wss://' + url + '/websocket';
    this._ws.connectToHostname(wsurl);
    console.log(wsurl);
  }
}
