import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'chat',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit {
  public channels = [
    { title: 'channel1', privateChannel: true },
    { title: 'channel2' },
    { title: 'kentak', direct: true },
    { title: 'tomer', direct: true }
  ];

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
    if (window.outerWidth < 767) {
      this.menuCtrl.open();
    }
    else {
      this.menuCtrl.enable(false);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
