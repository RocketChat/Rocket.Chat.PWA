import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable()
export class AuthgaurdService implements CanActivate {

  constructor() { }
  canActivate(){
    if(localStorage.getItem('auth-token') !== null && localStorage.getItem('hostname') !== null){
      return true;
    }
  }

}
