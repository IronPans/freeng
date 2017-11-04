import {NgModule} from '@angular/core';
import {RepeatPipe} from './repeat';

const STRING_PIPE = [
  RepeatPipe
];
@NgModule({
  declarations: STRING_PIPE,
  exports: STRING_PIPE
})
export class StringPipeModule {}
