import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { ChannelItemComponent } from './channel-item/channel-item.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';
import { ChannelsService } from './services/channels/channels.service';
import { ChatService } from './services/chat/chat.service';
import { ChannelNotFoundComponent } from './channel-not-found/channel-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule,
  ],
  declarations: [
    MainPageComponent,
    ChatViewComponent,
    WelcomePageComponent,
    ChatMessageComponent,
    ChannelItemComponent,
    MainSidenavComponent,
    ChannelNotFoundComponent,
  ],
  providers: [
    ChannelsService,
    ChatService,
  ],
})
export class ChatModule {
}
