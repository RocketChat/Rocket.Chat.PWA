import { AfterViewInit, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import 'rxjs/add/operator/switchMap';
import { PageTitleService } from './page-title.service';

@Component({
  selector : 'chat',
  templateUrl : './main-page.component.html',
  styleUrls : ['./main-page.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MainPageComponent implements AfterViewInit {

  public channels = [
    {title : 'channel1', privateChannel : true},
    {title : 'channel2'},
    {title : 'kentak', direct : true},
    {title : 'tomer', direct : true}
  ];

  constructor(private menuCtrl: MenuController,
              private pageTitle: PageTitleService,
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

