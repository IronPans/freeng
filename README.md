<p align="center">
  <a href="http://ghmagical.com/freeng">
    <img width="320" src="http://oumfrpm5j.bkt.clouddn.com/freeng_logo.png">
  </a>
</p>

# FreeNG

UI Components for Angular.

[中文 README](https://github.com/IronPans/freeng/blob/master/README-zh_CN.md)

## Demo

View all the Components in action at [HomePage](https://ironpans.github.io/freeng/)

## Installation

```bash
npm install freeng --save
```

## Usage？

UI components are configured as modules, once FreeNG is downloaded and configured, modules and apis can be imported from 'freeng/freeng' shorthand in your application code.

Load both components in 'AppModule':
```typescript
import {FreengModule} from 'freeng/freeng'; //accordion

@NgModule({
  declarations: [AppComponent],
  imports: [FreengModule.forRoot()],  
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Load one components:
```typescript
import {AccordionModule} from 'freeng/freeng'; //accordion

@NgModule({
  declarations: [AppComponent],
  imports: [AccordionModule],  
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Importing from freeng/freeng will load all other components as well, to only import a specific component pattern would result in a smaller bundle size.

```js
//import {ComponentModule} from 'freeng/component/componentname/componentname.component';

import {AccordionModule} from 'freeng/component/accordion/accordion.component'; 

//import {DirectiveModule} from 'freeng/component/directivename/directivename.directive'; 

import {ButtonModule} from 'freeng/component/button/button.directive';
```

## Dependencies

FreeNG having some 3rd party dependencies(Like Chart.js). In addition, components require font-awesome for icons.

The css dependencies are as follows, note that font-awesome should be loaded before FreeNG css.

```html
<link rel="stylesheet" href="<YOUR_PATH>/font-awesome.min.css" />
<link rel="stylesheet" href="/node_modules/freeng/resources/freeng.min.css" /> 
<link rel="stylesheet" href="/node_modules/freeng/resources/themes/blue.css" />
```

## Angular CLI Integration

Angular CLI is the official CLI tool for Angular. We strongly suggest using Angular CLI when starting an Angular project.

**Dependencies**

Add FreeNG and FontAwesome as a dependency
```js
"dependencies": {
    "freeng": "^0.1.2",
    "font-awesome": "^4.7.0"
}
```

**Styles Configuration**

Configure required styles at the styles section:
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

## What's changed?

See the [Changelog](CHANGELOG.md).

## Getting Help

- [Getting Help](http://ghmagical.com/article/page/id/ZwMHNDRWAFeR)
- QQ Group：540629196

## Licence

MIT
