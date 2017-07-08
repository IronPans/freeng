import {Injectable} from '@angular/core';
import {ToastComponent} from './toast.component';
import {App} from '../../main/app';
@Injectable()
export class ToastController {
  constructor(private app: App) {}

  create(data?: any) {
    return this.app.intance.insertPages(ToastComponent, 4, data);
  }
}
