import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import {AuthService} from './shared/services/auth/auth.service';
import {WebsocketService} from './shared/services/websocket/websocket.service';
import {DDPService} from './shared/services/ddp/ddp-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChannelListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, WebsocketService, DDPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
