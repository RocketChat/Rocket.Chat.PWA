import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastController } from 'ionic-angular';
import { environment } from '../../../../environments/environment';
import { OauthProvider } from '../../../graphql/types/types';

@Component({
  moduleId: module.id,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  model: any = {};
  providers: Observable<OauthProvider[]>;
  loading = false;
  returnUrl: string;
  showSpinner = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    // available providers
    this.providers = this.authenticationService.availableProviders();

    // params
    const params = this.route.snapshot.queryParamMap;

    this.returnUrl = params.has('returnUrl') ? params.get('returnUrl') : '/';
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const service = params.get('service');
    const error = params.get('error');

    if (accessToken && refreshToken && service) {
      this.showSpinner = true;
      this.handleAccessToken(service, accessToken, refreshToken);
    }

    if (error && service) {
      this.handleError(service, error);
    }
  }

  getServiceClass(service: string): string {
    return service + '-login';
  }

  getServiceUrl(service: string): string {
    return environment.server + '/_oauth_apps/connect/' + service + '/pwa';
  }

  handleError(service: string, error: string): void {
    console.error(`Login with ${service} failed`, error);
    this.showToast(`Failed to login with ${service}`);
  }

  async handleAccessToken(service, accessToken, refreshToken) {
    try {
      this.loading = true;
      const loggedIn = await this.authenticationService.refreshWithNewTokens(accessToken, refreshToken);

      if (loggedIn) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.showToast(`Failed to login with ${service}`);
      }
    } catch (e) {
      console.error(`Login with ${service} failed`, e);
    } finally {
      this.loading = false;
      this.showSpinner = false;
    }
  }

  async login() {
    if (this.model.username && this.model.password) {
      try {
        this.loading = true;
        await this.authenticationService.login(this.model.username, this.model.password);
        this.router.navigate([this.returnUrl]);
      }
      catch (e) {
        console.error('Login failed', e);
        this.showToast('Invalid username or password');
      }
      finally {
        this.loading = false;
      }
    }
  }

  showToast(message: string, duration: number = 5000) {
    const toast = this.toastCtrl.create({
      message,
      duration,
      showCloseButton: true,
    });
    toast.present();
  }
}
