import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {

  @Input()
  message: any;

  constructor() {}
}
