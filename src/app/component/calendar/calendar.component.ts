import {CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef, Inject, ElementRef
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomRenderer} from '../common/dom';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'free-calendar-selector',
  template: `
    <div class="free-calendar-selector" (click)="onSelector($event)">
      <span class="fa fa-angle-up" (click)="count(1)"></span>
      <span class="free-calendar-selector-wrapper">{{getFormatValue(value)}}</span>
      <span class="fa fa-angle-down" (click)="count(-1)"></span>
    </div>
  `
})

export class CalendarSelectorComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() type: string;
  @Input()
  set value(value: number) {
    if (typeof value !== 'undefined') {
      this._value = value;
    } else {
      this.setCurrentValue();
    }
  }
  get value() {
    return this._value;
  }
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  _value: number;
  constructor(@Inject(forwardRef(() => CalendarComponent)) private calendar: CalendarComponent) {
    this.setCurrentValue();
  }

  count(add: number) {
    this._value += add;
    if (this._value < this.min) {
      this._value = this.max;
    }
    if (this._value > this.max) {
      this._value = this.min;
    }
    this.onChange.emit({
      type: this.type,
      value: this._value
    });
  }

  setCurrentValue() {
    const date = new Date();
    switch (this.type) {
      case 'h':
        this.calendar.currentHour = this.value = date.getHours();
        break;
      case 'm':
        this.calendar.currentMinute = this.value = date.getMinutes();
        break;
      case 's':
        this.calendar.currentSecond = this.value = date.getSeconds();
    }
  }

  getFormatValue(value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }

  onSelector(event: any) {
    event.stopPropagation();
  }
}

