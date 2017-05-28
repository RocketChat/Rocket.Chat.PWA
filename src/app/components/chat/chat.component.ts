import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements AfterViewInit {

  public channels = ['channel1', 'channel2', 'kentak', 'tomer'];

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
    this.menuCtrl.open();
  }

  gotoChannel(channelId) {
    this.router.navigate(['channel', channelId], { relativeTo: this.route });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
