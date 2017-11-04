import {Pipe, PipeTransform} from '@angular/core';
import {createRound} from '../helpers/createRound';

@Pipe({
  name: 'ceil'
})

export class CeilPipe implements PipeTransform {
  transform(number: any, precision?: any): any {
    const round = createRound('ceil');
    return round(number, precision);
  }
}
