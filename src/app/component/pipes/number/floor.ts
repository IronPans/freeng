import {Pipe, PipeTransform} from '@angular/core';
import {createRound} from '../helpers/createRound';

@Pipe({
  name: 'floor'
})

export class FloorPipe implements PipeTransform {
  transform(number: any, precision?: any): any {
    const round = createRound('floor');
    return round(number, precision);
  }
}
