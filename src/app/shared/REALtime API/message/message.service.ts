import { Injectable } from '@angular/core';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../../websocket/websocket.service';
import 'rxjs/add/operator/map';
import {jitStatements} from '@angular/compiler/src/output/output_jit';
@Injectable()
export class MessageService {
  public subject$;
  constructor(private _ws: WebsocketService) {
    this.subject$ = this._ws.create();
    this.subject$.subscribe(
      (data) => console.log('Data recieved = ' + JSON.stringify(data)),
      (err) => console.log('Error ' + err),
      () => console.log('Completed')
    );

    const ping = this.subject$.find((data: (any)) => (data.msg === 'ping'));
    const pong = this.subject$.find((data: (any)) => (data.msg === 'pong'));
    const changed = this.subject$.find((data: (any)) => data.msg === 'changed');
    const token = this.subject$.find((data: (any)) => data.msg === 'result');
    this.subject$.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));


    ping.subscribe(() => this.subject$.next('pong'));
    pong.subscribe(() => this.subject$.next('ping'));
  }
  sendMessage(){
    this.subject$.next(JSON.stringify(
      {
        'msg': 'method',
        'method': 'sendMessage',
        'id': '42',
        'params': [
          {
            '_id': 'message-id',
            'rid': 'room-id',
            'msg': 'Hello World!'
          }
        ]
      }
    ));
  }
  sendFile() {
    this.firstRequest();
    this.secondRequest();
  }
  firstRequest(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'slingshot/uploadRequest',
      'id': '42',
      'params': [
        'rocketchat-uploads', // no ideia
        {
          'name': 'filename.extension',
          'size': 15664,
          'type': 'mime-type'
        },
        { 'rid': 'room-id' }
      ]
    }));
  }
  secondRequest(){
    this.subject$.next(JSON.stringify({
      'msg' : 'method',
      'method' : 'sendFileMessage',
      'id' : '42',
      'params' : [
      'room-id',
      'storage-service-type', // example: s3
      {
        'type': 'mime-type',
        'size': 15664,
        'name': 'filename.extension',
        '_id': 'file-id', // file id depends on the storage service (may be the last element on the file uri)
        'url': 'file-uri'
      }
    ]
    }));
  }
  deleteMessage(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'deleteMessage',
      'id': '42',
      'params': [ { '_id': 'message_id' } ]
    }));
  }
    updateMesage(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'updateMessage',
      'id': '42',
      'params': [ 'messageObject' ]
    }));
    }
    pinMessage(){
      this.subject$.next(JSON.stringify({
        'msg': 'method',
          'method': 'pinMessage',
          'id': '19',
          'params': [ 'fullMessageObject' ]
      }));
    }
    unpinMessage(){
      this.subject$.next(JSON.stringify({
        'msg': 'method',
        'method': 'unpinMessage',
        'id': '20',
        'params': [ 'fullMessageObject' ]
      }));
    }
    starMessage(){
      this.subject$.next(JSON.stringify({
        'msg': 'method',
        'method': 'starMessage',
        'id': '21',
        'params': [{
          '_id': 'sBYLyaHFkMdr7LKGt',
          'rid': 'QFtTnPJ4XbG634Skm',
          'starred': true || false
        }]
      }));
    }
}
