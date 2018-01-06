import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MainTreeService {
  constructor(private http: HttpClient) {
  }

  getFiles() {
    return this.http.get('assets/json/files.json');
  }

  getLazyFiles() {
    return this.http.get('assets/json/lazyFiles.json');
  }
}
