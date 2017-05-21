import {CommonModule} from '@angular/common';
import { NgModule, Component, OnInit, Input, Output,
    EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'free-calendar',
  template: `<div class='free-calendar' #container></div>`,
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() width: number;
  @Input() sunFirst: boolean;
  @Output() onChange = new EventEmitter();
  week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  @ViewChild('container') container: ElementRef;
  selectDate;
  year;
  month;
  items;
  isClick;
  constructor() { }

  ngOnInit() {
    this.drawCalendar();
  }

  getMonthDay(year, month) {
    // 获取当月有多少天,当月第一天是星期几
    const curDate = new Date();
    // 设置年月
    curDate.setFullYear(year);
    curDate.setMonth(month);
    curDate.setDate(0);
    const dd = curDate.getDate();
    curDate.setDate(1);
    let item = curDate.getDay();
    if (item === 0) {
      item = 7;
    };
    return {
      'total': dd,
      'day': item
    };
  }

  getCurrentDay() {
    // 当天是星期几
    const curDate = new Date();
    const cd = curDate.getDay();
    return cd - 1;
  }

  getSomeDay(d, add) {
    // 获取前一天或后一天
    const now = new Date(d);
    now.setDate(now.getDate() - add);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const m = month < 10 ? '0' + month : month;
    const day = now.getDate();
    const dd = day < 10 ? '0' + day : day;
    return {
      'y': year,
      'm': m,
      'd': dd
    };
  }

  splitNum(v) {
    // 切割字符
    return parseInt(v).toString();
  }
  getWeek(v) {
    // 返回星期几
    return this.week[Math.floor(v % 7)];
  }

  drawCalendar(selectYear = '', selectMonth = '') {
    // 绘制日历
    const date = new Date();
    const itemWidth = Math.floor(this.width / 7);
    if (selectYear === '') {
      let calendar = '<div id="nCalendar" class="calendar" style="width:'
        + this.width + 'px;"><div class="calendar-tool">';
      calendar += '<div class="calendar-select"><div class="calendar-select-prev">';
      calendar += '<i class="ion ion-chevron-left"></i></div></div>';
      calendar += '<div class="calendar-today"></div>';
      calendar += '<div class="calendar-select"><div class="calendar-select-next">';
      calendar += '<i class="ion ion-chevron-right"></i></div></div></div>';
      calendar += '<div class="calendar-header">';
      if (this.sunFirst) {
        this.week.unshift(this.week[this.week.length - 1]);
        this.week.pop();
      };
      for (let i = 0; i < this.week.length; i++) {
        calendar += '<div class="item">' + this.week[i] + '</div>';
      };
      calendar += '</div>';
      calendar += '<div class="calendar-body"></div>';
      calendar += '</div>';
      const c = this.container.nativeElement;
      if (c) {
        c.innerHTML = calendar;
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
      } else {
        return;
      }
    } else {
      this.year = selectYear;
      this.month = selectMonth;
    };

    if (this.month >= 13) {
      this.month = 1;
      this.year += 1;
    } else if (this.month <= 0) {
      this.month = 12;
      this.year -= 1;
    };
    const curDate = this.format(this.year + '-' + this.month + '-' + date.getDate());
    document.querySelector('.calendar-today').innerHTML = curDate;
    const cc = document.querySelector('.calendar-body');
    cc.innerHTML = '';
    const data = this.getMonthDay(this.year, this.month);
    let first = data.day;
    const total = data.total;
    const curDay = this.splitNum(date.getDate());
    const dd: any = this.getSomeDay(this.year + '-' + this.month + '-1', 1);
    const rows = 6;
    const cols = 7;
    const tr = '';
    let item = '';
    // 绘制上个月日期
    if (this.sunFirst) {
      first += 1;
      first = first === 8 ? 1 : first;
    };
    for (let i = 0; i < first - 1; i++) {
      const ymd = this.year + '-' + (this.month - 1) + '-' + (dd.d - first + i + 2);
      item += '<div  class="item pass" data-value="' + ymd
        + '" data-year="' + this.year + '" data-month="'
        + (this.month - 1) + '" data-date="'
        + (dd.d - first + i + 2) + '">' + (dd.d - first + i + 2) + '</div>';
    }
    // 绘制当月日期
    for (let i = 1; i < (total + 1); i++) {
      const ymd = this.year + '-' + (this.month) + '-' + i;
      if (i.toString() === curDay && this.month === (date.getMonth() + 1)) {
        item += '<div class="item current selected" data-value="'
          + ymd + '" data-year="' + this.year + '" data-month="'
          + (this.month) + '" data-date="' + i + '">' + i + '</div>';
      } else {
        item += '<div  class="item" data-value="' + ymd + '" data-year="'
          + this.year + '" data-month="' + (this.month)
          + '" data-date="' + i + '">' + i + '</div>';
      }
    };
    // 绘制下个月日期
    const both = total + first - 1;
    const b1 = (rows - 1) * cols;
    const b2 = rows * cols;
    if (both < b1) {
      for (let i = 0; i < (b1 - both); i++) {
        const ymd = this.year + '-' + (this.month + 1) + '-' + (i + 1);
        item += '<div  class="item future" data-value="'
          + ymd + '" data-year="' + this.year + '" data-month="'
          + (this.month + 1) + '" data-date="' + (i + 1) + '">' + (i + 1) + '</div>';
      }
    } else if (both > b1) {
      for (let i = 0; i < b2 - both; i++) {
        const ymd = this.year + '-' + (this.month + 1) + '-' + (i + 1);
        item += '<div  class="item future"  data-value="'
          + ymd + '" data-year="' + this.year + '" data-month="'
          + (this.month + 1) + '" data-date="' + (i + 1) + '">' + (i + 1) + '</div>';
      }
    };
    cc.innerHTML = item;
    const items: NodeListOf<Element> = document.getElementById('nCalendar').getElementsByClassName('item');
    for (let i = 0; i < items.length; i++) {
      items[i]['style'].width = itemWidth + 'px';
      items[i]['style'].height = itemWidth + 'px';
      items[i]['style'].lineHeight = itemWidth + 'px';
      if (i > 6) {
        items[i].setAttribute('data-index', (i - 6) + '');
      }
    };
    this.addClickEvent();
    this.selectDate = this.format(document.querySelector('.calendar-today').textContent);
    this.onChange.emit(this.selectDate);
  }

  format(d) {
    d = d.split('-');
    for (let i = 0; i < d.length; i++) {
      if (parseInt(d[i]) < 10) {
        d[i] = '0' + d[i];
      }
    };
    return d.join('-');
  }
  addClickEvent() {
    const prev = document.querySelector('.calendar-select-prev');
    const next = document.querySelector('.calendar-select-next');
    // 前一天或后一天点击事件
    if (!this.isClick) {
      prev.addEventListener('click', function(e) {
        this.drawCalendar(this.year, this.month - 1);
        e.stopPropagation();
      });
      next.addEventListener('click', function(e) {
        this.drawCalendar(this.year, this.month + 1);
        e.stopPropagation();
      });
    };
    // 为天数添加点击事件
    this.items = document.querySelector('.calendar-body')
         .querySelectorAll('.item:not(.pass):not(.future)');
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].onclick = function() {
        const index = this.getAttribute('data-index') - 1;
        const year = this.getAttribute('data-year');
        const month = this.getAttribute('data-month');
        document.querySelector('.calendar-today').innerHTML = this.format(this.getAttribute('data-value'));
        for (let j = 0; j < this.items.length; j++) {
          this.items[j].className = this.items[j].className.replace(' selected', '');
        };
        this.className += ' selected';
        this.onChange.emit(this.format(this.getAttribute('data-value')));
      };
    };
    this.isClick = true;
  };
}
@NgModule({
  imports: [CommonModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})

export class CalendarModule {}
