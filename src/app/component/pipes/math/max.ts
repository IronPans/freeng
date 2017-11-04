import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'max'
})

export class MaxPipe implements PipeTransform {
  transform(value: any): any {
    return Array.isArray(value) ? Math.max(...value) : value;
  }
}
