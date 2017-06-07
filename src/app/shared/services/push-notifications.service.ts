import { Injectable } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';

const FAKE_KEY = 'BCbCS1iuPOu9PjalqMC3QlnrKAy483SBaEcf0_ALu_jR4xX0F5Bhea3K5m17Wa__ymzLU_5IUf58IkJL7WxMwDk';
@Injectable()
export class PushNotificationsService {

  constructor(private serviceWorker: NgServiceWorker){}

  initPushNotification(){
    this.serviceWorker.registerForPush({
      applicationServerKey: FAKE_KEY,
    }).subscribe((pushRegistration) => {
      console.log(pushRegistration);
      // Send the key to the server
    });
  }

  getPushMessages(){
    this.serviceWorker.push.subscribe(msg => {
        console.log('push msg', msg);
      }
    );
  }

}
