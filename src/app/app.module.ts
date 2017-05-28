import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChannelComponent } from './components/channel/channel.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ApolloModule } from 'apollo-angular';
import { getClient } from './graphql/client/apollo-client';
import { GetChatDummyService } from './graphql/get-chat-dummy.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    PageNotFoundComponent,
    ChannelComponent,
    WelcomePageComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent),
    ApolloModule.forRoot(getClient),
    AppRouting,
  ],
  providers: [AuthGuard, AuthenticationService, GetChatDummyService],
  bootstrap: [IonicApp]
})
export class AppModule { }
