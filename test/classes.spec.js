var cls = require('../lib/classes');

function removeProperty(property, element) {
    Object.defineProperty(element, property, {
        value: undefined
    })
}

describe('Class helpers', () => {

    beforeEach(() => {
        document.body.innerHTML = `<div>
		<div id='item-1'></div>
		<div id='item-2' class="test-class"></div>
	  </div>`;
    })

    it('should add a class', () => {
        var el = document.getElementById('item-1');

        cls.addClass(el, 'my-class')

        expect(el.className).toContain('my-class')
    })

    it('should add a class properly when using a fallback path', () => {
        var el = document.getElementById('item-1')
        removeProperty('classList', el)

        cls.addClass(el, 'test-class')
        expect(cls.hasClass(el, 'test-class')).toEqual(true)

        cls.addClass(el, 'test-class')
        cls.removeClass(el, 'test-class')
        expect(cls.hasClass(el, 'test-class')).toEqual(false)

        cls.addClass(el, 'undefined')
        cls.addClass(el, 'test-class2')
        expect(cls.hasClass(el, 'test-class2')).toEqual(true)
    })

    it('should remove a class', () => {
        var el = document.getElementById('item-2');

        cls.removeClass(el, 'test-class')

        expect(el.className).toEqual('')
    })

    it('should check for a class', () => {
        expect(cls.hasClass(document.getElementById('item-2'), 'test-class')).toEqual(true)
        expect(cls.hasClass(document.getElementById('item-1'), 'test-class')).toEqual(false)
    })
})