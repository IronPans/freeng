import {
  AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input,
  NgModule, OnDestroy, Output, Renderer2, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { Color } from './color';

const CUSTOME_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorpickerComponent),
  multi: true
};

@Component({
  selector: 'free-color-picker',
  template: `
    <div class="free-picker">
      <div class="free-color-picker-block" (click)="onBlockClick($event)" *ngIf="!inline && !colorInput"
           [style.background-color]="colorValue"></div>
      <div class="free-color-input" *ngIf="!inline && colorInput" (click)="onBlockClick($event)">
        <input type="text" readonly value="{{colorValue}}" [style.color]="colorValue">
        <div class="free-color-block" [style.background-color]="colorValue"></div>
      </div>
      <div class="free-color-picker" #picker (click)="areaClick($event)"
           data-mode='HSL' [style.display]="(inline || visible) ? 'block' : 'none'">
        <div class="free-picking-area" #pickerArea style="background-color: rgb(255, 0, 0);">
          <div class="picker" #colorPicker style="left: 94px; top: 94px;"></div>
        </div>
        <div class="free-hue-area" #hueArea>
          <div class="slider-picker" #huePicker style="left: -1px;"></div>
        </div>
      </div>
    </div>`,
  providers: [DomRenderer, CUSTOME_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class ColorpickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() visible: boolean;
  @Input() inline: boolean;
  @Input() clickable: boolean;
  @ViewChild('pickerArea') pickerAreaViewChild: ElementRef;
  @ViewChild('colorPicker') colorPickerViewChild: ElementRef;
  @ViewChild('hueArea') hueAreaViewChild: ElementRef;
  @ViewChild('huePicker') huePickerViewChild: ElementRef;
  @ViewChild('picker') pickerViewChild: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() colorInput: boolean;
  set value(value: string) {
    this.colorValue = value;
    this.changeHexa(value);
  }
  get value() {
    return this.colorValue;
  }
  documentTouchmoveListener: any;
  documentTouchendListener: any;
  documentClickListener: any;
  pickerClickListener: any;
  hueClickListener: any;
  pickerArea: HTMLDivElement;
  colorPicker: HTMLDivElement;
  hueArea: HTMLDivElement;
  huePicker: HTMLDivElement;
  picker: HTMLDivElement;
  touch: any;
  picker_mode: string;
  color: any;
  colorValue: string;
  isDown: boolean;
  topic: string;
  selfClick: boolean;
  pickerDragging: boolean;
  hueDragging: boolean;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) {
    this.touch = this.domRenderer.getTouchEvent();
    this.color = new Color();
    this.colorValue = '#000';
    this.picker_mode = 'HSL';
    this.topic = 'picker';
    this.color.setFormat(this.picker_mode);
    this.color.setHSL(0, 51, 51);
    this.color.a = 1;
  }

  ngAfterViewInit() {
    this.pickerArea = this.pickerAreaViewChild.nativeElement;
    this.colorPicker = this.colorPickerViewChild.nativeElement;
    this.hueArea = this.hueAreaViewChild.nativeElement;
    this.huePicker = this.huePickerViewChild.nativeElement;
    this.picker = this.pickerViewChild.nativeElement;

    this.createPickingArea();
    this.createHueArea();
    this.changeHexa(this.colorValue);

    this.documentClickListener = this.renderer2.listen('document', 'click', () => {
      if (!this.selfClick && !this.inline) {
        this.visible = false;
      }
      this.selfClick = false;
    });

    if (this.inline) {
      this.domRenderer.css(this.picker, {
        'position': 'relative',
        'top': '0',
        'left': '0'
      })
    }

  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  onBlockClick(event: any) {
    this.visible = !this.visible;
    event.stopPropagation();
  }

  areaClick(event: any) {
    this.selfClick = true;
  }

  update(event: any) {
    if (this.hueDragging) {
      this.updateHueSlider(event);
    } else {
      this.updateColor(event);
    }
  }

  createPickingArea() {
    this.pickerClickListener = this.renderer2.listen(this.pickerArea, this.touch.touchstart, (e) => {
      this.isDown = true;
      this.pickerDragging = true;
      this.update(e);
      if (this.clickable) {
        this.onClick.emit(true);
      } else {
        this.bindDocumentTouchmoveListener();
      }
      this.bindDocumentTouchendListener();
    });
  }

  createHueArea() {
    this.hueClickListener = this.renderer2.listen(this.hueArea, this.touch.touchstart, (e) => {
      this.isDown = true;
      this.hueDragging = true;
      this.update(e);
      this.bindDocumentTouchmoveListener();
      this.bindDocumentTouchendListener();
    });
  }

  updateColor(e) {
    const rect = this.domRenderer.getRect(this.pickerArea);
    let x = e.pageX - document.body.scrollLeft - rect.left;
    let y = e.pageY - document.body.scrollTop - rect.top;
    const picker_offset = 5;

    const size = this.pickerArea.clientWidth;

    if (x > size) {
      x = size;
    }
    if (y > size) {
      y = size;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    const value = 100 - (y * 100 / size) | 0;
    const saturation = x * 100 / size | 0;

    if (this.picker_mode === 'HSV') {
      this.color.setHSV(this.color.hue, saturation, value);
    }

    if (this.picker_mode === 'HSL') {
      this.color.setHSL(this.color.hue, saturation, value);
    }

    this.colorPicker.style.left = x - picker_offset + 'px';
    this.colorPicker.style.top = y - picker_offset + 'px';

    this.updatePreviewColor();
  }

  updateHueSlider(e) {
    const rect = this.domRenderer.getRect(this.hueArea);
    let x = e.pageX - document.body.scrollLeft - rect.left;
    const width = this.hueArea.clientWidth;

    if (x < 0) {
      x = 0;
    }
    if (x > width) {
      x = width;
    }

    const hue = ((359 * x) / width) | 0;

    this.updateSliderPosition(this.huePicker, x);
    this.setHue(hue);
  }

  setColor(color) {
    if (color instanceof Color !== true) {
      console.log('Typeof parameter not Color');
      return;
    }

    if (color.format !== this.picker_mode) {
      color.setFormat(this.picker_mode);
      color.updateHSX();
    }

    this.color.copy(color);
    this.updateHuePicker();
    this.updatePickerPosition();
    this.updatePickerBackground();
    this.updatePreviewColor();
  }

  updateHuePicker() {
    const size = this.domRenderer.getHiddenElementClient(this.picker, this.hueArea, 'clientWidth');
    const offset = 1;
    const pos = (this.color.hue * size / 360 ) | 0;
    this.huePicker.style.left = pos - offset + 'px';
  }

  updatePickerPosition() {
    const size = this.domRenderer.getHiddenElementClient(this.picker, this.pickerArea, 'clientWidth');
    let value = 0;
    const offset = 5;

    if (this.picker_mode === 'HSV') {
      value = this.color.value;
    }
    if (this.picker_mode === 'HSL') {
      value = this.color.lightness;
    }

    const x = (this.color.saturation * size / 100) | 0;
    const y = size - (value * size / 100) | 0;
    this.colorPicker.style.left = x - offset + 'px';
    this.colorPicker.style.top = y - offset + 'px';
  }

  updatePickerBackground() {
    const nc = new Color(this.color);
    nc.setHSV(nc.hue, 100, 100);
    this.pickerArea.style.backgroundColor = nc.getHexa();
  }

  setHue(value) {
    this.color.setHue(value);

    this.updatePickerBackground();
    this.updatePreviewColor();
  }

  updateSliderPosition(elem, pos) {
    elem.style.left = Math.max(pos - 3, -2) + 'px';
  }

  updatePreviewColor() {
    this.colorValue = this.color.getColor();
  }

  HEXToRGBA(value: string) {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1;
    canvas.height = 1;
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    this.color.setRGBA(data[0], data[1], data[2], data[3]);
    canvas = null;
  }

  changeHexa(value: string) {
    this.HEXToRGBA(value);
    const hex = this.color.getHexa();
    this.color.setHexa(hex);
    this.setColor(this.color);
  }

  bindDocumentTouchmoveListener() {
    if (!this.documentTouchmoveListener) {
      this.documentTouchmoveListener = this.renderer2.listen('document', this.touch.touchmove, (event) => {
        if (this.isDown && !this.inline) {
          this.update(event);
        }
      });
    }
  }

  bindDocumentTouchendListener() {
    if (!this.documentTouchendListener) {
      this.documentTouchendListener = this.renderer2.listen('document', this.touch.touchend, (event) => {
        this.isDown = false;
        this.hueDragging = false;
        this.pickerDragging = false;
        this.onModelChange(this.colorValue);
        this.onChange.emit({
          value: this.color.getHexa(),
          rgb: this.color.getRGBA(),
          hsl: this.color.getHSLA()
        });
        this.unbindDocumentTouchmoveListener();
        this.unbindDocumentTouchendListener();
      })
    }
  }

  unbindDocumentTouchmoveListener() {
    if (this.documentTouchmoveListener) {
      this.documentTouchmoveListener();
      this.documentTouchmoveListener = null;
    }
  }

  unbindDocumentTouchendListener() {
    if (this.documentTouchendListener) {
      this.documentTouchendListener();
      this.documentTouchendListener = null;
    }
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
    if (this.pickerClickListener) {
      this.pickerClickListener();
      this.pickerClickListener = null;
    }
    if (this.hueClickListener) {
      this.hueClickListener();
      this.hueClickListener = null;
    }
    this.unbindDocumentTouchmoveListener();
    this.unbindDocumentTouchendListener();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ColorpickerComponent],
  exports: [ColorpickerComponent]
})
export class ColorPickerModule {
}
