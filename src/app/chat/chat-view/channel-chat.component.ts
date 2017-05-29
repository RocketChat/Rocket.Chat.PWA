import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-chat',
  templateUrl: './channel-chat.component.html',
  styleUrls: ['./channel-chat.component.scss'],
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel;
  private routeParamsSub;
  public model = { message: undefined };
  public messages = [
    {
      content: 'kentak is pitushky',
      creationTime: new Date().getTime() - (Math.random() * 100000000),
      avatar: 'http://dreamicus.com/data/face/face-01.jpg',
      user: { name: 'GushBasar' }
    },
    {
      content: 'kentak is kentak',
      creationTime: new Date().getTime() - (Math.random() * 100000000),
      avatar: 'http://dreamicus.com/data/face/face-01.jpg',
      user: { name: 'GushBasar' }
    },
    {
      content: 'fried chicken is kentak',
      creationTime: new Date().getTime() - (Math.random() * 100000000),
      avatar: 'http://dreamicus.com/data/face/face-01.jpg',
      user: { name: 'GushBasar' }
    }
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => this.channel = params['id']);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  ionViewDidEnter() {
    this.chatContent.scrollToBottom(300);
  }

  sendMessage() {
    if (this.model.message) {
      this.messages.push({
        content: this.model.message,
        creationTime: new Date().getTime(),
        user: { name: 'GushBasar' },
        avatar: 'http://dreamicus.com/data/face/face-01.jpg'
      });
      this.model.message = undefined;
      setTimeout(() => {
        this.chatContent.scrollToBottom(300);
      });
    }
  }
}
