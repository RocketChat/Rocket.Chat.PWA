import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserFields } from '../../graphql/types/types';
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

  public user: UserFields.Fragment;
  public channels: Observable<any>;
  public channelsNum: number;
  public directChannels: Observable<any>;
  public directChannelsNum: number;

  constructor(private router: Router,
              private cd: ChangeDetectorRef,
              private authenticationService: AuthenticationService,
              private myChannelService: ChannelsService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUser();

    this.directChannels = this.myChannelService.getMyChannels()
      .map(result => result.data.channelsByUser.filter(channel => channel.direct))
      .do(channels => this.directChannelsNum = channels.length);

    this.channels = this.myChannelService.getMyChannels()
      .map(result => result.data.channelsByUser.filter(channel => !channel.direct))
      .do(channels => this.channelsNum = channels.length);

  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
