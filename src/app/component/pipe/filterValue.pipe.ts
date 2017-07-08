import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterValue'
})

@Injectable()
export class FilterValuePipe implements PipeTransform {

  transform(items: any, query: string, value: any ) {
    if (items && query && value && Array.isArray(items)) {
      return items.filter((v, k, arr) => {
        const regexp = new RegExp(query, 'ig');
        if (regexp.test(v[value])) {
          return true;
        }
      })
    }

    return items;
  }
}
