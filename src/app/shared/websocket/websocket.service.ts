import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {Data} from '@angular/router';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class WebsocketService {
  public ws;

  constructor() {
    const ws = Observable.webSocket('wss://demo.rocket.chat/websocket');
  }
  wssocketsubject(): WebSocketSubject<MessageEvent> {
    return this.ws;
  }

}
