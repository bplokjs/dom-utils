const qsa = require('../lib/querySelectorAll');

describe('Query helpers', () => {

    describe('QuerySelectorAll', () => {

        beforeEach(() => {
            document.body.innerHTML = `
        <div>
        <div class='item-class'>
          <ul id='ListID'>
            <li>1</li>
            <li class="odd">3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
      `
        })

        it("QuerySelectorAll", () => {
            expect(qsa(document, 'li').length).toEqual(3)
            expect(qsa(document, '#ListID').length).toBe(1)
            expect(qsa(document, '.item-class').length).toEqual(1)
            expect(qsa(document, '.item-class li').length).toEqual(3)
            expect(qsa(document, '.item-class li:not(.odd)').length).toEqual(2)
        })

    })

})