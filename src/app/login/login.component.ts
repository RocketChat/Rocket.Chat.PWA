import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../shared/websocket/websocket.service';
import {Observable} from "rxjs/Observable";
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginObs;
  private channelObs;
  constructor(private _ws: WebsocketService, private router: Router, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }
  logIn(username: string, password: string) {
    console.log(username, password);
    this.loginObs = this._ws.alternateLogin(username, password).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open(data, 'Ok' ,{
          duration: 2000
        });
        if(data === 'Logging In..') {
          this.router.navigate(['/app']);
        }
      },
      (err) => console.error(err),
      () => console.log('Login completed')
    );
  }

  getChannels(time: number) {
    this.channelObs = this._ws.listChannels(time).subscribe(
      (data) => console.log(data),
      (err) => console.error(err),
      () => console.log('completed fetching channels')
    );
  }
}

