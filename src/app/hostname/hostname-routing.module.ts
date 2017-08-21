import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostnameComponent } from './hostname.component';
const routes: Routes = [
  { path: '', component: HostnameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostnameRoutingModule { }
