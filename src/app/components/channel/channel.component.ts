import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {

  public channel;
  private routeParamsSub;
  public model = {message: undefined};
  public messages = [
    { content: 'asasdasda', createdAt: '8:30AM' },
    { content: 'aksjaksjndaksjnd', createdAt: '12:35PM' },
    { content: 'sdfsdfsdf', createdAt: '4:20PM' }
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => this.channel = params['id']);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  sendMessage() {
    if (this.model.message) {
      this.messages.push({content: this.model.message, createdAt: new Date().toString()});
      this.model.message = undefined;
    }
  }
}
