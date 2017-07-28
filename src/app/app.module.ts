import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {MdInputModule, MdIconModule, MdSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { WebsocketService} from  './shared/websocket/websocket.service';
import { ValueService} from './shared/valueservice/value.service';
import {AuthgaurdService} from './shared/gaurd/authgaurd.service';
// covalent modules
import {CovalentLayoutModule, CovalentStepsModule} from '@covalent/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule, JsonpModule, MdSnackBarModule,
    CovalentLayoutModule, CovalentStepsModule, MdInputModule, MdIconModule, BrowserAnimationsModule,
  ],
  providers: [WebsocketService, ValueService, AuthgaurdService],
  bootstrap: [AppComponent,]
})
export class AppModule {
  constructor(){

  }
}
