import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector : 'chat',
  templateUrl : './main-page.component.html',
  styleUrls : ['./main-page.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit, OnInit {

  public channels = [
    {title : 'channel1', privateChannel : true},
    {title : 'channel2'},
    {title : 'kentak', direct : true},
    {title : 'tomer', direct : true}
  ];

  private title = 'hello';
  constructor(private menuCtrl: MenuController,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(x=>console.log('url',x));
    // this.route.params.subscribe(x=>console.log('parmas',x));
    // this.route.fragment.subscribe(x=>console.log('frag',x));
    this.route.firstChild.url.subscribe(x => {
      console.log('first', x.map(x=>x.path));
      console.log(this.route);
    });

    console.log(this.route.children);
  }

  ngAfterViewInit(): void {
    this.menuCtrl.open();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
