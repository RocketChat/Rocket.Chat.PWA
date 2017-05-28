import { AfterViewInit, Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'chat',
  templateUrl: './chat-page.component.html',
  styleUrls: ['chat-page.component.scss'],
})
export class ChatPageComponent implements AfterViewInit {

  public channels = [
    { title: 'channel1', privateChannel: true },
    { title: 'channel2' },
    { title: 'kentak', direct: true },
    { title: 'tomer', direct: true }
  ];

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
