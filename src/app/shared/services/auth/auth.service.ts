import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {DDPService} from "../ddp/ddp-service.service";

@Injectable()
export class AuthService {

  constructor(private ddp: DDPService) {
  }

  login(credentials) {
    return this.ddp.callMethod('login', [credentials]);
  }

  logout() {
    window.localStorage.removeItem('AUTH_TOKEN');
    return this.ddp.callMethod('logout', []);
  }
}



