import {NgModule} from '@angular/core';
import {GtPipe} from './gt';
import {GtePipe} from './gte';
import {LtPipe} from './lt';
import {LtePipe} from './lte';

export {GtPipe} from './gt';
export {GtePipe} from './gte';
export {LtPipe} from './lt';
export {LtePipe} from './lte';

const ARRAY_PIPE = [
  GtPipe, GtePipe, LtPipe, LtePipe
];
@NgModule({
  declarations: ARRAY_PIPE,
  exports: ARRAY_PIPE
})
export class ArrayPipeModule {}
