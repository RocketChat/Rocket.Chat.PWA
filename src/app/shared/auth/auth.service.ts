import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../websocket/websocket.service';
import {Subject} from 'rxjs/Subject';
// import {Http, Response, Headers, RequestOptions, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import {sha256} from 'sha256';
import {send} from 'q';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class AuthService{
  private user = 'namantesting';
  private password = 'namantesting';
    constructor(private _ws: WebsocketService){
      const subject = _ws.wssocketsubject();
      subject.subscribe(
        (msg) => console.log('message received: ' + JSON.stringify(msg)),
        (err) => console.log(err),
        () => console.log('complete')
      );
      // searching for ping and pong in the response
      const ping = subject.find((data: (any)) => (data.msg === 'ping'));
      const pong = subject.find((data: (any)) => (data.msg === 'pong'));
      const changed = subject.find((data: (any)) => data.msg === 'changed');

      // sending ping for pong and vice versa
      ping.subscribe(() => subject.next('pong'));
      pong.subscribe(() => subject.next('ping'));

      // establishing connection and sending login request
      subject.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));
      subject.next(JSON.stringify({'msg': 'method', 'method': 'login', 'params': [{'user': {'username': this.user}, 'password': this.password}], 'id': '7'}));
    }



  }



