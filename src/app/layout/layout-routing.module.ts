import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {CreatechannelComponent} from  './chat/createchannel/createchannel.component';
import {buildPath} from "selenium-webdriver/http";
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'chat', loadChildren: './chat/chat.module#ChatModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
