import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChannelViewComponent } from './components/channel-view/channel-view.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  {
    path: 'chat', component: ChatPageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {
        path: 'channel/:id',
        component: ChannelViewComponent
      },
      {
        path: 'welcome-page',
        component: WelcomePageComponent
      },
      {
        path: '',
        redirectTo: 'welcome-page',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
