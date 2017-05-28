import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChannelViewComponent } from './components/channel-view/channel-view.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
import { ApolloModule } from 'apollo-angular';
import { getClient } from './graphql/client/apollo-client';
import { GetChatDummyService } from './graphql/get-chat-dummy.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChatPageComponent,
    PageNotFoundComponent,
    ChannelViewComponent,
    WelcomePageComponent,
    ChatMessageComponent,
    ChannelItemComponent,
  ],
  imports: [
    IonicModule.forRoot(AppComponent, { mode: 'md' }),
    ApolloModule.forRoot(getClient),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
  ],
  providers: [AuthGuard, AuthenticationService, GetChatDummyService],
  bootstrap: [IonicApp]
})
export class AppModule {
}
