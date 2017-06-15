import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastController } from 'ionic-angular';
import { LoginPageService } from '../../services/login-page.service';
import { environment } from '../../../../environments/environment';

@Component({
  moduleId: module.id,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  showSpinner = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController,
              private loginService: LoginPageService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const accessToken = this.route.snapshot.queryParams['access_token'];
    const service = this.route.snapshot.queryParams['service'];
    if (accessToken && service) {
      this.showSpinner = true;
      this.loginWithServiceAccessToken(service, accessToken);
    }
  }

  getServiceUrl(service: string): string {
    return environment.server + '/auth/connect/' + service;
  }

  loginWithServiceAccessToken(service, accessToken) {
    this.loginService.loginWithServiceAccessToken(service, accessToken).subscribe(async ({ data }) => {
      const accountsAccessToken = data.loginWithServiceAccessToken.accessToken;
      const accountsRefreshToken = data.loginWithServiceAccessToken.refreshToken;
      try {
        this.loading = true;
        const loggedIn = await this.authenticationService.refreshWithNewTokens(accountsAccessToken, accountsRefreshToken);
        this.loading = false;
        this.showSpinner = false;
        if (loggedIn) {
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.showToast(`Failed to login with ${service}`);
        }
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  async login() {
    if (this.model.username && this.model.password) {
      try {
        this.loading = true;
        await this.authenticationService.login(this.model.username, this.model.password);
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      }
      catch (e) {
        this.showToast('Invalid username or password');
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
