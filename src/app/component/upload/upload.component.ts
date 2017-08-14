import {CommonModule} from '@angular/common';
import {Component, ElementRef, EventEmitter, Input, NgModule,
  OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'free-upload',
  template: `
    <div class="free-upload">
      <div class="free-upload-text">
        <i class="fa fa-upload"></i>{{title}}
      </div>
      <div class="free-upload-inner">
        <input type="file" #input name="uploadFile" (change)="onUploadChange($event)">
      </div>
    </div>
    <div class="free-upload-review" *ngIf="review">
      <ul>
        <li *ngFor="let file of files;index as i" class="free-upload-item">
          <img *ngIf="media" src="{{dataURL[i]}}" alt="{{file.name}}">
          {{file.name}}
          <span class="free-upload-delete" (click)="onDelete(i)">
            <i class="fa fa-close"></i>
          </span>
        </li>
      </ul>
    </div>
  `
})
export class UploadComponent implements OnInit {

  @Input() title: string;
  @Input() review: boolean;
  @Input() multiple: boolean;
  @Input() media: string;
  @Input() maxSize: number;
  @Input() type: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  files: any[];
  dataURL: any[];
  constructor(public renderer2: Renderer2) {
    this.files = [];
    this.title = '图片上传';
    this.dataURL = [];
  }

  ngOnInit() {
    const _input = this.input.nativeElement;
    if (this.multiple) {
      this.renderer2.setProperty(_input, 'multiple', true);
    }
    if (this.media) {
      this.renderer2.setProperty(_input, 'accept', this.media);
    }
  }

  onUploadChange(event: any) {
    const files = event.target.files;
    if (this.review) {
      for (const file of files) {
        if (this.maxSize && file.size > this.maxSize) {
          continue;
        }
        if (this.type) {
          const regExp = new RegExp(this.type);
          if (!regExp.test(this.type)) {
            continue;
          }
        }
        this.addFile(file);
      }
    }
    this.onChange.emit(this.files);
  }

  addFile(file: any) {
    this.files.push(file);
    if (this.media) {
      this.imageToData(file);
    }
  }

  imageToData(file: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.dataURL.push(e.target['result']);
    };
    reader.readAsDataURL(file);
  }

  onDelete(index: number) {
    this.files.splice(index, 1);
    this.onChange.emit(this.files)
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [UploadComponent],
  exports: [UploadComponent]
})
export class UploadModule {}
