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
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.onPageChange = new core_1.EventEmitter();
        this._total = [];
        this.pageOffset = 0;
        this.activeIndex = 1;
        this.row = 10;
        this.maxPage = 5;
    }
    Object.defineProperty(PaginationComponent.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (value) {
            if (value < 0) {
                value = 1;
            }
            else if (value > this.pageCount) {
                value = this.pageCount;
            }
            this._activeIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "total", {
        get: function () {
            return this.totalRecord;
        },
        set: function (value) {
            if (value > 0) {
                this.totalRecord = value;
                this.pageCount = Math.ceil(value / this.row);
                this.countPage(this.maxPage);
                this.checkStartOrEnd();
            }
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngAfterViewInit = function () {
        if (this._activeIndex > 0) {
            this.changePage(this._activeIndex);
            this.isSet = true;
        }
    };
    PaginationComponent.prototype.countPage = function (end, start) {
        if (start === void 0) { start = 0; }
        this._total = [];
        var min = Math.min(end, this.pageCount);
        for (var i = start; i < min; i++) {
            this._total.push(i + 1);
        }
    };
    PaginationComponent.prototype.changePage = function (index) {
        var middle = Math.ceil(this.maxPage / 2);
        if (index <= 1) {
            index = 1;
        }
        else if (index >= this.getPage()) {
            index = this.getPage();
        }
        this.start = index - middle;
        this.end = Math.min((index + this.maxPage - middle), this.pageCount);
        if (index < this.maxPage) {
            this.end = this.maxPage;
        }
        if (this.end - this.start <= this.maxPage) {
            this.start = this.end - this.maxPage;
        }
        if (this.start <= 0 || index < this.maxPage) {
            this.start = 0;
        }
        this.countPage(this.end, this.start);
        this._activeIndex = index;
        this.checkStartOrEnd();
        if (this.isSet) {
            this.onPageChange.emit({
                activeIndex: this.activeIndex
            });
        }
    };
    PaginationComponent.prototype.getPage = function () {
        return Math.max(this.maxPage, this.pageCount);
    };
    PaginationComponent.prototype.changePageToNext = function () {
        if (!this.isLastPage) {
            var index = this.activeIndex + 1;
            this.changePage(index);
        }
    };
    PaginationComponent.prototype.changePageToPrev = function () {
        if (!this.isFirstPage) {
            var index = this.activeIndex - 1;
            this.changePage(index);
        }
    };
    PaginationComponent.prototype.changePageToFirst = function () {
        if (!this.isFirstPage) {
            this.changePage(1);
        }
    };
    PaginationComponent.prototype.changePageToLast = function () {
        if (!this.isLastPage) {
            this.changePage(this.pageCount);
        }
    };
    PaginationComponent.prototype.checkStartOrEnd = function () {
        this.isFirstPage = false;
        this.isLastPage = false;
        this.startEllipsis = false;
        this.endEllipsis = false;
        if (this.activeIndex === 1) {
            this.isFirstPage = true;
        }
        if (this.activeIndex === this.pageCount) {
            this.isLastPage = true;
        }
        if (this.maxPage < this.pageCount && !this.isLastPage && this.end !== this.pageCount) {
            this.endEllipsis = true;
        }
        if (this.maxPage < this.pageCount && !this.isFirstPage && this.activeIndex >= this.maxPage) {
            this.startEllipsis = true;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "maxPage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "activeIndex", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "total", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "onPageChange", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'free-pagination',
            template: "\n    <div class=\"free-pagination\">\n      <ul>\n        <free-pagination-item [disabled]=\"isFirstPage\" (click)=\"changePageToFirst()\">\n          <i class=\"fa fa-backward\"></i>\n        </free-pagination-item>\n        <free-pagination-item [disabled]=\"isFirstPage\" (click)=\"changePageToPrev()\">\n          <i class=\"fa fa-angle-left\"></i>\n        </free-pagination-item>\n        <free-pagination-item *ngIf=\"startEllipsis\">\n          1\n        </free-pagination-item>\n        <free-pagination-item [disabled]=\"true\" *ngIf=\"startEllipsis\">\n          \u2026\n        </free-pagination-item>\n        <free-pagination-item *ngFor=\"let page of _total;\" [active]=\"page === activeIndex\"\n                              (click)=\"changePage(page)\">\n          {{page}}\n        </free-pagination-item>\n        <free-pagination-item [disabled]=\"true\" *ngIf=\"endEllipsis\">\n          \u2026\n        </free-pagination-item>\n        <free-pagination-item *ngIf=\"pageCount > maxPage && !isLastPage && endEllipsis\"\n                              (click)=\"changePage(pageCount)\">\n          {{pageCount}}\n        </free-pagination-item>\n        <free-pagination-item [disabled]=\"isLastPage\" (click)=\"changePageToNext()\">\n          <i class=\"fa fa-angle-right\"></i>\n        </free-pagination-item>\n        <free-pagination-item [disabled]=\"isLastPage\" (click)=\"changePageToLast()\">\n          <i class=\"fa fa-forward\"></i>\n        </free-pagination-item>\n      </ul>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
var PaginationItemComponent = (function () {
    function PaginationItemComponent(pagination) {
        this.pagination = pagination;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PaginationItemComponent.prototype, "active", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PaginationItemComponent.prototype, "disabled", void 0);
    PaginationItemComponent = __decorate([
        core_1.Component({
            selector: 'free-pagination-item',
            template: "\n    <li class=\"free-pagination-item\" [class.free-pagination-active]=\"active\"\n        [class.free-pagination-disabled]=\"disabled\">\n      <a><ng-content></ng-content></a>\n    </li>\n  "
        }),
        __metadata("design:paramtypes", [PaginationComponent])
    ], PaginationItemComponent);
    return PaginationItemComponent;
}());
exports.PaginationItemComponent = PaginationItemComponent;
var PaginationModule = (function () {
    function PaginationModule() {
    }
    PaginationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [PaginationComponent, PaginationItemComponent],
            exports: [PaginationComponent, PaginationItemComponent]
        })
    ], PaginationModule);
    return PaginationModule;
}());
exports.PaginationModule = PaginationModule;
//# sourceMappingURL=pagination.component.js.map