import { Injectable } from '@angular/core';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../../websocket/websocket.service';
import 'rxjs/add/operator/map';
import {jitStatements} from '@angular/compiler/src/output/output_jit';
import {jsonpFactory} from '@angular/http/src/http_module';
@Injectable()
export class RoomService {
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
loadHistory(){
    this.subject$.next_(JSON.stringify(
      {
        'msg': 'method',
        'method': 'loadHistory',
        'id': '42',
        'params': [ 'room-id', { '$date': 1480377205 }, 50, { '$date': 1480377601 } ]
      }
    ));
}
getRoomRoles(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'getRoomRoles',
    'id': '42',
    'params': [ 'room-id' ]
  }));
}
getRooms(){
  JSON.stringify({
    'msg': 'method',
    'method': 'rooms/get',
    'id': '42',
    'params': [ { '$date': 1480377601 } ]
  });
}
notifyRoomStream(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'UserPresence:away',
    'id': '42',
    'params': []
  }));
}
createChannel(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'createChannel',
    'id': '85',
    'params': [
      'channel-name',
      ['array-of-usernames', 'who-are-in-the-channel'],
      'true / false'
    ]
  }));
}
createPrivateGroup(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'createPrivateGroup',
    'id': '89',
    'params': [
    'channel-name',
    ['array-of-usernames', 'who-are-in-the-channel']
  ]
  }));
}
deleteRoom(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'eraseRoom',
    'id': '92',
    'params': [
      'roomId'
    ]
  }));
}
archiveRooms(){
  this.subject$.next(JSON.stringify({
    'msg': 'method',
    'method': 'archiveRoom',
    'id': '97',
    'params': [
      'roomId'
    ]
  }));
}
  unarchiveRooms(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'unarchiveRoom',
      'id': '97',
      'params': [
        'roomId'
      ]
    }));
  }
  joinRoom(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'joinRoom',
      'id': '99',
      'params': [
        'roomId',
        'joinCode'
      ]
    }));
  }
  leavingRoom(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'leaveRoom',
      'id': '11',
      'params': [
        'roomId'
      ]
    }));
  }
  hidingRoom(){
    this.subject$.next(
      JSON.stringify({
        'msg': 'method',
        'method': 'hideRoom',
        'id': '14',
        'params': [
          'roomId'
        ]
      })
    );
  }
  operatingRooms(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'openRoom',
      'id': '19',
      'params': [
        'roomId'
      ]
    }));
  }
  favourtingRooms(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'toggleFavorite',
      'id': '16',
      'params': [
        'roomId',
        'true / false'
      ]
    }));
  }
  saveRoomSetting(){
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'saveRoomSettings',
      'id': '16',
      'params': [
        'roomId',
        'setting',
        'value'
      ]
    }));
  }

}
