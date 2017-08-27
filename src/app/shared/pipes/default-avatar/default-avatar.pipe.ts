import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? value : '/assets/images/default_avatar.png';
  }

}
