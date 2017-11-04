import {NgModule} from '@angular/core';
import {MathPipesModule} from './math/index';
import {StringPipeModule} from './string/index';
import {ArrayPipeModule} from './array/index';
import {NumberPipeModule} from './number/index';
import {DatePipeModule} from './date/index';

export * from './math/index';
export * from './array/index';
export * from './number/index';
export * from './string/index';
export * from './date/index';

@NgModule({
  exports: [
    MathPipesModule,
    StringPipeModule,
    ArrayPipeModule,
    NumberPipeModule,
    DatePipeModule
  ]
})
export class PipesModule {}
