import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'defaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform {
  transform(value: any, username: string): any {
    if (value) {
      return value;
    }

    if (username) {
      return `${ environment.server }/avatar/${ username }`;
    }

    return '/assets/images/default_avatar.png';
  }
}
