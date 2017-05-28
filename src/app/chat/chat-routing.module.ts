import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ChannelComponent } from './channel/channel.component';
import { AuthGuard } from '../services/auth-guard.service';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [{
  path : 'main', component : MainContainerComponent, canActivate : [AuthGuard], canActivateChild : [AuthGuard],
  children : [
    {
      path : 'channel/:id',
      component : ChannelComponent
    },
    {
      path : 'welcome',
      component : WelcomePageComponent
    },
    {
      path : '',
      redirectTo : 'welcome',
      pathMatch : 'full'
    }
  ]
}, ];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class ChatRoutingModule {
}
