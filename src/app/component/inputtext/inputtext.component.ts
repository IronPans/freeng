import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'free-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss']
})
export class InputtextComponent implements OnInit {
  @Input() color: string;
  @Input() icon: string;
  inputClass;
  constructor() { }

  ngOnInit() {
    this.inputClass = {
      'input-field-icon': !!this.icon
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [InputtextComponent],
  exports: [InputtextComponent]
})

export class InputtextModule {}
