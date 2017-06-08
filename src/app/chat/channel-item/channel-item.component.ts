import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyChannelsQuery } from '../../graphql/types/types';

@Component({
  selector: 'channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.scss']
})
export class ChannelItemComponent implements OnInit {
  @Input()
  channel: MyChannelsQuery.ChannelsByUser;
  channelSymbol: string;


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  gotoChannel(channelId) {
    if (this.channel.direct) {
      this.router.navigate(['direct', channelId]);
    } else {
      this.router.navigate(['channel', channelId]);
    }
  }

  ngOnInit(): void {
    if (this.channel.direct) {
      this.channelSymbol = 'at';
    }
    else if (this.channel.privateChannel) {
      this.channelSymbol = 'lock';
    }
    else {
      this.channelSymbol = 'hashtag';
    }
  }

  exitChannel() {

  }

  hideChannel() {

  }

}
