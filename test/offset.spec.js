const offset = require('../lib/offset').default;

describe('scrollIntoView', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="scrollview" style="padding: 100px 0 0 100px;width: 200px; height: 200px; position:relative; overflow: auto; background: #ccc;">
            <div style="padding: 400px; ">
                <p id="el" style="width:50px; height: 50px; margin:0; padding: 0; background:#000; color: #FFF;">
                    test
                </p>
            <div>
        </div>
        `
    })

    it("getOffset", () => {
        scrollview.scrollTop = 100;
        const pos = offset(el);
        console.log(pos);
        expect(pos.top).toBe(408);
        expect(pos.left).toBe(508);
    })

    it("getOffset", () => {
        scrollview.scrollTop = 9999;
        const pos = offset(el);
        console.log(pos);
        expect(pos.top).toBe(-159);
    })


    it("setOffset", () => {
        scrollview.scrollTop = 100;
        offset(el, { left: 0, top: 0 });
        const pos = offset(el);
        expect(pos.top).toBe(0);
        expect(pos.left).toBe(0);
    })
})

