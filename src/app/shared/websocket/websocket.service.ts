import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() {
  }
    create() {
          return Observable.webSocket('wss://demo.rocket.chat/websocket');
    }

}
