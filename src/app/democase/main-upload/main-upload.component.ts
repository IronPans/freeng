import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-upload',
  templateUrl: './main-upload.component.html',
  styleUrls: ['./main-upload.component.css'],
  animations: [fadeInUp]
})
export class MainUploadComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Upload';
  constructor() { }

  ngOnInit() {
  }

}

