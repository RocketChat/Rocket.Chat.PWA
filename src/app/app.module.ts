import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {MdInputModule, MdIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { WebsocketService} from  './shared/websocket/websocket.service';
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
    HttpModule, JsonpModule,
    CovalentLayoutModule, CovalentStepsModule, MdInputModule, MdIconModule, BrowserAnimationsModule,
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent,]
})
export class AppModule {
  constructor(){

  }
}
