import {Injectable} from '@angular/core';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../websocket/websocket.service';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  private user = 'namantesting';
  private password = 'namantesting';

  constructor(private _ws: WebsocketService) {
    const subject$ = this._ws.create();
    subject$.subscribe(
      (data) => console.log('Data recieved = ' + JSON.stringify(data)),
      (err) => console.log('Error ' + err),
      () => console.log('Completed')
    );
    const ping = subject$.find((data: (any)) => (data.msg === 'ping'));
    const pong = subject$.find((data: (any)) => (data.msg === 'pong'));
    const changed = subject$.find((data: (any)) => data.msg === 'changed');

    subject$.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));

    subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'login',
      'params': [{'user': {'username': this.user}, 'password': this.password}],
      'id': '7'
    }));
    ping.subscribe(() => subject$.next('pong'));
    pong.subscribe(() => subject$.next('ping'));
  }
}



