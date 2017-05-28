import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
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
