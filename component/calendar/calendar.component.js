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
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
var dom_1 = require("../common/dom");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }),
    multi: true
};
var CalendarComponent = (function () {
    function CalendarComponent(domRenderer) {
        this.domRenderer = domRenderer;
        this.onChange = new core_1.EventEmitter();
        this._locale = {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        };
        this._locale_cn = {
            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
            monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        };
        this.onModelChange = function () {
        };
        this.onTouchedChange = function () {
        };
        this.lang = 'en';
        this.rows = 6;
        this.cols = 7;
        this.width = 250;
        this.firstDayOfWeek = 7;
        this.format = 'yyyy-MM-dd';
        this.years = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
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
        if (!this.inline) {
            this.width = 250;
        }
        this.itemWidth = parseFloat(((this.width - 10) / 7).toFixed(3));
        this.firstYear = this.todayDate.getFullYear();
        this.createCalendar();
        this.createMonth();
        this.isSet = true;
        this.onDocumentClickListener();
    };
    CalendarComponent.prototype.writeValue = function (value) {
        if (value) {
            this.selectDate(value);
            this.createCalendar();
        }
    };
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    CalendarComponent.prototype.createCalendar = function () {
        this.dates = [];
        if (this.currentMonth >= 13) {
            this.currentMonth = 1;
            this.currentYear += 1;
        }
        else if (this.currentMonth <= 0) {
            this.currentMonth = 12;
            this.currentYear -= 1;
        }
        var data = this.getMonthFirstDay(this.currentYear, this.currentMonth);
        var first = data.day;
        var total = data.total;
        var dd = this.getSomeDay(this.currentYear + '-' + this.currentMonth + '-1', 1);
        var curDay = this.splitNum(this.currentDay);
        if (this.firstDayOfWeek === 7) {
            first += 1;
            first = first === 8 ? 1 : first;
        }
        for (var i = 0; i < first - 1; i++) {
            var ymd = this.currentYear + '-' + (this.currentMonth - 1) + '-' + (dd.d - first + i + 2);
            this.dates.push({
                value: ymd,
                month: this.currentMonth - 1,
                date: (dd.d - first + i + 2),
                type: 'pass'
            });
        }
        for (var i = 1; i < (total + 1); i++) {
            var ymd = this.currentYear + '-' + this.currentMonth + '-' + i;
            var isToday = i === curDay;
            var type = 'current';
            var cur = new Date(ymd);
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
        var both = total + first - 1;
        var b1 = (this.rows - 1) * this.cols;
        var b2 = this.rows * this.cols;
        var futureDate = both < b1 ? b1 - both : b2 - both;
        for (var i = 0; i < futureDate; i++) {
            var ymd = this.currentYear + '-' + (this.currentMonth + 1) + '-' + (i + 1);
            this.dates.push({
                value: ymd,
                year: this.currentYear,
                month: this.currentMonth + 1,
                date: i + 1,
                type: 'future',
                selected: false
            });
        }
        var month = [];
        var week = [];
        for (var i = 0; i < this.dates.length; i++) {
            week.push(this.dates[i]);
            if (i % 7 === 6) {
                month.push(week);
                week = [];
            }
        }
        this.dates = month;
        this.selectYears = this.currentYear;
        this.createYear();
    };
    CalendarComponent.prototype.createMonth = function () {
        var month = [];
        this.months = [];
        var totalMonth = this._locale.monthNamesShort;
        for (var i = 0; i < 12; i++) {
            month.push(totalMonth[i]);
            if (i % 3 === 2) {
                this.months.push(month);
                month = [];
            }
        }
    };
    CalendarComponent.prototype.createYear = function (add) {
        if (add === void 0) { add = 0; }
        var year = [];
        this.years = [];
        this.firstYear = parseInt(this.firstYear / 10 + '', 10) * 10 + add * 10;
        for (var i = 0; i < 12; i++) {
            year.push(this.firstYear + i);
            if (i % 3 === 2) {
                this.years.push(year);
                year = [];
            }
        }
    };
    CalendarComponent.prototype.getDate = function (currentDate) {
        if (!(currentDate instanceof Date)) {
            currentDate = new Date(currentDate);
        }
        this.currentYear = currentDate.getFullYear();
        this.currentMonth = currentDate.getMonth() + 1;
        this.currentDay = currentDate.getDate();
        if (this.hourFormat === '12') {
            this.currentHour = currentDate.getHours() === 0 ? 12 : currentDate.getHours() % 12;
        }
        else {
            this.currentHour = currentDate.getHours();
        }
        this.currentMinute = currentDate.getMinutes();
        this.currentSecond = currentDate.getSeconds();
        this.currentWeek = currentDate.getDate();
    };
    CalendarComponent.prototype.getMonthFirstDay = function (year, month) {
        var curDate = new Date();
        curDate.setFullYear(year);
        curDate.setMonth(month);
        curDate.setDate(0);
        var dd = curDate.getDate();
        curDate.setDate(1);
        var item = curDate.getDay();
        if (item === 0) {
            item = 7;
        }
        return {
            'total': dd,
            'day': item
        };
    };
    CalendarComponent.prototype.getSomeDay = function (day, add) {
        var now = new Date(day);
        now.setDate(now.getDate() - add);
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        m = (m < 10 ? '0' + m : m);
        var d = now.getDate();
        d = (d < 10 ? '0' + d : d);
        return {
            'y': y,
            'm': m,
            'd': d
        };
    };
    CalendarComponent.prototype.setDate = function (date) {
        if (date === void 0) { date = new Date(); }
        if (typeof date === 'string') {
            var tokens = date.split(/\s+/);
            if (this.showTime && tokens[1]) {
                _a = tokens[1].split(':').map(function (t) {
                    var time = parseInt(t, 10);
                    if (!isNaN(time)) {
                        return time;
                    }
                }), this.currentHour = _a[0], this.currentMinute = _a[1], this.currentSecond = _a[2];
            }
            var dates = tokens[0].split(/[-\/]/gm);
            var arr = dates.map(function (d) {
                return parseInt(d, 10);
            });
            date = new Date(arr[0], arr[1] - 1, arr[2], this.currentHour, this.currentMinute, this.currentSecond);
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
        var _a;
    };
    CalendarComponent.prototype.selectYear = function (i, j, year) {
        this.itemClick = true;
        if ((!i && !j) || (i === 3 && j === 2)) {
            return;
        }
        this.monthState = true;
        this.selectYears = year;
    };
    CalendarComponent.prototype.selectMonth = function (i, j) {
        this.selectMonths = i * 3 + j + 1;
        this.monthState = false;
        this.yearState = false;
        this.itemClick = true;
        if (this.showTime) {
            this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay
                + ' ' + this.currentHour + ':' + this.currentMinute + ':' + this.currentSecond);
        }
        else {
            this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay);
        }
        this.createCalendar();
    };
    CalendarComponent.prototype.selectDate = function (value) {
        this.value = value;
        this.setDate(this.value);
        this.value = this.domRenderer.dateFormat(this.currentDate, this.format);
    };
    CalendarComponent.prototype.selectdReset = function () {
        for (var _i = 0, _a = this.dates; _i < _a.length; _i++) {
            var d = _a[_i];
            d.forEach(function (v) {
                v.selected = false;
            });
        }
    };
    CalendarComponent.prototype.yearClick = function () {
        this.yearState = true;
        this.itemClick = true;
    };
    CalendarComponent.prototype.isDateValid = function (value) {
        var regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
        if (this.showTime) {
            regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\s+\d{1,2}(:\d{1,2})*$/;
        }
        if (regExp.test(value)) {
            var d = new Date(value);
            if (d && d.getDate()) {
                return true;
            }
        }
        return false;
    };
    CalendarComponent.prototype.splitNum = function (v) {
        return parseInt(v, 10);
    };
    CalendarComponent.prototype.formatZero = function (value) {
        if (parseInt(value, 10) < 10) {
            value = '0' + value;
        }
        return value;
    };
    CalendarComponent.prototype.toPrev = function (event) {
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
    };
    CalendarComponent.prototype.toNext = function (event) {
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
    };
    CalendarComponent.prototype.toToady = function () {
        this.selectDate(this.todayDate);
        this.createCalendar();
    };
    CalendarComponent.prototype.onDateSelect = function (event, item, index) {
        if (item.type === 'current') {
            this.selectdReset();
            this.selectDate(item.value);
            item.selected = true;
            this.onModelChange(this.value);
            this.close();
        }
        else {
            this.itemClick = true;
        }
    };
    CalendarComponent.prototype.onInputChange = function (value) {
        if (this.isDateValid(value)) {
            this.setDate(value);
            this.createCalendar();
        }
    };
    CalendarComponent.prototype.onTimeFocus = function () {
        this.itemClick = true;
    };
    CalendarComponent.prototype.onTimeChange = function (type, value) {
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
        this.currentDate = new Date(this.currentYear, this.currentMonth + 1, this.currentDay, this.currentHour, this.currentMinute, this.currentSecond);
        this.setDate(this.currentDate);
        this.value = this.domRenderer.dateFormat(this.currentDate, this.format);
    };
    CalendarComponent.prototype.onClick = function () {
        if (this.disabled) {
            return;
        }
        if (!this.opened) {
            this.open();
        }
        else {
            this.close();
        }
    };
    CalendarComponent.prototype.open = function () {
        if (!this.inline) {
            this.selfClick = true;
            this.opened = true;
        }
    };
    CalendarComponent.prototype.close = function () {
        if (!this.inline) {
            this.opened = false;
            this.selfClick = false;
            this.yearState = false;
            this.monthState = false;
        }
    };
    CalendarComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.inline) {
            this.bindDocumentClickListener = this.domRenderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                _this.itemClick = false;
                _this.selfClick = false;
            });
        }
    };
    CalendarComponent.prototype.offDocumentClickListener = function () {
        if (this.bindDocumentClickListener) {
            this.bindDocumentClickListener();
            this.bindDocumentClickListener = null;
        }
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.offDocumentClickListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CalendarComponent.prototype, "firstDayOfWeek", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "hourFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CalendarComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "pholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalendarComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalendarComponent.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalendarComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarComponent.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalendarComponent.prototype, "showTime", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalendarComponent.prototype, "onChange", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'free-calendar',
            template: "\n    <div class=\"free-calendar\" [class.free-calendar-inline]=\"inline\">\n      <div class=\"free-select-input\" (click)=\"onClick()\" *ngIf=\"!inline\">\n        <input type=\"text\" placeholder=\"{{pholder}}\" #target (input)=\"onInputChange(target.value)\"\n               value=\"{{value}}\" [readonly]=\"readonly\">\n      </div>\n      <div class=\"free-calendar-wrapper\" *ngIf=\"inline || opened\"\n           [style.width.px]=\"width\" [@selectState]=\"'in'\">\n        <div class=\"free-calendar-panel\">\n          <div class=\"free-calendar-header\">\n            <div class=\"calendar-select\">\n              <div class=\"calendar-select-prev\" (click)=\"toPrev($event)\">\n                <i class=\"fa fa-angle-left \"></i>\n              </div>\n            </div>\n            <div class=\"calendar-today\" (click)=\"yearClick()\">\n              <div *ngIf=\"!yearState && !monthState\">\n                <span *ngIf=\"lang === 'en'; else cn\">\n                  {{_selectLocale.monthNamesShort[currentMonth - 1]}} {{currentYear}}\n                </span>\n                <ng-template #cn>\n                  <span>{{currentYear}} {{_selectLocale.monthNamesShort[currentMonth - 1]}}</span>\n                </ng-template>\n              </div>\n              <div *ngIf=\"yearState && !monthState\" class=\"free-calendar-years\">\n                {{firstYear}} - {{firstYear + 9}}</div>\n              <div *ngIf=\"monthState\" class=\"free-calendar-years\">{{selectYears}}\n              </div>\n            </div>\n            <div class=\"calendar-select\">\n              <div class=\"calendar-select-next\" (click)=\"toNext($event)\">\n                <i class=\"fa fa-angle-right\"></i></div>\n            </div>\n          </div>\n          <div class=\"free-calendar-table\">\n            <table>\n              <thead>\n              <tr>\n                <th class=\"item\" [style.width.px]=\"itemWidth\" *ngFor=\"let w of _week\">{{w}}</th>\n              </tr>\n              </thead>\n              <tbody class=\"calendar-body\">\n                <tr *ngFor=\"let week of dates\">\n                  <td class=\"item {{day.type}}\" [style.width.px]=\"itemWidth\" title=\"{{day.value}}\"\n                      *ngFor=\"let day of week;index as i\"\n                      [ngClass]=\"{selected: day.selected, today: day.today}\"\n                      (click)=\"onDateSelect($event, day, i)\">\n                    {{day.date}}\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"free-calendar-footer\">\n              <div class=\"free-calendar-time\" *ngIf=\"showTime\">\n                Time:\n                <div class=\"free-calendar-time-wrapper\">\n                  <span><input type=\"number\" #hour value=\"{{formatZero(currentHour)}}\"\n                               (focus)=\"onTimeFocus()\" (input)=\"onTimeChange('h', hour.value)\"></span>\n                  :<span><input type=\"number\" #minute value=\"{{formatZero(currentMinute)}}\"\n                                (focus)=\"onTimeFocus()\" (input)=\"onTimeChange('m', minute.value)\"></span>\n                  :<span><input type=\"number\" #second value=\"{{formatZero(currentSecond)}}\"\n                                (focus)=\"onTimeFocus()\" (input)=\"onTimeChange('s', second.value)\"></span>\n                </div>\n              </div>\n              <span (click)=\"toToady()\">Now</span>\n            </div>\n          </div>\n          <div class=\"free-calendar-year\" *ngIf=\"yearState\">\n            <table>\n              <tbody>\n              <tr *ngFor=\"let year of years;index as i\">\n                <td *ngFor=\"let y of year;index as j\" (click)=\"selectYear(i, j, y - 1)\">{{y - 1}}</td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n          <div class=\"free-calendar-month\" *ngIf=\"monthState\">\n            <table>\n              <tbody>\n              <tr *ngFor=\"let month of months; index as i\">\n                <td *ngFor=\"let m of month; index as j\" (click)=\"selectMonth(i, j)\">\n                  <span *ngIf=\"lang === 'en'; else cn\">\n                  {{m}}\n                </span>\n                  <ng-template #cn>\n                    <span>{{_selectLocale.monthNamesShort[i * 3 + j]}}</span>\n                  </ng-template>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('selectState', [
                    animations_1.state('in', animations_1.style({
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.transition(':enter', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'translate3d(0, 80px, 0)'
                        }), animations_1.animate('.4s cubic-bezier(.25,.8,.25,1)')
                    ]),
                    animations_1.transition(':leave', animations_1.animate('.1s', animations_1.style({
                        opacity: 0
                    })))
                ])
            ],
            providers: [dom_1.DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [CalendarComponent],
            exports: [CalendarComponent]
        })
    ], CalendarModule);
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.component.js.map