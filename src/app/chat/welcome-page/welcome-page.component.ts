import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../main-page/page-title.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent implements OnInit {

  constructor(private titleSetter: PageTitleService) {
  }

  ngOnInit() {
    this.titleSetter.title = 'Welcome';
  }

}
