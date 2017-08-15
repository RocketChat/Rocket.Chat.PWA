import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { getApolloClient } from '../graphql/client/apollo-client';
import { AppComponent } from '../app.component';
import { IonicModule } from 'ionic-angular';
import { ApolloModule } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { UnixTimeToStringPipe } from '../../pipes/unix-time-to-string';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PushNotificationsService } from './services/push-notifications.service';
import { DefaultAvatarPipe } from './pipes/default-avatar/default-avatar.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule,
    IonicModule.forRoot(AppComponent, { mode: 'md' }),
    ApolloModule.forRoot(getApolloClient),
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApolloModule,
    UnixTimeToStringPipe,
    DefaultAvatarPipe
  ],
  declarations: [UnixTimeToStringPipe, DefaultAvatarPipe],
  providers: [PushNotificationsService, LoginPageService],
})
export class SharedModule {
}
