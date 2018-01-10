import { Component, Input } from '@angular/core';

import { Message } from '../../graphql/types/types';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() message: Message;
}
