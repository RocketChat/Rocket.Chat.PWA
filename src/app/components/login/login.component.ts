import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastController } from 'ionic-angular';
import { GetChatDummyService } from '../../graphql/get-chat-dummy.service';

@Component({
  moduleId : module.id,
  templateUrl : 'login.component.html',
  styleUrls : ['login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController,
              private chatDummy: GetChatDummyService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.chatDummy.queryChat().subscribe((data) => console.log(data));
  }

  login() {
    if (this.model.username && this.model.password &&
      this.authenticationService.login(this.model.username, this.model.password)) {
      this.router.navigate([this.returnUrl]);
    }
    else {
      const toast = this.toastCtrl.create({
        message : 'Invalid username or password',
        duration : 5000
      });
      toast.present();
    }
  }
}
