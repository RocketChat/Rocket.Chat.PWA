import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApolloModule } from 'apollo-angular';
import { getClient } from './graphql/client/apollo-client';
import { GetChatDummyService } from './graphql/get-chat-dummy.service';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ChatModule,
    AppRouting,
  ],
  providers: [AuthGuard, AuthenticationService, GetChatDummyService],
  bootstrap: [IonicApp]
})
export class AppModule { }
