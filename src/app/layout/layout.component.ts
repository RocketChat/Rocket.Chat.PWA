import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public media: ObservableMedia) { }
  foo(){
    console.log('Foo clicked');
  }
  ngOnInit() {
  }

}
