import { Pipe, PipeTransform } from '@angular/core';

import { Message } from '../../graphql/types/types';

function translate(message: Message) {
  if (!message.type) {
    return;
  }

  const msg = message.content;
  const user = message.author.name;

  switch (message.type) {
    case 'r':               return `Room name chaged to: ${ msg } by ${ user }`;
    case 'au':              return `User ${ msg } added by ${ user }`;
    case 'ru':              return `User ${ msg } removed by ${ user }`;
    case 'ul':              return `User ${ msg } left the channel`;
    case 'uj':              return `User ${ msg } joined the channel`;
    case 'wm':              return `Welcome ${ user }`;
    case 'rm':              return `Message removed by ${ user }`;
    case 'room-archived':   return `This room has been archived by ${ user }`;
    case 'room-unarchived': return `This room has been unarchived by ${ user }`;
  }
}

@Pipe({
  name: 'translateServer'
})
export class TranslateServerPipe implements PipeTransform {
  public transform(message: Message): string {
    return translate(message);
  }
}
