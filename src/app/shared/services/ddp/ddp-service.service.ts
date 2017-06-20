import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WebsocketService} from '../websocket/websocket.service';

@Injectable()
export class DDPService {

  protected session: string;

  protected nextId: number;
  protected subjectsContainer: { [key: number]: Subject<any> };

  public subject$: Subject<any>;

  constructor(private _ws: WebsocketService) {
    this.nextId = 0;
    this.subjectsContainer = {};

    this.subject$ = _ws.create();

    this.subject$.subscribe((data: any) => {
      console.log(23, 'ddp-service.service.ts', data);
      this.onMessage(data);
    }, (err) => {
      this.onError(err);
    }, () => {
      this.onClose();
    });

    this.subject$.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));
  }

  onError(err) {
    console.log(37, 'ddp-service.service.ts', err);
  }

  onClose() {
    console.log(41, 'ddp-service.service.ts', 'close');
  }

  public callMethod(name: string, params: any[]): Observable<any> {
    return this.call({
      msg: 'method',
      method: name,
      params: params
    });
  }

  public callSub(name: string, params: any[]): Observable<any> {
    return this.call({
      msg: 'sub',
      name: name,
      params: params
    });
  }

  public call(obj: any): Observable<any> {
    const id = this.getNextId();
    obj.id = id.toString();
    this.subject$.next(JSON.stringify(obj));

    if (!this.subjectsContainer[id]) {
      this.subjectsContainer[id] = new Subject<any>();
    }
    return this.subjectsContainer[id].asObservable();
  }

  private getNextId(): number {
    return (this.nextId += 1);
  }

  send(msg: string, id?: number) {
    const data = id ? {msg: msg, id: id.toString()} : {msg: msg};
    this.subject$.next(JSON.stringify(data));
  }

  ping() {
    this.send('ping');
  }

  protected unsubscribe(id: string) {
    this.send('unsub');
  }

  private onMessage(data: any) {

    switch (data.msg) {
      case 'failed':
        break;

      case 'connected':
        this.session = data.session;
        this.connected();
        break;

      // method result
      case 'result':
        const subject = this.subjectsContainer[data.id];
        if (subject) {
          if (data.error) {
            subject.error(data.error);
          } else {
            subject.next(data.result);
          }
          subject.complete();
          delete this.subjectsContainer[data.id];
        }
        break;

      // method updated
      case 'updated':
        break;

      // missing subscription
      case 'nosub':
        break;

      // subscriptions ready
      case 'ready':
        break;

      case 'ping':
        this.send('pong');
        break;

      // server respond to my ping
      case 'pong':
        // TODO: set up a system to detect if the server did not respond to my ping (server down)
        break;

      // Beep
      case 'beep':
        // Handle by the parent
        break;

      case 'server_id':
        // Server just tell us his ID
        break;

      // Error
      case 'error':
        console.warn('DDP error', data, data.id, data.error, data.reason);
        break;

      // // add document to collection
      // case 'added':
      // // remove document from collection
      // case 'removed':

      case 'changed':
        break;

      default:
        console.warn('DDP cannot handle this message', data);
        break;
    }
  }


  private connected() {
  }

}
