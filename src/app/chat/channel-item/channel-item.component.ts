import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MyChannels } from '../../graphql/types/types';

@Component({
  selector : 'app-channel-item',
  templateUrl : './channel-item.component.html',
  styleUrls : ['./channel-item.component.scss']
})
export class ChannelItemComponent implements OnInit {
  @Output() onClick = new EventEmitter<MyChannels.ChannelsByUser>();
  @Input() channel: MyChannels.ChannelsByUser;

  channelSymbol: string;

  constructor(private router: Router) {}

  gotoChannel(channelName: string) {
    if (channelName) {
      if (this.channel.direct) {
        this.router.navigate(['direct', channelName]);
      } else {
        this.router.navigate(['channel', channelName]);
      }
    }
  }

  channelPress() {
    this.onClick.emit(this.channel);
    this.gotoChannel(this.channel.name);
  }

  ngOnInit(): void {
    if (this.channel.direct) {
      this.channelSymbol = 'at';
    } else if (this.channel.privateChannel) {
      this.channelSymbol = 'lock';
    } else {
      this.channelSymbol = 'hashtag';
    }
  }

  exitChannel() {

  }

  hideChannel() {

  }

}
