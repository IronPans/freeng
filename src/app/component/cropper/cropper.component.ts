import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input,
  NgModule, OnDestroy, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-cropper',
  template: `
    <div class="free-cropper" tabindex="10"  #container
         (touchstart)="onTouchstart($event, {overlay: true})"
         (mousedown)="onTouchstart($event, {overlay: true})"
         [style.width.px]="defaultOption.width" [style.height.px]="defaultOption.height">
      <div class="free-cropper-wrapper">
        <div class="free-cropper-canvas" [ngStyle]="sourceStyle">
          <img [src]="defaultOption.url" [style.width.px]="width" [style.height.px]="height" alt="">
        </div>
      </div>
      <div class="free-cropper-drag-box free-cropper-modal free-cropper-move"></div>
      <div class="free-cropper-box" [ngStyle]="cropperStyle" #cropper
           (touchstart)="onTouchstart($event, {cropper: true})"
           (mousedown)="onTouchstart($event, {cropper: true})">
        <span class="free-cropper-view-box">
          <img [src]="defaultOption.url" [ngStyle]="transformStyle">
        </span>
        <span class="free-cropper-dashed free-dashed-h"></span>
        <span class="free-cropper-dashed free-dashed-v"></span>
        <span class="free-cropper-center"></span>
        <span class="free-cropper-face free-cropper-move"></span>
        <span *ngFor="let line of lines" class="free-cropper-line free-line-{{line}}"
              (touchstart)="onTouchstart($event, {direction: line})"
              (mousedown)="onTouchstart($event, {direction: line})"></span>
        <span *ngFor="let point of points" class="free-cropper-point free-point-{{point}}"
              (touchstart)="onTouchstart($event, {direction: point})"
              (mousedown)="onTouchstart($event, {direction: point})"></span>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class CropperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: any;
  @Input() zoomable: boolean;
  @Input() aspectRatio: number;
  @Output() onCrop: EventEmitter<any> = new EventEmitter();
  @ViewChild('cropper') cropperViewChild: ElementRef;
  @ViewChild('container') containerViewChild: ElementRef;
  cropper: HTMLDivElement;
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  touchEvent: any;
  points: any[];
  autoCropArea: number;
  x: number;
  y: number;
  left: number;
  top: number;
  ctx: any;
  lines: any[];
  transformStyle: any;
  sourceStyle: any;
  cropperStyle: any;
  defaultOption: any;
  startPoint: any;
  cropperPressed: boolean;
  pointPressed: boolean;
  overlayPressed: boolean;
  direction: string;
  cropperWidth: number;
  cropperHeight: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  zoomRatioStep: number;
  zoomRatio: number;
  minCropperWidth: number;
  minCropperHeight: number;
  scaleX: number;
  scaleY: number;
  naturalLeft: number;
  naturalTop: number;
  rotate: number;
  maxTop: number;
  maxLeft: number;
  oldTop: number;
  oldLeft: number;
  canvasTouchstartListener: any;
  documentTouchmoveListener: any;
  documentTouchendListener: any;

  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) {
    this.aspectRatio = 1;
    this.autoCropArea = 0.8;
    this.width = 400;
    this.height = 300;
    this.defaultOption = {
      width: this.width,
      height: this.height,
      aspectRatio: 1,
      url: '',
      cropperWidth: this.width * this.autoCropArea,
      cropperHeight: this.width * this.autoCropArea * this.aspectRatio
    };
    this.rotate = 0;
    this.scaleX = this.scaleY = 1;
    this.zoomable = true;
    this.minCropperHeight = this.minCropperWidth = 20;
    this.zoomRatioStep = 0.1;
    this.zoomRatio = 1;
    this.x = 0;
    this.y = 0;
    this.points = ['e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'];
    this.lines = ['e', 'n', 'w', 's'];
    this.touchEvent = this.domRenderer.getTouchEvent();
  }

  ngOnInit() {
    this.defaultOption = Object.assign(this.defaultOption, this.data);
    this.width = this.defaultOption.width;
    this.height = this.defaultOption.height;
    this.aspectRatio = this.defaultOption.aspectRatio;
    this.cropperHeight = this.defaultOption.cropperHeight * this.aspectRatio * this.autoCropArea;
    this.cropperWidth = this.defaultOption.cropperWidth * this.autoCropArea;
  }

  ngAfterViewInit() {
    this.naturalLeft = this.x = this.left = (this.width - this.cropperWidth) / 2;
    this.naturalTop = this.y = this.top = (this.height - this.cropperHeight) / 2;
    this.setCropperCanvas();
    this.naturalHeight = this.height;
    this.naturalWidth = this.width;
    this.cropper = this.cropperViewChild.nativeElement;
    this.container = this.containerViewChild.nativeElement;
    if (this.zoomable) {
      this.domRenderer.on(this.container, 'wheel mousewheel DOMMouseScroll',
        (e) => this.onWheel(e));
    }
  }

  zoomTo(ratio: number, event?: any) {
    const width = this.width;
    const height = this.height;
    const naturalWidth = this.naturalWidth;
    const naturalHeight = this.naturalHeight;
    if (ratio < 0.1) {
      ratio = 0.1;
    }
    const newWidth = naturalWidth * ratio;
    const newHeight = naturalHeight * ratio;
    if (event) {
      const offset = this.domRenderer.getRect(this.container);
      this.left += (newWidth - width) * ((event.pageX - offset.left - (this.x - this.left)) / width);
      this.top += (newHeight - height) * ((event.pageY - offset.top - (this.y - this.top)) / height);
    } else {
      this.left += (newWidth - width) / 2;
      this.top += (newHeight - height) / 2;
    }
    this.width = newWidth;
    this.height = newHeight;
    this.setCropperCanvas();
    this.onCropperChange();
  }

  getTransform(data: any = {}) {
    const transforms = [];
    const translateX = data.translateX;
    const translateY = data.translateY;
    const rotate = data.rotate;
    const scaleX = data.scaleX;
    const scaleY = data.scaleY;

    if (this.isNumber(translateX) && translateX !== 0) {
      transforms.push('translateX(' + translateX + 'px)');
    }

    if (this.isNumber(translateY) && translateY !== 0) {
      transforms.push('translateY(' + translateY + 'px)');
    }

    if (this.isNumber(rotate) && rotate !== 0) {
      transforms.push('rotate(' + rotate + 'deg)');
    }

    if (this.isNumber(scaleX) && scaleX !== 1) {
      transforms.push('scaleX(' + scaleX + ')');
    }

    if (this.isNumber(scaleY) && scaleY !== 1) {
      transforms.push('scaleY(' + scaleY + ')');
    }

    return transforms.length ? transforms.join(' ') : 'none';
  }

  setPosition(mx, my) {
    const width = this.cropperWidth + this.x;
    const height = this.cropperHeight + this.y;
    const moveTo = {
      n: () => {
        this.cropperHeight -= my;
        this.y += my;
        this.cropperHeight = Math.min(height, this.cropperHeight);
        this.y = Math.max(0, this.y);
        if ((!this.y && my > 0) || this.y) {
          this.top += my;
        } else if (!this.y) {
          this.top = this.oldTop - this.maxTop;
        }
      },
      e: () => {
        this.cropperWidth += mx;
        this.cropperWidth = Math.min(this.cropperWidth, this.naturalWidth - this.x);
      },
      s: () => {
        this.cropperHeight += my;
        this.cropperHeight = Math.min(this.cropperHeight, this.naturalHeight - this.y);
      },
      w: () => {
        this.cropperWidth -= mx;
        this.x += mx;
        this.cropperWidth = Math.min(width, this.cropperWidth);
        this.x = Math.max(0, this.x);
        if ((!this.x && mx > 0) || this.x) {
          this.left += mx;
        } else if (!this.x) {
          this.left = this.oldLeft - this.maxLeft;
        }
      }
    };
    switch (this.direction) {
      case 'e':
        moveTo.e();
        break;
      case 'w':
        moveTo.w();
        break;
      case 's':
        moveTo.s();
        break;
      case 'n':
        moveTo.n();
        break;
      case 'ne':
        moveTo.n();
        moveTo.e();
        break;
      case 'nw':
       moveTo.n();
       moveTo.w();
        break;
      case 'sw':
        moveTo.s();
        moveTo.w();
        break;
      case 'se':
        moveTo.e();
        moveTo.s();
        break;
    }
  }

  onTouchstart(event: any, args: any = {}) {
    event = this.domRenderer.getPointer(event)[0];
    this.startPoint = {
      pageX: event.pageX,
      pageY: event.pageY
    };
    if (args.direction) {
      this.pointPressed = true;
      this.direction = args.direction;
    }
    if (args.cropper) {
      this.cropperPressed = true;
    }
    if (args.overlay) {
      this.overlayPressed = true;
    }
    this.maxLeft = this.x;
    this.maxTop = this.y;
    this.oldLeft = this.left;
    this.oldTop = this.top;
    this.documentTouchmoveListener = this.renderer2.listen('body', this.touchEvent.touchmove,
      (e) => this.onTouchmove(e));
    this.documentTouchendListener = this.renderer2.listen('body', this.touchEvent.touchend,
      () => this.onTouchend());
    event.preventDefault();
    event.stopPropagation();
  }

  onTouchmove(event: any) {
    event = this.domRenderer.getPointer(event)[0];
    const mx = event.pageX - this.startPoint.pageX;
    const my = event.pageY - this.startPoint.pageY;
    const left = this.naturalWidth - this.cropperWidth;
    const top = this.naturalHeight - this.cropperHeight;
    if (this.pointPressed) {
      this.setPosition(mx, my);
    }
    if (this.cropperPressed) {
      this.x += mx;
      this.y += my;
      this.x = Math.max(0, Math.min(left, this.x));
      this.y = Math.max(0, Math.min(top, this.y));
      if (this.x > 0 && this.x < left) {
        this.left += mx;
      }
      if (this.y > 0 && this.y < top) {
        this.top += my;
      }
      if (!this.x) {
        this.left = this.oldLeft - this.maxLeft;
      } else if (this.x >= left) {
        this.left = this.oldLeft + (this.naturalWidth - this.maxLeft - this.cropperWidth);
      }
      if (!this.y) {
        this.top = this.oldTop - this.maxTop;
      } else if (this.y >= left) {
        this.top = this.oldTop + (this.naturalHeight - this.maxTop - this.cropperHeight);
      }
    }
    if (this.overlayPressed && !this.pointPressed) {
      this.left -= mx;
      this.top -= my;
    }
    if (this.pointPressed || this.cropperPressed) {
      this.cropperHeight = Math.max(this.minCropperWidth, Math.min(this.naturalHeight, this.cropperHeight));
      this.cropperWidth = Math.max(this.minCropperHeight, Math.min(this.naturalWidth, this.cropperWidth));
    }
    if (this.pointPressed || this.cropperPressed || this.overlayPressed) {
      this.setCropperCanvas();
      this.startPoint = {
        pageX: event.pageX,
        pageY: event.pageY
      };
      this.onCropperChange();
    }
  }

  onTouchend() {
    this.cropperPressed = false;
    this.pointPressed = false;
    this.overlayPressed = false;
    this.maxLeft = this.x;
    this.maxTop = this.y;
    this.unbindCanvasTouchListener();
  }

  onCropperChange() {
    this.onCrop.emit({
      top: parseInt(this.y + '', 10),
      left: parseInt(this.x + '', 10),
      width: this.cropperWidth,
      height: this.cropperHeight,
      scale: this.zoomRatio,
      canvasData: this.getCanvasData()
    });
  }

  onWheel(e: any) {
    e = e || window.event;
    if (e.wheelDelta) {
      if (e.wheelDelta > 0) {
        // to prev
        this.zoomRatio += this.zoomRatioStep;
      } else if (e.wheelDelta < 0) {
        this.zoomRatio -= this.zoomRatioStep;
      }
    } else if (e.detail) {
      if (e.detail < 0) {
        this.zoomRatio += this.zoomRatioStep;
      } else if (e.detail > 0) {
        this.zoomRatio -= this.zoomRatioStep;
      }
    }
    this.zoomTo(this.zoomRatio, e);
    e.preventDefault();
    e.stopPropagation();
  }

  getCanvasData() {
    const canvasWidth = this.cropperWidth;
    const canvasHeight = this.cropperHeight;
    const img = new Image();
    img.src = this.defaultOption.url;
    const rotatable = this.isNumber(this.rotate) && this.rotate !== 0;
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.save();
    let dix, diy;
    dix = -this.left;
    diy = -this.top;
    this.ctx.drawImage(img, dix, diy, this.width, this.height);
    if (rotatable) {
    }
    this.ctx.restore();
    return this.canvas.toDataURL('image/png');
  }

  setCropperCanvas() {
    this.cropperStyle = {
      width: this.cropperWidth + 'px',
      height: this.cropperHeight + 'px',
      transform: this.getTransform({translateX: this.x, translateY: this.y})
    };
    this.transformStyle = {
      width: this.width + 'px',
      height: this.height + 'px',
      transform: this.getTransform({translateX: -this.left,
        translateY: -this.top, rotate: this.rotate, scaleX: this.scaleX, scaleY: this.scaleY})
    };
    if (!this.cropperPressed && !this.pointPressed) {
      this.sourceStyle = {
        width: this.width + 'px',
        height: this.height + 'px',
        transform:  this.getTransform({translateX: Math.round(this.x - this.left),
          translateY: Math.round(this.y - this.top), rotate: this.rotate,
          scaleX: this.scaleX, scaleY: this.scaleY})
      };
    }
  }

  isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  unbindCanvasTouchListener() {
    if (this.canvasTouchstartListener) {
      this.canvasTouchstartListener();
      this.canvasTouchstartListener = null;
    }
  }

  unbindDocumentTouchListener() {
    if (this.documentTouchendListener) {
      this.documentTouchendListener();
      this.documentTouchendListener = null;
    }
    if (this.documentTouchendListener) {
      this.documentTouchendListener();
      this.documentTouchendListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindCanvasTouchListener();
    this.unbindDocumentTouchListener();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [CropperComponent],
  exports: [CropperComponent]
})
export class CropperModule {
}
