import {Component, HostBinding, OnInit} from '@angular/core';
import {CascaderService} from './cascader.service';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-cascader',
  templateUrl: './main-cascader.component.html',
  styleUrls: ['./main-cascader.component.css'],
  providers: [CascaderService],
  animations: [fadeInUp]
})
export class MainCascaderComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  options: any[];
  selectCity: any;
  userCity: string;
  food: any[];
  selectFood: any;
  pageTitle = 'Components-Cascader';
  constructor(public cascaderService: CascaderService) {
    this.selectCity = ['440000', '440100', '440111'];

    this.food = [{
      value: '10',
      label: '海鲜',
      children: [{
        value: '101',
        label: '鱼',
        children: [{
          value: '1011',
          label: '红烧'
        }, {
          value: '1012',
          label: '清蒸'
        }]
      }, {
        value: '102',
        label: '虾',
        children: [{
          value: '1021',
          label: '水煮'
        }, {
          value: '1022',
          label: '爆炒'
        }]
      }]
    }, {
      value: '20',
      label: '蔬菜',
      children: [{
        value: '201',
        label: '萝卜',
        children: [{
          value: '2011',
          label: '凉拌'
        }]
      }, {
        value: '202',
        label: '白菜',
        children: [{
          value: '2021',
          label: '水煮'
        }, {
          value: '2022',
          label: '清炒'
        }]
      }]
    }];
  }

  ngOnInit() {
    this.cascaderService.getCity()
      .then(res => {
        this.options = res;
      })
  }

  onSelectCity(event: any) {
    this.userCity = event.label;
  }

}
