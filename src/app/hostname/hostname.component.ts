import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket/websocket.service';
import { RealTimeAPI } from 'rocket.chat.realtime.api.rxjs';
import { ValueService } from '../shared/valueservice/value.service';
@Component({
  selector: 'app-hostname',
  templateUrl: './hostname.component.html',
  styleUrls: ['./hostname.component.css']
})
export class HostnameComponent implements OnInit {
  public authenticated: boolean;
  constructor(private _ws: WebsocketService, public authval: ValueService) {
  }

  ngOnInit() {
    this.authenticated = this.authval.getVal();
  }

  loadhostname(url: string) {
    this._ws.connectToHostname(url);
    console.log(url);
  }
}
