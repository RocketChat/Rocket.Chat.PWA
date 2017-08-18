import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class SocialLoginService {

  auth0 = new auth0.WebAuth({
    clientID: 'KvhVLOZ6IpWodL6mBVTuUB2RFsw3qlYn',
    domain: 'rcpwa.auth0.com',
    responseType: 'token id_token',
    audience: 'https://rcpwa.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}
