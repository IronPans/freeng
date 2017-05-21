import {CommonModule} from '@angular/common';
import { NgModule, Component, OnInit } from '@angular/core';

@Component({
  selector: 'free-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [CropComponent],
  exports: [CropComponent]
})

export class CropModule {}
