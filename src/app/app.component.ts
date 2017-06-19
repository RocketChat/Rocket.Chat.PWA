import { Component} from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {OtherService} from './shared/other/other.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rocket.Chat PWA has been initialised';
  constructor( private _test: OtherService){

  }
}

