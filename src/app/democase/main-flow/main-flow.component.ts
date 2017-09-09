import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-flow',
  templateUrl: './main-flow.component.html',
  styleUrls: ['./main-flow.component.scss'],
  animations: [fadeInUp]
})
export class MainFlowComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  lis: any[];
  i: number;
  images: any[];
  constructor() {
    this.lis = [1, 2, 3, 4, 5, 6, 7, 8];
    this.images = [
      {'src': 'freeng/assets/images/landscape1.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape2.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape3.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape7.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape8.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape11.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape16.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape17.jpg', 'alt': 'image'},
      {'src': 'freeng/assets/images/landscape18.jpg', 'alt': 'image'}
    ];
  }

  ngOnInit() {
  }

  onInfiniteScroll(event: any) {
    const page = event.page;
    setTimeout(() => {
     if (page < 5) {
       for (let i = 0; i < 8; i++) {
         this.lis.push((page - 1) * 8 + i + 1 );
       }
     }
      event.next('NO MORE!', page >= 5);
    }, 500);
  }

  onInfiniteScroll2(event: any) {
    const page = event.page;
    setTimeout(() => {
      if (page < 5) {
        for (let i = 0; i < 4; i++) {
          this.images.push({
            src: 'freeng/assets/images/f2.jpg',
            alt: ''
          });
        }
      }
      event.next('NO MORE!', page >= 5);
    }, 500);
  }

}
