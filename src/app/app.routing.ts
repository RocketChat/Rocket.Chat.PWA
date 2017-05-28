import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './chat/chat/chat.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChannelComponent } from './chat/channel/channel.component';
import { WelcomePageComponent } from './chat/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
