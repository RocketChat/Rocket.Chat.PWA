import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { ChannelViewComponent } from './channel-view/channel-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule
  ],
  declarations: [
    MainPageComponent,
    ChannelViewComponent,
    WelcomePageComponent,
    ChatMessageComponent,
  ]
})
export class ChatModule { }
