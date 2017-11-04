import {NgModule} from '@angular/core';
import {MinPipe} from './min';
import {MaxPipe} from './max';
import {SumPipe} from './sum';
import {SqrtPipe} from './sqrt';
import {PowerPipe} from './pow';

export {MaxPipe} from './max';
export {MinPipe} from './min';
export {SumPipe} from './sum';
export {SqrtPipe} from './sqrt';
export {PowerPipe} from './pow';

const MATH_PIPES = [
  MaxPipe, MinPipe, SumPipe, SqrtPipe, PowerPipe
];

@NgModule({
  declarations: MATH_PIPES,
  exports: MATH_PIPES
})
export class MathPipesModule {}
