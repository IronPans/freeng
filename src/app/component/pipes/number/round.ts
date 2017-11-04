import {Pipe, PipeTransform} from '@angular/core';
import {createRound} from '../helpers/createRound';

@Pipe({
  name: 'round'
})

export class RoundPipe implements PipeTransform {
  transform(number: any, precision?: any): any {
    const round = createRound('round');
    return round(number, precision);
  }
}
