# Change Log

[EN CHANGELOG](https://github.com/IronPans/freeng/blob/master/CHANGELOG.md)

## 0.2.5(2017-09-23)

**Features**

- Modal新增onChange事件
- Slide
  - 新增touch属性，用于控制是否开启触摸事件
  - 新增direction属性
  - 优化Slide的样式

**Bug Fixes**
  
- 修复Datatable反向选择时全选错误问题

## 0.2.4(2017-09-21)

**Bug Fixes**
  
- 修复依赖模块版本冲突问题

## 0.2.3(2017-09-09)

**Bug Fixes**
  
- 修复TreeComponent无法选择的错误

## 0.2.2(2017-09-08)

**Features**

- 新增分享按钮
- Calendar新增timeOnly属性，只显示时间选择
- Sidenav
  - 新增outside/navStyle/overlayBackground属性
  - direction属性新增top/bottom
  - 新增平推模式，内容跟随菜单平移
- Modal新增可拖动

**Bug Fixes**
  
- 修复找不到f-header组件的问题
- 全局导出FlowModule模块[#3](https://github.com/IronPans/freeng/issues/3)
- 修复Sidenav当点击半透明背景关闭时，打开的按钮要双击才能打开[#3](https://github.com/IronPans/freeng/issues/3)

## 0.2.1(2017-08-30)

**Bug Fixes**
  
- 修复需要手动安装highlight.js依赖
- 修复需要手动安装chart.js依赖问题

## 0.2.0(2017-08-29)

**Features**

- 新增媒体播放器
- 新增图片裁剪
- 新增流加载
- 星星评分(Rating)新增半星评分
- 时间轴(Timeline)新增自定义标题
- 面包屑导航(Breadcrumb)新增两个自定义类型
- 滑动条(Range)新增handleSize属性，用来设置滑块大小
- 树形菜单(Tree)新增复选框和点击事件
- 面板新增主题属性

**Bug Fixes**

- 修复日期选择器的范围选择问题
- 修复富文本编辑器的table选择框高度错乱
- 修复星星评分(Rating)无法恢复原值的问题
- 调整输入框(Inputtext)验证提示的位置

## 0.1.4(2017-08-14)

* 优化了样式

## 0.1.3(2017-08-13)

* 更新到npm包
* 修复组件(Accordion, Colorpicker, Calendar)样式

## 0.1.2(2017-08-12)

* 新增组件: 颜色选择器/级联选择器/日期选择器/数据表格/消息通知/消息提示/富文本编辑器/时间轴/多栏布局/侧边栏/拖放控件/图表
* 组件更新: 
  * 输入框新增组件正则验证(中文/日期/网址)
  * 碎片组件的chipsChange事件修改为onChange
  * List的avatar新增组件circle属性
  * 选项卡(Tab)新增组件disabled属性和onChange事件
  * 复选框的数据绑定进行了修改，详情请看示例。
  * 上传组件(upload): 1) free-file标签更名为free-upload  2) 优化图片预览样式

## 0.1.1(2017-07-08)

* 新增组件: 幻灯片/碎片/浮动按钮/选择框/分页器/上下文菜单/粒子效果/全屏滚动
* 组件更新: 
  * 输入框新增组件正则验证
  * 下拉菜单: 1) 新增组件自定义内容  2) 新增组件hover事件
  * 模态框: 1) 新增组件loading模态框  2) 新增组件延时隐藏模态框

## 0.1.0(2017-05-21)

* UI 元素: 栅格系统/图片/辅助元素/阴影
* 基础组件: 按钮/列表/卡片/进度条/加载条/输入框/复选框/单选框/开关/面包屑/图标/小徽章/
* 扩展组件: 面板/选项卡/模态框/提示框/数字输入框/星星评分/下拉菜单/表格/树形菜单
* 页面: 登录页/404页面
