import {Component, OnInit, ViewChild} from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MdDialog, MdDialogRef} from '@angular/material';
import {CreatechannelService} from '../shared/createchannelservice/createchannel.service';
import {CreatechannelComponent} from '../layout/chat/createchannel/createchannel.component';
import {WebsocketService} from '../shared/websocket/websocket.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('channellist') channellistDOM;
  public messages: Object[] = [];
  selectedOption: string;
  public result: any;
  channellist: any;
  constructor(public media: ObservableMedia, private createchanneldialogue: CreatechannelService, private ws: WebsocketService, private snackBar: MdSnackBar) {

    this.getChannels(0);
  }
  openDialog() {
    this.createchanneldialogue.confirm().subscribe(res => this.result = res);
  }
  foo() {
    console.log('Foo clicked');
  }
  ngOnInit() {
  }

  getChannels(time: number){
    this.ws.listChannels(time).subscribe(
      (data) => {
        if(data === 'error')
        {
          this.snackBar.open('Error Occured ! Try Again','Ok',{
            duration: 2000
          });
        } else {
          for (let i in data){
            if(data[i].t === 'c') {
              this.channellistDOM.nativeElement = data[i].name;
            }
          }
            console.log('Loging result' + JSON.stringify(data[0]));
        }
      },
      (err) => console.error('Error occured in fetching room list'),
      () => console.log('Fetching list had been completed')
    );
  }

}
