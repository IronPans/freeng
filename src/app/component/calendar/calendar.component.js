"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var CalendarComponent = (function () {
    function CalendarComponent() {
        this.onChange = new core_1.EventEmitter();
        this.week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.drawCalendar();
    };
    CalendarComponent.prototype.getMonthDay = function (year, month) {
        // 获取当月有多少天,当月第一天是星期几
        var curDate = new Date();
        // 设置年月
        curDate.setFullYear(year);
        curDate.setMonth(month);
        curDate.setDate(0);
        var dd = curDate.getDate();
        curDate.setDate(1);
        var item = curDate.getDay();
        if (item === 0) {
            item = 7;
        }
        ;
        return {
            'total': dd,
            'day': item
        };
    };
    CalendarComponent.prototype.getCurrentDay = function () {
        // 当天是星期几
        var curDate = new Date();
        var cd = curDate.getDay();
        return cd - 1;
    };
    CalendarComponent.prototype.getSomeDay = function (d, add) {
        // 获取前一天或后一天
        var now = new Date(d);
        now.setDate(now.getDate() - add);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var m = month < 10 ? '0' + month : month;
        var day = now.getDate();
        var dd = day < 10 ? '0' + day : day;
        return {
            'y': year,
            'm': m,
            'd': dd
        };
    };
    CalendarComponent.prototype.splitNum = function (v) {
        // 切割字符
        return parseInt(v).toString();
    };
    CalendarComponent.prototype.getWeek = function (v) {
        // 返回星期几
        return this.week[Math.floor(v % 7)];
    };
    CalendarComponent.prototype.drawCalendar = function (selectYear, selectMonth) {
        if (selectYear === void 0) { selectYear = ''; }
        if (selectMonth === void 0) { selectMonth = ''; }
        // 绘制日历
        var date = new Date();
        var itemWidth = Math.floor(this.width / 7);
        if (selectYear === '') {
            var calendar = '<div id="nCalendar" class="calendar" style="width:'
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
            }
            ;
            for (var i = 0; i < this.week.length; i++) {
                calendar += '<div class="item">' + this.week[i] + '</div>';
            }
            ;
            calendar += '</div>';
            calendar += '<div class="calendar-body"></div>';
            calendar += '</div>';
            var c = this.container.nativeElement;
            if (c) {
                c.innerHTML = calendar;
                this.year = date.getFullYear();
                this.month = date.getMonth() + 1;
            }
            else {
                return;
            }
        }
        else {
            this.year = selectYear;
            this.month = selectMonth;
        }
        ;
        if (this.month >= 13) {
            this.month = 1;
            this.year += 1;
        }
        else if (this.month <= 0) {
            this.month = 12;
            this.year -= 1;
        }
        ;
        var curDate = this.format(this.year + '-' + this.month + '-' + date.getDate());
        document.querySelector('.calendar-today').innerHTML = curDate;
        var cc = document.querySelector('.calendar-body');
        cc.innerHTML = '';
        var data = this.getMonthDay(this.year, this.month);
        var first = data.day;
        var total = data.total;
        var curDay = this.splitNum(date.getDate());
        var dd = this.getSomeDay(this.year + '-' + this.month + '-1', 1);
        var rows = 6;
        var cols = 7;
        var tr = '';
        var item = '';
        // 绘制上个月日期
        if (this.sunFirst) {
            first += 1;
            first = first === 8 ? 1 : first;
        }
        ;
        for (var i = 0; i < first - 1; i++) {
            var ymd = this.year + '-' + (this.month - 1) + '-' + (dd.d - first + i + 2);
            item += '<div  class="item pass" data-value="' + ymd
                + '" data-year="' + this.year + '" data-month="'
                + (this.month - 1) + '" data-date="'
                + (dd.d - first + i + 2) + '">' + (dd.d - first + i + 2) + '</div>';
        }
        // 绘制当月日期
        for (var i = 1; i < (total + 1); i++) {
            var ymd = this.year + '-' + (this.month) + '-' + i;
            if (i.toString() === curDay && this.month === (date.getMonth() + 1)) {
                item += '<div class="item current selected" data-value="'
                    + ymd + '" data-year="' + this.year + '" data-month="'
                    + (this.month) + '" data-date="' + i + '">' + i + '</div>';
            }
            else {
                item += '<div  class="item" data-value="' + ymd + '" data-year="'
                    + this.year + '" data-month="' + (this.month)
                    + '" data-date="' + i + '">' + i + '</div>';
            }
        }
        ;
        // 绘制下个月日期
        var both = total + first - 1;
        var b1 = (rows - 1) * cols;
        var b2 = rows * cols;
        if (both < b1) {
            for (var i = 0; i < (b1 - both); i++) {
                var ymd = this.year + '-' + (this.month + 1) + '-' + (i + 1);
                item += '<div  class="item future" data-value="'
                    + ymd + '" data-year="' + this.year + '" data-month="'
                    + (this.month + 1) + '" data-date="' + (i + 1) + '">' + (i + 1) + '</div>';
            }
        }
        else if (both > b1) {
            for (var i = 0; i < b2 - both; i++) {
                var ymd = this.year + '-' + (this.month + 1) + '-' + (i + 1);
                item += '<div  class="item future"  data-value="'
                    + ymd + '" data-year="' + this.year + '" data-month="'
                    + (this.month + 1) + '" data-date="' + (i + 1) + '">' + (i + 1) + '</div>';
            }
        }
        ;
        cc.innerHTML = item;
        var items = document.getElementById('nCalendar').getElementsByClassName('item');
        for (var i = 0; i < items.length; i++) {
            items[i]['style'].width = itemWidth + 'px';
            items[i]['style'].height = itemWidth + 'px';
            items[i]['style'].lineHeight = itemWidth + 'px';
            if (i > 6) {
                items[i].setAttribute('data-index', (i - 6) + '');
            }
        }
        ;
        this.addClickEvent();
        this.selectDate = this.format(document.querySelector('.calendar-today').textContent);
        this.onChange.emit(this.selectDate);
    };
    CalendarComponent.prototype.format = function (d) {
        d = d.split('-');
        for (var i = 0; i < d.length; i++) {
            if (parseInt(d[i]) < 10) {
                d[i] = '0' + d[i];
            }
        }
        ;
        return d.join('-');
    };
    CalendarComponent.prototype.addClickEvent = function () {
        var prev = document.querySelector('.calendar-select-prev');
        var next = document.querySelector('.calendar-select-next');
        // 前一天或后一天点击事件
        if (!this.isClick) {
            prev.addEventListener('click', function (e) {
                this.drawCalendar(this.year, this.month - 1);
                e.stopPropagation();
            });
            next.addEventListener('click', function (e) {
                this.drawCalendar(this.year, this.month + 1);
                e.stopPropagation();
            });
        }
        ;
        // 为天数添加点击事件
        this.items = document.querySelector('.calendar-body')
            .querySelectorAll('.item:not(.pass):not(.future)');
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].onclick = function () {
                var index = this.getAttribute('data-index') - 1;
                var year = this.getAttribute('data-year');
                var month = this.getAttribute('data-month');
                document.querySelector('.calendar-today').innerHTML = this.format(this.getAttribute('data-value'));
                for (var j = 0; j < this.items.length; j++) {
                    this.items[j].className = this.items[j].className.replace(' selected', '');
                }
                ;
                this.className += ' selected';
                this.onChange.emit(this.format(this.getAttribute('data-value')));
            };
        }
        ;
        this.isClick = true;
    };
    ;
    return CalendarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CalendarComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "sunFirst", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "onChange", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], CalendarComponent.prototype, "container", void 0);
CalendarComponent = __decorate([
    core_1.Component({
        selector: 'free-calendar',
        template: "<div class='free-calendar' #container></div>",
        styleUrls: ['./calendar.component.scss']
    }),
    __metadata("design:paramtypes", [])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
var CalendarModule = (function () {
    function CalendarModule() {
    }
    return CalendarModule;
}());
CalendarModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [CalendarComponent],
        exports: [CalendarComponent]
    })
], CalendarModule);
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.component.js.map