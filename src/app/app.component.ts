import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WebsocketService} from './shared/websocket/websocket.service';
import {Router} from '@angular/router';
import {ValueService} from './shared/valueservice/value.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Rocket.Chat PWA has been initialised';

  constructor(private _ws: WebsocketService, public router: Router, public snackBar:MdSnackBar , public authval: ValueService) {

  }

  ngOnInit(){
    if (localStorage.getItem('auth-token') !== null && localStorage.getItem('hostname') !== null){
        this.authval.setVal(true);
        this._ws.connectToHostname(localStorage.getItem('hostname'));
        this._ws.resumeLogin(localStorage.getItem('auth-token')).subscribe((data) => {
          if (data === 'Success'){
            console.log('Succefully captured token');
            this.router.navigate(['/app']);
          }
        });
    }else {
      this.authval.setVal(false);
      localStorage.clear();
    }
  }

}

