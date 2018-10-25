# bplokjs-dom-utils

## 安装

`npm install --save bplokjs-dom-utils`

## API

- css

    `const css = require('bplokjs-dom-utils/css');`

    - `css(element, propName)` 获取指定的css值
    - `css(element, [...propName])`  获取一组css属性值，返回对象: {propName: value}
    - `css(element, object)` 批量设置元素css属性
    - `css(element, propName, value)` 设置元素css属性

- classes

    `const {hasClass, addClass, removeClass, toggleClass} = require('bplokjs-dom-utils/classes')`

    - `hasClass(element, className)` 
    - `addClass(element, className)`
    - `removeClass(element, className)`
    - `toggleClass(element, className)`

- offset

    `const offset = require('bplokjs-dom-utils/offset')`

    - `offset(element)` 获取元素相对窗口的位置
    - `offset(element, rect/* rect.left, rect.top */)` 设置元素相对窗口的位置

- position

    `const position = require('bplokjs-dom-utils/position')`
    
    - `position()` 获取元素相对`offsetParent`的位置

- querySelectorAll

    `const querySelectorAll = require('bplokjs-dom-utils/querySelectorAll')`

    - `querySelectorAll(element, selector)`

- closest

   `const closest = require('bplokjs-dom-utils/closest')`

    - `closest(element, selector)`
 
- contains

   `const contains = require('bplokjs-dom-utils/contains')`

    - `contains(parent, child)`

- matches

    `const matches = require('bplokjs-dom-utils/matches')`

    - `matches(element, selector)`

- events

    `const { on, off, filter, listen } = require('bplokjs-dom-utils/events')`

    - `on(element, eventName, handler, capture)` 
    - `off(element, eventName, handler, capture)` 
    - `var unlisten = listen(element, eventName, handler, capture)` 
    - `filter(selector, handler)`

    `listen(element, 'click', filter( '.test', handler ))`

- scrollIntoView
    
    `scrollIntoView(element, [scrollParent])`

- scrollBarSize

    `scrollBarSize()`

- domReady

    `domReady(fn)`