import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [FileComponent],
  exports: [FileComponent]
})

export class FileModule {}
