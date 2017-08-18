/**
 * Rocket.Chat RealTime API
 */

import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { v1 as uuid } from 'uuid';
import { SHA256 } from 'crypto-js';

export class RealTimeAPI {
  public url: string;
  public webSocket: WebSocketSubject<{}>;

  constructor(param: string | WebSocketSubject<{}>) {
    switch (typeof param) {
      case 'string':
        this.url = param as string;
        this.webSocket = Observable.webSocket(this.url);
        break;
      case 'object':
        this.webSocket = param as WebSocketSubject<{}>;
        this.url = this.webSocket.url;
        break;
      default:
        throw new Error(`Invalid Parameter to the Constructor,
        Parameter must be of Type WebSocketSubject or URL but was found of type "${typeof param}"`);
    }
  }

  /**
   * Returns the Observable to the RealTime API Socket
   */
  public getObservable() {
    return this.webSocket.catch(err => Observable.of(err));
  }

  /**
   * onMessage
   */
  public onMessage(messageHandler?: ((value: {}) => void) | undefined): void {
    this.subscribe(messageHandler, undefined, undefined);
  }


  /**
   * onError
   */
  public onError(errorHandler?: ((error: any) => void) | undefined): void {
    this.subscribe(undefined, errorHandler, undefined);
  }

  /**
   * onCompletion
   */
  public onCompletion(completionHandler?: (() => void) | undefined): void {
    this.subscribe(undefined, undefined, completionHandler);
  }

  /**
   * Subscribe to the WebSocket of the RealTime API
   */
  public subscribe(messageHandler?: ((value: {}) => void) | undefined, errorHandler?: ((error: any) => void) | undefined, completionHandler?: (() => void) | undefined) {
    this.getObservable().subscribe(messageHandler, errorHandler, completionHandler);
  }

  /**
   * sendMessage to Rocket.Chat Server
   */
  public sendMessage(messageObject: {}): void {
    this.webSocket.next(JSON.stringify(messageObject));
  }

  /**
   * getObservableFilteredByMessageType
   */
  public getObservableFilteredByMessageType(messageType: string) {
    return this.getObservable().filter((message: any) => message.msg === messageType);
  }

  /**
   * getObservableFilteredByID
   */
  public getObservableFilteredByID(id: string) {
    return this.getObservable().filter((message: any) => message.id === id);
  }

  /**
   * connectToServer
   */
  public connectToServer() {
    this.sendMessage({ 'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1'] });
    return this.getObservableFilteredByMessageType('connected');
  }

  /**
   * keepAlive, Ping and Pong to the Rocket.Chat Server to Keep the Connection Alive.
   */
  public keepAlive(): void {
    this.getObservableFilteredByMessageType('ping').subscribe(
      message => this.sendMessage({ msg: 'pong' })
    );
  }

  /**
   * Login with Username and Password
   */
  public login(username: string, password: string) {
    const id = uuid();
    const usernameType = username.indexOf('@') !== -1 ? 'email' : 'username';
    this.sendMessage({
      'msg': 'method',
      'method': 'login',
      'id': id,
      'params': [
        {
          'user': { [usernameType]: username },
          'password': {
            'digest': SHA256(password).toString(),
            'algorithm': 'sha-256'
          }
        }
      ]
    });
    return this.getLoginObservable(id);
  }

  /**
   * Login with Authentication Token
   */
  public loginWithAuthToken(authToken: string) {
    const id = uuid();
    this.sendMessage({
      'msg': 'method',
      'method': 'login',
      'id': id,
      'params': [
        { 'resume': authToken }
      ]
    });
    return this.getLoginObservable(id);
  }

  /**
   * Login with OAuth, with Client Token and Client Secret
   */
  public loginWithOAuth(credToken: string, credSecret: string) {
    const id = uuid();
    this.sendMessage({
      'msg': 'method',
      'method': 'login',
      'id': id,
      'params': [
        {
          'oauth': {
            'credentialToken': credToken,
            'credentialSecret': credSecret
          }
        }
      ]
    });
    return this.getLoginObservable(id);
  }

  /**
   * getLoginObservable
   */
  public getLoginObservable(id: string) {
    const resultObservable = this.getObservableFilteredByID(id);
    let resultId: string;
    resultObservable.subscribe(
      (message: any) => {
        if ((message.id === id && message.msg === 'result' && !message.error))
          resultId = message.result.id;
      }
    );

    const addedObservable = this.getObservable()
      .buffer(resultObservable)
      .find(obj => obj.find(msg => msg.id === resultId && resultId !== undefined) !== undefined).map(obj => obj[0]);
    return Observable.merge(resultObservable, addedObservable);
  }

  /**
   * Get Observalble to the Result of Method Call from Rocket.Chat Realtime API
   */
  public callMethod(method: string, ...params: Array<{}>) {
    const id = uuid();
    this.sendMessage({
      'msg': 'method',
      method,
      id,
      params
    });
    return this.getObservableFilteredByID(id);
  }
  public callsubMethod(method: string, ...params: Array<{}>) {
    const id = uuid();
    this.sendMessage({
      'msg': 'sub',
      method,
      id,
      params
    });
    return this.getObservableFilteredByID(id);
  }

  /**
   * getSubscription
   */
  public getSubscription(streamName: string, streamParam: string, addEvent: boolean) {
    const id = uuid();
    const subscription = this.webSocket.multiplex(
      () => JSON.stringify({
        'msg': 'sub',
        'id': id,
        'name': streamName,
        'params': [
          streamParam,
          addEvent
        ]
      }),
      () => JSON.stringify({
        'msg': 'unsub',
        'id': id
      }),
      (message: any) => typeof message.collection === 'string' && message.collection === streamName && message.fields.eventName === streamParam // Proper Filtering to be done. This is temporary filter just for the stream-room-messages subscription
    );
    return subscription;
  }
}
