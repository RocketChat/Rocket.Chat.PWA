import { Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  
  constructor(private _http:Http) { }

 getInfo(){
   return this._http.get("http://localhost:3000/api/v1/info")
                    .map((res:Response) => res.json());

 }

}
