import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getClient } from '../graphql/client/apollo-client';
import { AppComponent } from '../app.component';
import { IonicModule } from 'ionic-angular';
import { ApolloModule } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { UnixTimeToStringPipe } from '../../pipes/unix-time-to-string';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PushNotificationsService } from './services/push-notifications.service';
import { UserDataService } from './services/user-data/user-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServiceWorkerModule,
    IonicModule.forRoot(AppComponent, { mode: 'md' }),
    ApolloModule.forRoot(getClient),
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApolloModule,
    UnixTimeToStringPipe
  ],
  declarations: [UnixTimeToStringPipe],
  providers: [PushNotificationsService, UserDataService],
})
export class SharedModule {}
