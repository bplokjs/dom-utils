const scrollIntoView = require('../lib/scrollIntoView').default;

describe('Query helpers', () => {

    describe('scrollIntoView', () => {

        beforeEach(() => {
            document.body.innerHTML = `
        <div id="scrollview" style="width: 200px; height: 200px; overflow: auto;">
            <div style="padding: 400px; ">
                <p id="el" style="width:50px; height: 50px; margin:0; padding: 0;">
                    test
                </p>
            <div>
        </div>
        `
        })

        it("scrollIntoView", () => {
            // scrollIntoView(el, scrollview);
            console.log(scrollview.clientWidth)
        })

    })

})