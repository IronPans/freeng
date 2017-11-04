import {NgModule} from '@angular/core';
import {CeilPipe} from './ceil';
import {FloorPipe} from './floor';
import {RoundPipe} from './round';

export {CeilPipe} from './ceil';
export {FloorPipe} from './floor';
export {RoundPipe} from './round';

const NUMBER_PIPE = [
  CeilPipe, FloorPipe, RoundPipe
];
@NgModule({
  declarations: NUMBER_PIPE,
  exports: NUMBER_PIPE
})
export class NumberPipeModule {}
