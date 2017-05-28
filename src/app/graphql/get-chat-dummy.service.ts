import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

const chatQuery: DocumentNode = require('graphql-tag/loader!./chat/chat.query.graphql');
// Will be removed
@Injectable()
export class GetChatDummyService {

  constructor(private apollo: Apollo) { }

  queryChat(){

    return this.apollo.watchQuery({query: chatQuery});
  }

}
