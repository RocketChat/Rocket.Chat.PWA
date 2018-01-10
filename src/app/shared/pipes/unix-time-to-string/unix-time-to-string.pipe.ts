import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'timeToString' })
export class UnixTimeToStringPipe implements PipeTransform {
  transform(value: number, arg: string): string {
    return moment(parseInt(value.toString(), 10)).format(arg);
  }
}
