import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getClient } from '../graphql/client/apollo-client';
import { AppComponent } from '../app.component';
import { IonicModule } from 'ionic-angular';
import { ApolloModule } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { UnixTimeToStringPipe } from '../../pipes/unix-time-to-string';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  declarations: [UnixTimeToStringPipe]
})
export class SharedModule {}
