import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CascaderService {
  constructor(public http: Http) {}

  getCity() {
    const url = 'assets/json/city.json';
    return this.http.get(url)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
