import {Location} from '@angular/common';
import {Component, NgModule, OnInit} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {IconModule} from '../../component/icon/icon.component';

@Component({
  selector: 'free-main-error',
  templateUrl: './main-error.component.html',
  styleUrls: ['./main-error.component.scss']
})
export class MainErrorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this.location.back();
  }

}

@NgModule({
  imports: [
    GridModule,
    IconModule
  ],
  declarations: [MainErrorComponent]
})

export class MainErrorModule {}
