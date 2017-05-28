import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'chat',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit {

  public channels = ['channel1', 'channel2', 'kentak', 'tomer'];

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
    this.menuCtrl.open();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
