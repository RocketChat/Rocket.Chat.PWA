import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/services/auth-guard.service';
import { LoginComponent } from './shared/components/login/login.component';
import { ChatComponent } from './chat/chat/chat.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ChannelComponent } from './chat/channel/channel.component';
import { WelcomePageComponent } from './chat/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
