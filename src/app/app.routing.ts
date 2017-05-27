import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChannelComponent } from './components/channel/channel.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  {
    path: 'chat', component: ChatComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {
        path: 'channel/:id',
        component: ChannelComponent
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
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
