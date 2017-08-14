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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ChartComponent = (function () {
    function ChartComponent() {
        this.onDataSelect = new core_1.EventEmitter();
    }
    Object.defineProperty(ChartComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.reInit();
        },
        enumerable: true,
        configurable: true
    });
    ChartComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasViewChild.nativeElement;
        this.initChart();
    };
    ChartComponent.prototype.initChart = function () {
        this.chart = new Chart(this.canvas, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    };
    ChartComponent.prototype.getCanvas = function () {
        return this.canvas;
    };
    ChartComponent.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    ChartComponent.prototype.generateLegend = function () {
        if (this.chart) {
            this.chart.generateLegend();
        }
    };
    ChartComponent.prototype.reInit = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    ChartComponent.prototype.refresh = function () {
        if (this.chart) {
            this.chart.update();
        }
    };
    ChartComponent.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    ChartComponent.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "options", void 0);
    __decorate([
        core_1.ViewChild('canvas'),
        __metadata("design:type", core_1.ElementRef)
    ], ChartComponent.prototype, "canvasViewChild", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChartComponent.prototype, "onDataSelect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ChartComponent.prototype, "data", null);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'free-chart',
            template: "\n    <div class=\"free-chart\">\n      <canvas [attr.width]=\"width\" [attr.height]=\"height\" #canvas (click)=\"onCanvasClick($event)\"></canvas>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
var ChartModule = (function () {
    function ChartModule() {
    }
    ChartModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ChartComponent],
            exports: [ChartComponent]
        })
    ], ChartModule);
    return ChartModule;
}());
exports.ChartModule = ChartModule;
//# sourceMappingURL=chart.component.js.map