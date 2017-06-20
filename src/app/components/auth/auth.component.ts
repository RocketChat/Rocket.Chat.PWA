import { Component, OnInit } from '@angular/core';
import * as sha256 from 'js-sha256';
import {LoginUser} from '../../shared/models/login-user.model';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model = new LoginUser('', '');

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  loginClicked() {
    this.authService.login({
      user: {
        email: this.model.username
      },
      password: {
        digest: sha256(this.model.password),
        algorithm: 'sha-256'
      }
    }).subscribe((result) => console.log(result));
  }

}
