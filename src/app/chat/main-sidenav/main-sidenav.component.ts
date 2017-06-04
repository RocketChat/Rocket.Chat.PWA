import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainSidenavComponent {
  public user = {username: 'Eitan frailich',
                avatar: 'http://dreamicus.com/data/face/face-01.jpg'};
  public channels = [
    {title : 'channel1', privateChannel : true},
    {title : 'channel2'},
    {title : 'kentak', direct : true},
    {title : 'tomer', direct : true}
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {}


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
