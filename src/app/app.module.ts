import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';

// covalent modules
import {CovalentLayoutModule, CovalentStepsModule} from '@covalent/core';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChannelListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, JsonpModule,
    CovalentLayoutModule, CovalentStepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
