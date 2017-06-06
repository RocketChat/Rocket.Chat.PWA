import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserDataService } from '../../shared/services/user-data/user-data.service';
import { UserDataQuery } from '../../graphql/types/types';
import { ChannelsService } from '../services/channels/channels.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidenavComponent implements OnInit {

  public user: UserDataQuery.Me;
  public channels: Observable<any>;
  public channelsNum: number;
  public directChannels: Observable<any>;
  public directChannelsNum: number;

  constructor(private router: Router,
              private cd: ChangeDetectorRef,
              private authenticationService: AuthenticationService,
              private userData: UserDataService,
              private myChannelService: ChannelsService) {}

  ngOnInit(): void {
    this.userData.getUserData().subscribe((result) => {
      this.user = result.data.me;
      this.cd.markForCheck();
    });

    this.directChannels = this.myChannelService.getMyChannels()
      .map(result => result.data.channelsByUser.filter(channel => channel.direct))
      .do(channels => this.directChannelsNum = channels.length);

    this.channels = this.myChannelService.getMyChannels()
      .map(result => result.data.channelsByUser.filter(channel => !channel.direct))
      .do(channels => this.channelsNum = channels.length);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
