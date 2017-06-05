import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent {
  items: number[];

  constructor() {
    this.items= [1, 2, 3, 4];
  }

}
