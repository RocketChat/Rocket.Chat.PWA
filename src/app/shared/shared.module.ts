import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { ApolloModule } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { getApolloClient } from '../graphql/client/apollo-client';
import { AppComponent } from '../app.component';
import { UnixTimeToStringPipe } from './pipes/unix-time-to-string/unix-time-to-string.pipe';
import { DefaultAvatarPipe } from './pipes/default-avatar/default-avatar.pipe';
import { PushNotificationsService } from './services/push-notifications.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ServiceWorkerModule,
    IonicModule.forRoot(AppComponent, { mode: 'md' }),
    ApolloModule.forRoot(getApolloClient),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ApolloModule,
    UnixTimeToStringPipe,
    DefaultAvatarPipe
  ],
  declarations: [UnixTimeToStringPipe, DefaultAvatarPipe],
  providers: [PushNotificationsService],
})
export class SharedModule {
}
