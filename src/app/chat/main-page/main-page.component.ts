import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PushNotificationsService } from '../../shared/services/push-notifications.service';

@Component({
  selector: 'chat',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit {
  private readonly TIME_TO_REQUEST_PUSH = 5000;
  public channels = [
    { title: 'channel1', privateChannel: true },
    { title: 'channel2' },
    { title: 'kentak', direct: true },
    { title: 'tomer', direct: true }
  ];

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private authenticationService: AuthenticationService,
              private pushService: PushNotificationsService) {
  }

  ngAfterViewInit(): void {
    if (window.outerWidth < 767) {
      this.menuCtrl.open();
    }
    else {
      this.menuCtrl.enable(false);
    }

    setTimeout(() => this.pushService.initPushNotification(), this.TIME_TO_REQUEST_PUSH);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
