import {Component} from '@angular/core';

@Component({
  selector: 'free-review-fullpage',
  template: `
    <free-fullpage [pagination]="true" [paginationClickable]="true">
      <free-fullpage-slide>
        <div class="fullpage"><img src="assets/images/f1.jpg" alt=""></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage"><img src="assets/images/f2.jpg" alt=""></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage"><img src="assets/images/f3.jpg" alt=""></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage"><img src="assets/images/f4.jpg" alt=""></div>
      </free-fullpage-slide>
    </free-fullpage>
  `,
  styleUrls: [`./main-fullpage.component.scss`]
})

export class ReviewFullpageComponent {
  pageTitle = 'Components-Fullpage';
}
