<p align="center">
  <a href="http://ghmagical.com/freeng">
    <img width="320" src="http://oumfrpm5j.bkt.clouddn.com/freeng_logo.png">
  </a>
</p>

# FreeNG

Angular 4的UI 组件。

## 实例

在[HomePage](http://ghmagical.com/freeng/releases/version/v0.2.1/)查看所有的组件

## 安装

```bash
npm install freeng --save
```

## 如何使用？

一旦FreeNG被下载和配置，我们就可以导入需要的模块。

在“AppModule”导入所有组件:
```typescript
import {FreengModule} from 'freeng/freeng'; //accordion

@NgModule({
  declarations: [AppComponent],
  imports: [FreengModule.forRoot()],  
  bootstrap: [AppComponent]
})
export class AppModule {}
```

导入一个组件模块：
```typescript
import {AccordionModule} from 'freeng/freeng'; //accordion

@NgModule({
  declarations: [AppComponent],
  imports: [AccordionModule],  
  bootstrap: [AppComponent]
})
export class AppModule {}
```

从freeng/freeng导入将加载所有其他组件，只导入特定的组件可以导入较小bundle。
```js
//import {ComponentModule} from 'freeng/component/componentname/componentname.component';

import {AccordionModule} from 'freeng/component/accordion/accordion.component'; 

//import {DirectiveModule} from 'freeng/component/directivename/directivename.directive'; 

import {ButtonModule} from 'freeng/component/button/button.directive';
```

## 依赖

FreeNG具有一些第三方依赖关系（像Chart.js一样）。 此外，组件需要字体 - 图标的字体。

css依赖关系如下，请注意，在FreeNG css之前应该加载font-awesome。

```html
<link rel="stylesheet" href="<YOUR_PATH>/font-awesome.min.css" />
<link rel="stylesheet" href="/node_modules/freeng/resources/freeng.min.css" /> 
<link rel="stylesheet" href="/node_modules/freeng/resources/themes/blue.css" />
```

## Angular CLI

Angular CLI是Angular的官方CLI工具。 我们强烈建议在启动Angular项目时使用Angular CLI。

**依赖**

添加FreeNG和FontAwesome作为依赖:
```js
"dependencies": {
    "freeng": "^0.1.2",
    "font-awesome": "^4.7.0"
}
```

**样式配置**

配置所需的样式:
```js
"styles": [
    "styles.css"
]
```

**styles.css**

```css
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import '../node_modules/freeng/resources/freeng.min.css';
@import '../node_modules/freeng/resources/themes/blue.css';
```

## 有什么变化?

查看[Changelog](CHANGELOG.md).

## 帮助

- [Getting Help](http://ghmagical.com/article/page/id/ZwMHNDRWAFeR)
- QQ Group：540629196

## Licence

MIT License
