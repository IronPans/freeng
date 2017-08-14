import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-draggable',
  templateUrl: './main-draggable.component.html',
  styleUrls: ['./main-draggable.component.scss'],
  animations: [fadeInUp]
})
export class MainDraggableComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  dropItem: any;
  dragItem: any[];
  pageTitle = 'Components-Draggable';
  item = {title: '{{item.title}}'};
  constructor() {
    this.dragItem = [
      {image: 'assets/images/landscape1.jpg', title: '美景1'},
      {image: 'assets/images/landscape2.jpg', title: '美景2'},
      {image: 'assets/images/landscape3.jpg', title: '美景3'},
      {image: 'assets/images/landscape7.jpg', title: '美景4'}
    ];
    this.dropItem = [];
  }

  ngOnInit() {
  }

  onDragEnd(event: any) {
    this.dropItem.push(event);
  }
}
