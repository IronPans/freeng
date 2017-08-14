import {Component} from '@angular/core';

@Component({
  selector: 'free-root',
  template: `
    <div class="free-main">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }
}
