import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {CommonModule} from '@angular/common';
import {ImageModule} from '../../component/image/image.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.scss'],
  animations: [fadeInUp]
})
export class MainGalleryComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  images = [];

  constructor() { }

  ngOnInit() {
    this.images = [
      {'src': '/src/assets/Images/landscape1.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape2.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape3.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape7.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape8.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape11.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape16.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape17.jpg', 'alt': 'image', 'highlight': true},
      {'src': '/src/assets/Images/landscape18.jpg', 'alt': 'image', 'highlight': true}
    ];
  }

}

@NgModule({
  imports: [
    CommonModule,
    ImageModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainGalleryComponent]
})

export class MainGalleryModule {}
