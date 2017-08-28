import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-media',
  templateUrl: './main-media.component.html',
  styleUrls: ['./main-media.component.scss'],
  animations: [fadeInUp]
})
export class MainMediaComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  media: any[];
  audio: any[];
  constructor() {
    this.media = [
      {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
      {src: 'http://media.w3.org/2010/05/sintel/trailer.webm', type: 'video/webm'},
      {src: 'http://vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg'}
    ];
    this.audio = [
      {src: 'http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3', type: 'audio/mp3'}
    ];
  }

  ngOnInit() {
  }

}
