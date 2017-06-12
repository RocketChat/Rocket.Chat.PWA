import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
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
    constructor(){
      const subject = Observable.webSocket('wss://demo.rocket.chat/websocket');
      subject
        .subscribe(
          (msg) => console.log('message received: ' + JSON.stringify(msg)),
          (err) => console.log(err),
          () => console.log('complete')
        );
      subject.forEach(function (e) {
        const data = JSON.stringify(e);
        console.log('Recieved ' + JSON.stringify(e));
        if (data === 'ping'){
          subject.next('pong');
        }
        else if (data === 'pong')
        {
          subject.next('ping');
        }
      });
      subject.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));

      subject.next(JSON.stringify({'msg': 'method', 'method': 'login', 'params': [{'user': {'username': this.user}, 'password': this.password}], 'id': '7'}));
    }



  }



