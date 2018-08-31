# nil-dom-helpers


- css

    `const css = require('nil-dom-helpers/css');`

    - `css(element, propName)` 获取指定的css值
    - `css(element, [...propName])`  获取一组css属性值，返回对象: {propName: value}
    - `css(element, object)` 批量设置元素css属性
    - `css(element, propName, value)` 设置元素css属性

- classes

    `const {hasClass, addClass, removeClass, toggleClass} = require('nil-dom-helpers/classes')`

    - `hasClass(element, className)` 
    - `addClass(element, className)`
    - `removeClass(element, className)`
    - `toggleClass(element, className)`

- offset

    `const offset = require('nil-dom-helpers/offset')`

    - `offset(element)` 获取元素相对窗口的位置
    - `offset(element, rect/* rect.left, rect.top */)` 设置元素相对窗口的位置

- position

    `const position = require('nil-dom-helpers/position')`
    
    - `position()` 获取元素相对`offsetParent`的位置

- querySelectorAll

    `const querySelectorAll = require('nil-dom-helpers/querySelectorAll')`

    - `querySelectorAll(element, selector)`

- closest

   `const closest = require('nil-dom-helpers/closest')`

    - `closest(element, selector)`
 
- contains

   `const contains = require('nil-dom-helpers/contains')`

    - `contains(parent, child)`

- matches

    `const matches = require('nil-dom-helpers/matches')`

    - `matches(element, selector)`