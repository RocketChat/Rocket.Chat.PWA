import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { chatQuery } from './chat/chat.query';

// Will be removed
@Injectable()
export class GetChatDummyService {

  constructor(private apollo: Apollo) { }

  queryChat(){
    return this.apollo.watchQuery({query: chatQuery});
  }

}
