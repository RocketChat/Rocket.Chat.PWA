import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getClient } from '../graphql/client/apollo-client';
import { AppComponent } from '../app.component';
import { IonicModule } from 'ionic-angular';
import { ApolloModule } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data/user-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(AppComponent),
    ApolloModule.forRoot(getClient),
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApolloModule
  ],
  providers: [UserDataService],
  declarations: []
})
export class SharedModule { }
