const scrollIntoView = require('../lib/scrollIntoView');

describe('scrollIntoView', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="scrollview" style="width: 200px; height: 200px; overflow: auto; background: #ccc;">
            <div style="padding: 400px; ">
                <p id="el" style="width:50px; height: 50px; margin:0; padding: 0; background:#000; color: #FFF;">
                    test
                </p>
            <div>
        </div>
        `
    })

    it("scrollIntoView", () => {
        scrollIntoView(el, scrollview);
        expect(scrollview.scrollLeft).toBe(267);
        expect(scrollview.scrollTop).toBe(267);
    })

    it("scrollIntoView", () => {
        scrollview.scrollLeft = 9999;
        scrollview.scrollTop = 9999;
        scrollIntoView(el, scrollview);
        expect(scrollview.scrollLeft).toBe(400);
        expect(scrollview.scrollTop).toBe(400);
    });

    it("scrollIntoView", () => {
        scrollview.scrollTop = 9999;
        scrollIntoView(el, scrollview);
        expect(scrollview.scrollLeft).toBe(267);
        expect(scrollview.scrollTop).toBe(400);
    })

    it("scrollIntoView", () => {
        scrollview.scrollLeft = 9999;
        scrollIntoView(el, scrollview);
        expect(scrollview.scrollLeft).toBe(400);
        expect(scrollview.scrollTop).toBe(267);
    })

})