@Component({
  selector: 'free-calendar',
  template: `
    <div class="free-calendar" [class.free-calendar-inline]="inline">
      <div class="free-select-input" [class.free-select-timeonly]="timeOnly"
           (click)="onClick()" *ngIf="!inline">
        <input type="text" placeholder="{{pholder}}" #target (input)="onInputChange(target.value)"
               value="{{value}}" [readonly]="readonly">
      </div>
      <div class="free-calendar-wrapper" *ngIf="inline || opened"
           [@selectState]="'in'" [style.width]="width">
        <div *ngIf="!timeOnly; else times" class="free-calendar-panel">
          <div class="free-calendar-header">
            <div class="calendar-select">
              <div class="calendar-select-prev" (click)="toPrev($event)">
                <i class="fa fa-angle-left "></i>
              </div>
            </div>
            <div class="calendar-today" (click)="yearClick()">
              <div *ngIf="!yearState && !monthState">
                <span *ngIf="lang === 'en'; else cn">
                  {{_selectLocale.monthNamesShort[currentMonth - 1]}} {{currentYear}}
                </span>
                <ng-template #cn>
                  <span>{{currentYear}} {{_selectLocale.monthNamesShort[currentMonth - 1]}}</span>
                </ng-template>
              </div>
              <div *ngIf="yearState && !monthState" class="free-calendar-years">
                {{firstYear}} - {{firstYear + 9}}</div>
              <div *ngIf="monthState" class="free-calendar-years">{{selectYears}}
              </div>
            </div>
            <div class="calendar-select">
              <div class="calendar-select-next" (click)="toNext($event)">
                <i class="fa fa-angle-right"></i></div>
            </div>
          </div>
          <div class="free-calendar-table">
            <table>
              <thead>
              <tr>
                <th class="item" *ngFor="let w of _week">{{w}}</th>
              </tr>
              </thead>
              <tbody class="calendar-body">
                <tr *ngFor="let week of dates">
                  <td class="item {{day.type}}" title="{{day.value}}"
                      *ngFor="let day of week;index as i"
                      [ngClass]="{selected: day.selected, today: day.today}"
                      (click)="onDateSelect($event, day, i)">
                    {{day.date}}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="free-calendar-footer">
              <div class="free-calendar-time" *ngIf="showTime">
                Time:
                <div class="free-calendar-time-wrapper">
                  <span><input type="number" #hour value="{{formatZero(currentHour)}}"
                               (focus)="onTimeFocus()" (input)="onTimeChange('h', hour.value)"></span>
                  :<span><input type="number" #minute value="{{formatZero(currentMinute)}}"
                                (focus)="onTimeFocus()" (input)="onTimeChange('m', minute.value)"></span>
                  :<span><input type="number" #second value="{{formatZero(currentSecond)}}"
                                (focus)="onTimeFocus()" (input)="onTimeChange('s', second.value)"></span>
                </div>
              </div>
              <span (click)="toToady()">Now</span>
            </div>
          </div>
          <div class="free-calendar-year" *ngIf="yearState">
            <table>
              <tbody>
              <tr *ngFor="let year of years;index as i">
                <td *ngFor="let y of year;index as j" (click)="selectYear(i, j, y - 1)">{{y - 1}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="free-calendar-month" *ngIf="monthState">
            <table>
              <tbody>
              <tr *ngFor="let month of months; index as i">
                <td *ngFor="let m of month; index as j" (click)="selectMonth(i, j)">
                  <span *ngIf="lang === 'en'; else cn">
                  {{m}}
                </span>
                  <ng-template #cn>
                    <span>{{_selectLocale.monthNamesShort[i * 3 + j]}}</span>
                  </ng-template>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ng-template #times>
          <div class="free-calendar-time">
            <free-calendar-selector [min]="0" [max]="24" [type]="'h'" [value]="currentHour"
                                    (onChange)="onTimeSelectorChange($event)"></free-calendar-selector>
            <free-calendar-selector [min]="0" [max]="59" [type]="'m'" [value]="currentMinute"
                                    (onChange)="onTimeSelectorChange($event)"></free-calendar-selector>
            <free-calendar-selector [min]="0" [max]="59" [type]="'s'" [value]="currentSecond"
                                    (onChange)="onTimeSelectorChange($event)"></free-calendar-selector>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  animations: [
    trigger('selectState', [
      state('in', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate3d(0, 80px, 0)'
        }), animate('.4s cubic-bezier(.25,.8,.25,1)')
      ]),
      transition(':leave', animate('.1s', style({
        opacity: 0
      })))
    ])
  ],
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CalendarComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() firstDayOfWeek: number;
  @Input() lang: string;
  @Input() format: string;
  @Input() hourFormat: string;
  @Input() width: any;
  @Input() pholder: string;
  @Input() readonly: boolean;
  @Input() timeOnly: boolean;
  @Input()
  set minDate(value: string) {
    this._minDate = value;
    this.createCalendar();
  }
  get minDate() {
    return this._minDate;
  }
  @Input()
  set maxDate(value: string) {
    this._maxDate = value;
    this.createCalendar();
  }
  get maxDate() {
    return this._maxDate;
  }
  @Input() inline: boolean;
  @Input() disabled: boolean;
  @Input() defaultDate: string;
  @Input() showTime: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  _locale = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  _locale_cn = {
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  };
  _minDate: string;
  _maxDate: string;
  _selectLocale: any;
  _week: string[];
  currentDate: any;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
  currentWeek: number;
  todayDate: any;
  rows: number;
  cols: number;
  dates: any[];
  itemWidth: number;
  value: any;
  selfClick: boolean;
  opened: boolean;
  itemClick: boolean;
  yearState: boolean;
  monthState: boolean;
  months: any;
  years: any;
  firstYear: any;
  selectYears: number;
  selectMonths: number;
  isSet: boolean;
  bindDocumentClickListener: any;
  onModelChange: Function = () => {
  };
  onTouchedChange: Function = () => {
  };

  constructor(public domRenderer: DomRenderer, public er: ElementRef) {
    this.lang = 'en';
    this.rows = 6;
    this.cols = 7;
    this.firstDayOfWeek = 7;
    this.format = 'yyyy-MM-dd';
    this.years = [];
    this.width = 250;
  }

  ngOnInit() {
    this.isSet = true;
    if (typeof this.width === 'number') {
      this.width = this.width + 'px';
    }
    if (!this.timeOnly) {
      if (this.showTime) {
        this.format = 'yyyy-MM-dd hh:mm:ss';
      }
      this._selectLocale = this.lang.toLowerCase() === 'cn' ? this._locale_cn : this._locale;
      this._week = this._selectLocale.dayNamesShort;
      if (this.firstDayOfWeek === 1) {
        this._week.unshift(this._week[this._week.length - 1]);
        this._week.pop();
      }
      this.todayDate = new Date();
      this.setDate(this.todayDate);
      if (this.defaultDate) {
        this.setDate(this.defaultDate);
        this.value = this.domRenderer.dateFormat(this.currentDate, this.format);
      }
      this.dates = [];
      this.pholder = 'Select Time';
      // this.itemWidth = parseFloat(((this.width - 10) / 7).toFixed(3));
      this.firstYear = this.todayDate.getFullYear();
      this.createCalendar();
      this.createMonth();
    } else {
      this.width = null;
      if (this.defaultDate) {
        this.setDate(this.defaultDate);
        this.value = this.domRenderer.dateFormat(this.currentDate, 'hh:mm:ss');
      }
    }
    this.onDocumentClickListener();
  }

  writeValue(value: string) {
    if (value) {
      this.selectDate(value);
      this.createCalendar();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  createCalendar() {
    this.dates = [];
    if (this.currentMonth >= 13) {
      this.currentMonth = 1;
      this.currentYear += 1;
    } else if (this.currentMonth <= 0) {
      this.currentMonth = 12;
      this.currentYear -= 1;
    }
    const data = this.getMonthFirstDay(this.currentYear, this.currentMonth);
    let first = data.day;
    const total = data.total;
    const dd = this.getSomeDay(this.currentYear + '-' + this.currentMonth + '-1', 1);
    const curDay = this.splitNum(this.currentDay);

    if (this.firstDayOfWeek === 7) {
      first += 1;
      first = first === 8 ? 1 : first;
    }
    for (let i = 0; i < first - 1; i++) {
      const ymd = this.currentYear + '-' + (this.currentMonth - 1) + '-' + (dd.d - first + i + 2);
      this.dates.push({
        value: ymd,
        month: this.currentMonth - 1,
        date: (dd.d - first + i + 2),
        type: 'pass'
      });
    }
    for (let i = 1; i < (total + 1); i++) {
      const ymd = this.currentYear + '-' + this.currentMonth + '-' + i;
      const isToday = i === curDay;
      let type = 'current';
      const cur = new Date(ymd);
      if (this.minDate && this.isDateValid(this.minDate)) {
        type = new Date(this.minDate) < cur ? 'current' : 'pass';
      }
      if (this.maxDate && this.isDateValid(this.maxDate)) {
        type = new Date(this.maxDate) > cur ? 'current' : 'pass';
      }
      this.dates.push({
        value: ymd,
        year: this.currentYear,
        month: this.currentMonth,
        date: i,
        type: type,
        selected: isToday,
        today: isToday && this.currentMonth === (this.todayDate.getMonth() + 1)
      });
    }
    const both = total + first - 1;
    const b1 = (this.rows - 1) * this.cols;
    const b2 = this.rows * this.cols;
    const futureDate = both < b1 ? b1 - both : b2 - both;
    for (let i = 0; i < futureDate; i++) {
      const ymd = this.currentYear + '-' + (this.currentMonth + 1) + '-' + (i + 1);
      this.dates.push({
        value: ymd,
        year: this.currentYear,
        month: this.currentMonth + 1,
        date: i + 1,
        type: 'future',
        selected: false
      });
    }
    const month = [];
    let week = [];
    for (let i = 0; i < this.dates.length; i++) {
      week.push(this.dates[i]);
      if (i % 7 === 6) {
        month.push(week);
        week = [];
      }
    }
    this.dates = month;
    this.selectYears = this.currentYear;
    this.createYear();
  }

  createMonth() {
    let month = [];
    this.months = [];
    const totalMonth = this._locale.monthNamesShort;
    for (let i = 0; i < 12; i++) {
      month.push(totalMonth[i]);
      if (i % 3 === 2) {
        this.months.push(month);
        month = [];
      }
    }
  }

  createYear(add: number = 0) {
    let year = [];
    this.years = [];
    this.firstYear = parseInt(this.firstYear / 10 + '', 10) * 10 + add * 10;
    for (let i = 0; i < 12; i++) {
      year.push(this.firstYear + i);
      if (i % 3 === 2) {
        this.years.push(year);
        year = [];
      }
    }
  }

  getDate(currentDate: any) {
    if (!(currentDate instanceof Date)) {
      currentDate = new Date(currentDate);
    }
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentDay = currentDate.getDate();
    if (this.hourFormat === '12') {
      this.currentHour = currentDate.getHours() === 0 ? 12 : currentDate.getHours() % 12;
    } else {
      this.currentHour = currentDate.getHours();
    }
    this.currentMinute = currentDate.getMinutes();
    this.currentSecond = currentDate.getSeconds();
    this.currentWeek = currentDate.getDate();
  }

  getMonthFirstDay(year, month) {
    const curDate = new Date();
    curDate.setFullYear(year);
    curDate.setMonth(month);
    curDate.setDate(0);
    const dd = curDate.getDate();
    curDate.setDate(1);
    let item = curDate.getDay();
    if (item === 0) {
      item = 7;
    }
    return {
      'total': dd,
      'day': item
    };
  }

  getSomeDay(day, add) {
    const now = new Date(day);
    now.setDate(now.getDate() - add);
    const y = now.getFullYear();
    let m = now.getMonth() + 1;
    m = <any>(m < 10 ? '0' + m : m);
    let d = now.getDate();
    d = <any>(d < 10 ? '0' + d : d);
    return {
      'y': y,
      'm': m,
      'd': d
    };
  }

  setDate(date: any = new Date()) {
    const curDate = new Date();
    if (date && typeof date === 'string') {
      if (!this.timeOnly) {
        const tokens: string[] = date.trim().split(/\s+/);
        if (this.showTime && tokens[1]) {
          [this.currentHour, this.currentMinute, this.currentSecond] = tokens[1].split(':').map(t => {
            const time = parseInt(t, 10);
            if (!isNaN(time)) {
              return time;
            }
          });
        }
        const dates = tokens[0].split(/[-\/]/gm);
        const arr = dates.map(d => {
          return parseInt(d, 10);
        });
        date = new Date(arr[0], arr[1] - 1, arr[2], this.currentHour, this.currentMinute, this.currentSecond);
      } else {
        [this.currentHour, this.currentMinute, this.currentSecond] = date.split(':').map(t => {
          const time = parseInt(t, 10);
          if (!isNaN(time)) {
            return time;
          }
        });
        date = curDate;
        date.setHours(this.currentHour);
        date.setMinutes(this.currentMinute);
        date.setSeconds(this.currentSecond);
      }
    }
    this.currentDate = date;
    this.getDate(date);
    if (this.isSet) {
      this.onChange.emit({
        value: this.value,
        year: this.currentYear,
        month: this.currentMonth,
        day: this.currentDay,
        hour: this.currentHour,
        minute: this.currentMinute,
        second: this.currentSecond,
        week: this.currentWeek
      });
    }
  }

  selectYear(i: number, j: number, year: number) {
    this.itemClick = true;
    if ((!i && !j) || (i === 3 && j === 2)) {
      return;
    }
    this.monthState = true;
    this.selectYears = year;
  }

  selectMonth(i, j) {
    this.selectMonths = i * 3 + j + 1;
    this.monthState = false;
    this.yearState = false;
    this.itemClick = true;
    if (this.showTime) {
      this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay
        + ' ' + this.currentHour + ':' + this.currentMinute + ':' + this.currentSecond);
    } else {
      this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay);
    }
    this.createCalendar();
  }

  selectDate(value: any) {
    this.value = value;
    this.setDate(this.value);
    this.value = this.domRenderer.dateFormat(this.currentDate, this.format);
  }

  selectdReset() {
    for (const d of this.dates) {
      d.forEach(v => {
        v.selected = false;
      });
    }
  }

  yearClick() {
    this.yearState = true;
    this.itemClick = true;
  }

  isDateValid(value: any) {
    let regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
    if (this.showTime) {
      regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\s+\d{1,2}(:\d{1,2})*$/;
    }
    if (regExp.test(value)) {
      const d = new Date(value);
      if (d && d.getDate()) {
        return true;
      }
    }
    return false;
  }

  splitNum(v) {
    return parseInt(v, 10);
  }

  formatZero(value: any) {
    if (parseInt(value, 10) < 10) {
      value = '0' + value;
    }
    return value;
  }

  toPrev(event: any) {
    if (!this.monthState && !this.yearState) {
      this.currentMonth--;
      this.createCalendar();
    }
    if (this.monthState) {
      this.selectYears--;
    }
    if (!this.monthState && this.yearState) {
      this.createYear(-1);
    }
    event.stopPropagation();
  }

  toNext(event: any) {
    if (!this.monthState && !this.yearState) {
      this.currentMonth++;
      this.createCalendar();
    }
    if (this.monthState) {
      this.selectYears++;
    }
    if (!this.monthState && this.yearState) {
      this.createYear(1);
    }
    event.stopPropagation();
  }

  toToady() {
    this.selectDate(this.todayDate);
    this.createCalendar();
  }

  onDateSelect(event: any, item: any, index: number) {
    if (item.type === 'current') {
      this.selectdReset();
      this.selectDate(item.value);
      item.selected = true;
      this.onModelChange(this.value);
      this.close();
    } else {
      this.itemClick = true;
    }
  }

  onInputChange(value: any) {
    if (this.isDateValid(value)) {
      this.setDate(value);
      this.createCalendar();
    }
  }

  onTimeFocus() {
    this.itemClick = true;
  }

  onTimeChange(type: string, value: string) {
    switch (type) {
      case 'h':
        this.currentHour = parseInt(value, 10);
        break;
      case 'm':
        this.currentMinute = parseInt(value, 10);
        break;
      case 's':
        this.currentSecond = parseInt(value, 10);
        break;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth + 1, this.currentDay,
      this.currentHour, this.currentMinute, this.currentSecond);
    this.setDate(this.currentDate);
    this.value = this.domRenderer.dateFormat(this.currentDate, this.format);
  }

  onClick() {
    if (this.disabled) { return; }
    if (!this.opened) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    if (!this.inline) {
      this.selfClick = true;
      this.opened = true;
    }
  }

  close() {
    if (!this.inline) {
      this.opened = false;
      this.selfClick = false;
      this.yearState = false;
      this.monthState = false;
    }
  }

  onTimeSelectorChange(event: any) {
    const type = event.type;
    switch (type) {
      case 'h':
        this.currentHour = event.value;
        break;
      case 'm':
        this.currentMinute = event.value;
        break;
      case 's':
        this.currentSecond = event.value;
    }
    const date = new Date();
    date.setHours(this.currentHour);
    date.setMinutes(this.currentMinute);
    date.setSeconds(this.currentSecond);
    this.value = this.domRenderer.dateFormat(date, 'hh:mm:ss');
    this.onChange.emit({
      value: this.value,
      hour: this.currentHour,
      minute: this.currentMinute,
      second: this.currentSecond
    });
    console.log(this.value);
    this.onModelChange(this.value);
  }

  onDocumentClickListener() {
    if (!this.inline) {
      this.bindDocumentClickListener = this.domRenderer.listen('document', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.close();
        }
        this.itemClick = false;
        this.selfClick = false;
      });
    }
  }

  offDocumentClickListener() {
    if (this.bindDocumentClickListener) {
      this.bindDocumentClickListener();
      this.bindDocumentClickListener = null;
    }
  }

  ngOnDestroy() {
    this.offDocumentClickListener();
  }
}
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CalendarSelectorComponent, CalendarComponent],
  exports: [CalendarComponent]
})

export class CalendarModule {
}
