import {CommonModule} from '@angular/common';
import {
  AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, NgModule, NgZone,
  Output, Renderer2, ViewChild
} from '@angular/core';
import {ProgressModule} from '../progress/progress.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ButtonModule} from '../button/button.directive';
import {HeaderComponent, ShareModule} from '../common/share';

@Component({
  selector: 'free-upload',
  template: `
    <div class="free-upload-box" [ngClass]="styleClass">
      <div class="free-upload" #container
           (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave()" (drop)="onDrop($event)">
        <div class="free-upload-toolbar">
          <div class="free-upload-text" *ngIf="header; else con">
            <ng-content select="f-header"></ng-content>
            <div class="free-upload-inner">
              <input type="file" #input name="uploadFile"
                     [multiple]="multiple" [accept]="accept" (change)="onFileSelect($event)">
            </div>
          </div>
          <ng-template #con>
            <div class="free-upload-text">
              <button fButton [disabled]="isUploading" [theme]="'primary'" [icon]="'plus'">
                {{_title}}</button>
              <div class="free-upload-inner">
                <input type="file" #input name="uploadFile"
                       [multiple]="multiple" [accept]="accept" (change)="onFileSelect($event)">
              </div>
            </div>
            <div class="free-upload-advanced" *ngIf="isAdvanced()">
              <button fButton [disabled]="isUploading || !uploadProgress || isCompleted"
                      [theme]="'warning'" [icon]="'upload'" (click)="upload()">
                Upload</button>
              <button fButton [disabled]="isUploading || files.length <= 0"
                      [theme]="'danger'" [icon]="'trash'" (click)="clear()">
                Delete All
              </button>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="free-upload-progress" *ngIf="showProgress && isAdvanced()">
        <free-progress [value]="progress"></free-progress>
      </div>
      <div class="free-upload-invalid" *ngIf="invalidMessage">
        {{invalidMessage}}
      </div>
      <div class="free-upload-review" *ngIf="review && isAdvanced()">
        <ul>
          <li *ngFor="let file of files;index as i" class="free-upload-item">
            <img *ngIf="isImage(file)" [src]="file['dataURL']" alt="{{file.name}}">
            {{file.name}}
            <span class="free-file-size">{{formatSize(file['size'])}}</span>
            <span class="free-upload-delete" (click)="onDelete(i)">
            <i class="fa fa-close"></i>
          </span>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class UploadComponent implements AfterViewInit {
  @Input() name: string;
  @Input() title: string;
  @Input() review: boolean;
  @Input() multiple: boolean;
  @Input() accept: string;
  @Input() maxFileSize: number;
  @Input() styleClass: any;
  @Input() method: string;
  @Input() url: string;
  @Input() disabled: boolean;
  @Input() mode: string;
  @Input() options: any;
  @Input() autoUpload: boolean;
  @Input() showProgress: boolean;
  @Input() invalidFileSizeMessage: string;
  @Input() invalidFileTypeMessage: string;
  @Input() withCredentials: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeSend: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  @ViewChild('container') uploadViewChild: ElementRef;
  @ContentChild(HeaderComponent) header: ElementRef;
  uploadElem: HTMLDivElement;
  files: any[];
  progress: number;
  _title: string;
  invalidMessage: string;
  isCompleted: boolean;
  isUploading: boolean;
  uploadProgress: number;

  constructor(public renderer2: Renderer2,
              public sanitizer: DomSanitizer,
              public zone: NgZone) {
    this.files = [];
    this.title = 'Choose';
    this.method = 'POST';
    this.mode = 'advanced';
    this.withCredentials = false;
    this.name = 'files[]';
    this.progress = 0;
    this.showProgress = true;
    this.options = {};
    this.autoUpload = false;
    this.uploadProgress = 0;
  }

  ngAfterViewInit() {
    this._title = this.title;
    this.uploadElem = this.uploadViewChild.nativeElement;
    if (this.mode === 'advanced') {
      this.zone.runOutsideAngular(() => {
        this.uploadElem.addEventListener('dragover', this.onDragOver.bind(this));
      });
    }
  }

  onFileSelect(event: any) {
    this.invalidMessage = '';
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (const file of files) {
      if (this.maxFileSize) {
        if (file.size > this.maxFileSize) {
          this.invalidMessage = this.invalidFileSizeMessage;
          break;
        }
      }
      if (this.accept) {
        const regExp = new RegExp(this.accept);
        if (!regExp.test(this.accept)) {
          this.invalidMessage = this.invalidFileTypeMessage;
          break;
        }
      }
      if (this.review && this.isImage(file)) {
        file['dataURL'] = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)))
      }
      file['uploaded'] = false;
      this.files.push(file);
      if (!this.isAdvanced()) {
        this._title = this.files.length > 1 ? `${this.files.length}个文件` : this.files[0].name;
      }
    }
    let num = 0;
    for (const file of this.files) {
      if (!file['uploaded']) {
        num++;
      }
    }
    this.uploadProgress = Math.round(num / this.files.length * 100);
    this.progress = 100 - this.uploadProgress;
    this.isCompleted = false;
    if (!this.invalidMessage) {
      this.onChange.emit({files: this.files});
      if (this.url && this.autoUpload) {
        this.upload();
      }
    }
  }

  onDelete(index: number) {
    this.files.splice(index, 1);
    this.onRemove.emit({files: this.files})
  }

  upload(files?: any) {
    if (!this.url && this.uploadProgress) {
      return;
    }
    const xhr = new XMLHttpRequest(),
      formData = new FormData();
    this.isUploading = true;

    this.onBeforeUpload.emit({
      'xhr': xhr,
      'formData': formData
    });

    for (const file of this.files) {
      if (!file['uploaded']) {
        formData.append(this.name, file, file.name);
      }
    }
    const progress = this.progress;
    xhr.upload.onprogress = (event: ProgressEvent) => {
      this.progress = progress + Math.round(event.lengthComputable
        ? event.loaded * this.uploadProgress / event.total : 0);
      this.onProgress.emit({event: event, progress: this.progress});
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          for (const file of this.files) {
            if (!file['uploaded']) {
              file['uploaded'] = true;
            }
          }
          this.onUpload.emit({xhr: xhr, files: this.files});
        } else {
          this.onError.emit({xhr: xhr, files: this.files});
        }
      }
      this.isCompleted = true;
      this.isUploading = false;
    };

    if (this.options.headers) {
      for (const header of this.options.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }

    xhr.open(this.method, this.url, true);

    this.onBeforeSend.emit({
      'xhr': xhr,
      'formData': formData
    });

    xhr.withCredentials = this.withCredentials;

    xhr.send(formData);
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  isAdvanced() {
    return this.mode === 'advanced';
  }

  onDragEnter(event) {
    if (!this.disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onDragOver(event) {
    if (!this.disabled) {
      this.renderer2.addClass(this.uploadElem, 'free-upload-active');
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onDragLeave() {
    if (!this.disabled) {
      this.renderer2.removeClass(this.uploadElem, 'free-upload-active');
    }
  }

  onDrop(event) {
    if (!this.disabled) {
      this.renderer2.removeClass(this.uploadElem, 'free-upload-active');
      event.stopPropagation();
      event.preventDefault();
      const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      const allowDrop = this.multiple || (files && files.length === 1);
      if (allowDrop) {
        this.onFileSelect(event);
      }
    }
  }

  formatSize(bytes) {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1000,
      dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  clear() {
    this.files = [];
    this.uploadProgress = 0;
    this.progress = 0;
  }
}
@NgModule({
  imports: [CommonModule, ProgressModule, ButtonModule],
  declarations: [UploadComponent],
  exports: [UploadComponent, ShareModule]
})
export class UploadModule {
}
