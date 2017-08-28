import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-cropper',
  templateUrl: './main-cropper.component.html',
  styleUrls: ['./main-cropper.component.scss'],
  animations: [fadeInUp]
})
export class MainCropperComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  cropImage: string;
  constructor() {
  }

  ngOnInit() {
  }

  onCrop(event: any) {
    this.cropImage = event.canvasData;
  }
}
