import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'free-main-echarts',
  templateUrl: './main-echarts.component.html',
  styleUrls: ['./main-echarts.component.scss']
})
export class MainEchartsComponent implements OnInit {
  option: any;
  lineOption: any;

  constructor() {
  }

  ngOnInit() {
    this.option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 20,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.lineOption = {
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };


    // this.lineOption = {
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   grid: {
    //     left: '0',
    //     right: '0',
    //     top: '10',
    //     bottom: '0',
    //     show: true,
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       axisLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         show: false
    //       },
    //       splitLine: {show: true},
    //       boundaryGap: false,
    //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //       axisLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         show: false
    //       },
    //       splitLine: {show: true}
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '邮件营销',
    //       type: 'line',
    //       stack: '总量',
    //       lineStyle: {
    //         normal: {
    //           color: '#00c1de'
    //         }
    //       },
    //       itemStyle: {
    //         normal: {
    //           borderColor: '#00c1de'
    //         }
    //       },
    //       areaStyle: {normal: {
    //         color: '#00c1de'
    //       }},
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     }
    //   ]
    // };
    // setInterval(() => {
    //   let option = {};
    //   option = Object.assign(option, this.lineOption);
    //   option['series'][0]['data'].shift();
    //   option['series'][0]['data'].push(20);
    //   this.lineOption = option;
    // }, 500);

  }

}
