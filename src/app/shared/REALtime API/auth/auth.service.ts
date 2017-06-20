import {Injectable} from '@angular/core';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../../websocket/websocket.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class AuthService {
  private user = 'namantesting';
  private password = 'namantesting';
  public subject$;
  private _id = '';

  constructor(private _ws: WebsocketService) {
    this.subject$ = this._ws.create();
    this.subject$.subscribe(
      (data) => console.log('Data recieved = ' + JSON.stringify(data)),
      (err) => console.log('Error ' + err),
      () => console.log('Completed')
    );

    const ping = this.subject$.find((data: (any)) => (data.msg === 'ping'));
    const pong = this.subject$.find((data: (any)) => (data.msg === 'pong'));
    const changed = this.subject$.find((data: (any)) => data.msg === 'changed');
    const token = this.subject$.find((data: (any)) => data.msg === 'result');
    this.subject$.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));


    ping.subscribe(() => this.subject$.next('pong'));
    pong.subscribe(() => this.subject$.next('ping'));

    token.subscribe((data) => {
      localStorage.setItem(data.result.id, data.result.token);
      this._id = data.result.id;
      this.logOut();
    });
    this.login();
  }
  login(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'login',
      'params': [{'user': {'username': this.user}, 'password': this.password}],
      'id': '7'
    }));
    console.log('in login' + this._id);
  }
  logOut() {
    if (localStorage.getItem(this._id) == null) {

    }else {
      console.log('yo' + this._id);
      localStorage.removeItem(this._id);

    }


  }


}



