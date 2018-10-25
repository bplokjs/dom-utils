const position = require('../lib/position');

describe('scrollIntoView', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="scrollview" style="margin: 100px 0 0 100px;width: 200px; height: 200px; position:relative; overflow: auto; background: #ccc;">
            <div style="padding: 400px; ">
                <p id="el" style="width:50px; height: 50px; margin:0; padding: 0; background:#000; color: #FFF;">
                    test
                </p>
            <div>
        </div>
        `
    })

    it("position", () => {
        scrollview.scrollTop = 100;
        const pos = position(el);
        expect(pos.top).toBe(400);
        expect(pos.left).toBe(400);
    })

    it("position", () => {
        scrollview.scrollTop = 9999;
        const pos = position(el);
        expect(pos.top).toBe(400);
    })

})

