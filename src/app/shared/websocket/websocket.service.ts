import { Injectable } from '@angular/core';
import { RealTimeAPI } from 'rocket.chat.realtime.api.rxjs';
import { SHA256 } from 'crypto-js';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
  public realTimeapi;
  constructor() {
  }
  connectToHostname(url: string){
    this.realTimeapi = new RealTimeAPI(url);
    this.realTimeapi.connectToServer().retry(3);
    this.realTimeapi.keepAlive();
  }
  signIn(username: string, password: string){
    console.log('realtimapi value' + this.realTimeapi );
      return this.realTimeapi.login(username, password)
        .first()
        .map((data) => {
          console.log('data' + JSON.stringify(data));
          if (data.hasOwnProperty('result'))
          {
            if (data.result.hasOwnProperty('token') === true)
            {
              console.log(data.result.token);
                localStorage.setItem('token', data.result.token);
                return 'Logging In..';
            } else {
              data = data;
            }
          } else if (data.hasOwnProperty('error')){
            if (data.error.hasOwnProperty('reason') === true)
            {
              console.log(data.error.reason);
              return data.error.reason;
            } else {
              data = data;
            }
          }
        });
  }
  signUp(name: string, email: string, username: string , passwordone: string, passwordtwo: string){
        if (passwordone === passwordtwo){
          const pass = passwordone;
            const params = [{
              'email': email,
              'name': name,
              'pass': pass,
              'username': username
            }];
           return this.realTimeapi.callMethod('registerUser', ...params)
             .map((data) => {
               console.log('data' + JSON.stringify(data));
               if (data.hasOwnProperty('result'))
               {
                  return 'Successfully Registered';
               } else if (data.hasOwnProperty('error')){
                 if (data.error.hasOwnProperty('reason') === true)
                 {
                   console.log(data.error.reason);
                   return data.error.reason;
                 } else {
                   data = data;
                 }
               }
             });
        } else{
           console.log('Password is different');
        }
  }
  listChannels(time: number) {
          const params = [{
            '$date': time
          }];
          return this.realTimeapi.callMethod('rooms/get', ...params)
            .map((data) => {
            if (data.hasOwnProperty('result') === true) {
              for (let i = 0; i < data.result.update.length ; i++) {
                return JSON.stringify(data.result.update);
              }
            } else {
            return 'error';
            }
            });
  }
  openChannel(roomId: string){
        const params = [{
          roomId
        }];
        return this.realTimeapi.callMethod('openRoom', ...params);
  }
  sendChatMessage(msg_id: string, room_id: string , msg: string){
    const params = [{
      '_id': msg_id,
      'rid': room_id,
      'msg': msg
    }
    ];
    return this.realTimeapi.callMethod('sendMessage', ...params);
  }


  alternateLogin(user: string, password: string){
    let params: any;
    if (user.indexOf('@') === -1)
    {
      params = [{
        'user': {
            'username': user
        },
        'password': password
      }];
    }else {
      params = [{
        'user': {
          'email': user
        },
        'password': password
      }];
    }
    return this.realTimeapi.callMethod('login', ...params)
      .first()
      .map((data) => {
        console.log('data' + JSON.stringify(data));
        if (data.hasOwnProperty('result'))
        {
          if (data.result.hasOwnProperty('token') === true)
          {
            console.log(data.result.token);
            localStorage.setItem('token', data.result.token);
            return 'Logging In..';
          } else {
            data = data;
          }
        } else if (data.hasOwnProperty('error')){
          if (data.error.hasOwnProperty('reason') === true)
          {
            console.log(data.error.reason);
            return data.error.reason;
          } else {
            data = data;
          }
        }
      });
  }
  getsubscription(){
    const params = [{}];
   return  this.realTimeapi.callMethod('subscriptions/get', ...params)
     .map((data) => {
     if (data.hasOwnProperty('result') === true){
        return data.result;
     }else  {
       return 'Error Occured';
     }
     });
  }

  getRooms(roomId: string){
    const params = [
      roomId
    ];
    return this.realTimeapi.callMethod('openRoom', ...params);
  }
  streamRoomMessages(roomId: string){
    const params = [
      roomId
    ];
    return this.realTimeapi.callMethod('stream-room-messages', ...params);
  }
  loadhistory(roomid: string, olddate: number, msgquantity: number, newdate: number){
    const params = [
      roomid, olddate, msgquantity, { '$date': newdate
    }];
    return this.realTimeapi.callMethod('loadHistory', ...params);
  }
}
