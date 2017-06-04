import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { MainPageComponent } from './main-page/main-page.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

const routes: Routes = [{
  path : 'main', component : MainPageComponent, canActivate : [AuthGuard], canActivateChild : [AuthGuard],
  children : [
    {
      path : 'channel/:id',
      component : ChatViewComponent
    },
    {
      path : 'direct/:id',
      component : ChatViewComponent
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
