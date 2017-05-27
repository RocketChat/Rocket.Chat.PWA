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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    PageNotFoundComponent,
    ChannelComponent,
    WelcomePageComponent,
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [IonicApp]
})
export class AppModule { }
