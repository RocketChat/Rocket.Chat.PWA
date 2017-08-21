import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket/websocket.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _ws: WebsocketService, private snackBar: MdSnackBar, private router: Router) { }

  ngOnInit() {
  }


  registerUser(name: string, email: string, username: string, passwordone: string, passwordtwo: string) {
    this._ws.signUp(name, email, username, passwordone, passwordtwo).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open(data, 'Ok', {
          duration: 2000
        });
        this.router.navigate(['/login']);

      },
      (err) => console.log(err),
      () => {
        console.log('Completed');
      }
    );
  }
}
