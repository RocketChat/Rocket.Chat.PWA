import { Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RealTimeAPI} from './class';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rocket.Chat PWA has been initialised';

  constructor( ) {

     const realTimeApi =  new RealTimeAPI('wss://demo.rocket.chat/websocket');
     realTimeApi.connectToServer();
    realTimeApi.keepAlive();
    const track = realTimeApi.getSubscription('stream-notify-all', 'updateAvatar', false);
    const auth = realTimeApi.login('namantesting', 'namantesting');
    track.subscribe((data) => console.log(JSON.stringify(data)),
      (err) => console.log(err),
      () => console.log('completed'));
  }


}

