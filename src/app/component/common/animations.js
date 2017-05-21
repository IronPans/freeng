"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by root on 17-4-24.
 */
var animations_1 = require("@angular/animations");
exports.fadeInUp = animations_1.trigger('fadeInUpState', [
    animations_1.state('in', animations_1.style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
    animations_1.transition('void => *', [
        animations_1.style({
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)'
        }), animations_1.animate('.4s cubic-bezier(.25,.8,.25,1)')
    ])
]);
exports.fadeIn = animations_1.trigger('fadeInState', [
    animations_1.state('in', animations_1.style({ opacity: 1 })),
    animations_1.transition('void => *', [
        animations_1.style({ opacity: 0 }),
        animations_1.animate('.3s cubic-bezier(.35,0,.25,1)')
    ])
]);
//# sourceMappingURL=animations.js.map