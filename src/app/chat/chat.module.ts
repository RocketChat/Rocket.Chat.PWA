import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ChannelComponent } from './channel/channel.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule
  ],
  declarations: [
    MainContainerComponent,
    ChannelComponent,
    WelcomePageComponent,
    ChatMessageComponent,
  ]
})
export class ChatModule { }
