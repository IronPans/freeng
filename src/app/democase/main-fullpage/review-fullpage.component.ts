import {Component} from '@angular/core';

@Component({
  selector: 'free-review-fullpage',
  template: `
    <free-fullpage [pagination]="true" [paginationClickable]="true">
      <free-fullpage-slide>
        <div class="fullpage fullpage1"></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage fullpage2"></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage fullpage3"></div>
      </free-fullpage-slide>
      <free-fullpage-slide>
        <div class="fullpage fullpage4"></div>
      </free-fullpage-slide>
    </free-fullpage>
  `,
  styleUrls: [`./main-fullpage.component.scss`]
})

export class ReviewFullpageComponent {
  pageTitle = 'Components-Fullpage';
}
