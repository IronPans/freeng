import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'min'
})

export class MinPipe implements PipeTransform {
  transform(value: any): any {
    return Array.isArray(value) ? Math.min(...value) : value;
  }
}
