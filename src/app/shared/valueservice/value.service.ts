import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  public authenticate: boolean;
  constructor() {
  }
  setVal(val: boolean){
    this.authenticate = val;
  }
  getVal(){
    return this.authenticate;
  }

}
