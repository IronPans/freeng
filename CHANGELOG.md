# Change Log

[中文 CHANGELOG](https://github.com/IronPans/freeng/blob/master/CHANGELOG-zh_CN.md)

## 0.4.0(2017-10-21)

**Features**

- Add Scroll Component

**Bug Fixes**
  
- Fix Cropper's cropping frame when moving to the border, the picture is in a messy position.[#4](https://github.com/IronPans/freeng/issues/4)

## 0.3.2(2017-10-15)

**Features**

- Add Popover component
- Optimize the style of the List
- Badge
  - Optimized the style of the Badge
  - Add outline, theme, circle attribute
- Inputtext add type attribute
- Optimize Dropdown animation
- Optimize Progress style
- Optimize the style of loading
- Optimize the style of Slide

**Bug Fixes**
  
- Fixed Calendar's pholder settings are invalid

## 0.3.1(2017-10-08)

**Features**

- Optimized the style of the Panel
- Optimized the style of the Datatable
- Optimized the style of the Panel

**Bug Fixes**
  
- Fix Knob dynamic settings

## 0.3.0(2017-09-30)

**Features**

- Add Knob component
- Add the Steps component
- Optimize the Modal style
- Panel
    - Optimize the style of the Panel
    - Add the tool property for the tool
- Optimize the style of the Range
- Optimize the style of Calendar
- Optimize the style of the Button
- Progress Add the barColor and trackColor properties
- Turn off the Accordion switch animation

**Bug Fixes**
  
- Fix Spinner Set the maximum and minimum values that can not be clicked

## 0.2.5(2017-09-23)

**Features**

- Modal add onChange event.
- Slide
  - add touch property，used to control whether to turn on touch events
  - add direction property
  - Optimize Slide style

**Bug Fixes**
  
- fix Datatable bug when select all item.

## 0.2.4(2017-09-21)

**Bug Fixes**
  
- Fix the dependent module version conflict issues

## 0.2.3(2017-09-09)

**Bug Fixes**
  
- Fix the bug which TreeComponent could not be select

## 0.2.2(2017-09-08)

**Features**

- Add the share button.
- Calendar add timeOnly property to show only time selection
- Sidenav
  - add outside / navStyle / overlayBackground properties
  - direction property new top / bottom
  - Add flattening mode, the content follows the menu translation
- Modal add draggable.

**Bug Fixes**
  
- Fix the problem which the f-header component could not be found
- Export the FlowModule module globally[#3](https://github.com/IronPans/freeng/issues/3)
- Fix the problem which the button have to double-click to open Sidenav when you click the translucent background to close Sidenav.[#3](https://github.com/IronPans/freeng/issues/3)

## 0.2.1(2017-08-30)

**Bug Fixes**
  
- Fixes need to manually install highlight.js dependencies
- Fixes need to manually install chart.js dependency issues

## 0.2.0(2017-08-29)

**Features**

- add component Media
- add component Cropper
- add component Flow
- Added ratings for new stars
- Timeline new custom title
- Breadcrumb new Two custom types
- Range add the handleSize property to set the slider size
- Tree menu (Tree) Add checkbox and click event
- Add topic properties

**Bug Fixes**

- Fix the scope of the date selector problem when select
- Repair the rich text editor table selection box height disorder
- Fix the star rating (Rating) can not restore the original value of the problem
- adjust the input box (Inputtext) verify the location of the prompt

## 0.1.4(2017-08-14)

* Optimize the style

## 0.1.3(2017-08-13)

* Fix the component (Accordion, Colorpicker, Calendar) style

## 0.1.2(2017-08-12)

**Add Components**
 Colorpicker/Cascader/Calendar/Datatable/Notification/Toast/Editor/Timeline/Column/Sidenav/Draggable/Chart
 
**Update**

  * Inputtext new component validation
  * upload the component
  * Optimize picture preview style
  * The free-file tag is renamed to free-upload
  * The chipsChange event of the Chip component is modified to onChange
  * List avatar new component circle attribute
  * Tab (Tab) Added component disabled attribute and onChange event
  * The data binding of the checkbox has been modified. See example.
  
**Bug Fixes**
  * Fix the pager click no effect
  * Fix the form validation still exists when entering another page
  * The table component removes the selection box / sort / pagination three functions , Please use datatable for previous features.

## 0.1.1(2017-07-08)

**Add Components**

Slide/Chip/Shrink/Select/Pagination/Contextmenu/Particle/Fullpage

**Update**
 
  * Inputtext add validation
  * Dropdown
    1) add custom content
    2) add hover events
  * Modal
    1) add loading modal
    2) Add a delay mask modal

## 0.1.0(2017-05-21)

**UI Element**

 * Grid/Image/Typography/Shadow

**Basic Components**

 * Button/List/Card/Progress/Loading/Inputtext/Checkbox/Radio/Switch/Breadcrumb/Icon/Badge

**Extended Components**

 * Accordion/Tab/Modal/Tooltip/Spinner/Rating/Dropdown/Table/Tree

**Page**
 
 * Login/404 page
