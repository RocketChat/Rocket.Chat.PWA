import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import {
  MdCardModule, MdInputModule, MdButtonModule, MdIconModule, MdIconRegistry,
  MdSnackBarModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FlexLayoutModule, } from '@angular/flex-layout'
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    MdCardModule, MdInputModule,
    MdButtonModule, MdIconModule,
    FlexLayoutModule, MdSnackBarModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/facebook.svg'))
      .addSvgIcon('twitter',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/twitter.svg'))
      .addSvgIcon('github',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/github.svg'))
      .addSvgIcon('meteor',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/meteor.svg'))
      .addSvgIcon('google-plus',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/google-plus.svg'))
      .addSvgIcon('linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/linkedin.svg'))
      .addSvgIcon('gitlab',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/gitlab.svg'));

  }
}
