import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastController } from 'ionic-angular';

@Component({
  moduleId : module.id,
  templateUrl : './login-page.component.html',
  styleUrls : ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    if (this.model.username && this.model.password) {
      try {
        this.loading = true;
        await this.authenticationService.login(this.model.username, this.model.password);
        this.loading = false;
        this.router.navigate([this.returnUrl]);

      } catch (e) {
        const toast = this.toastCtrl.create({
          message : 'Invalid username or password',
          duration : 5000,
          showCloseButton: true,
        });
        toast.present();
      }
    }
  }
}
