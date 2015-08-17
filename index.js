/// <reference path="typings/tsd.d.ts" />
var makerjs = require('makerjs');
var stackboxCorner = (function () {
    function stackboxCorner(holeRadius, rimThickness) {
        var hr = holeRadius + rimThickness;
        this.paths = {
            centerRound: new makerjs.paths.Arc([0, 0], hr, 0, 90),
            hFillet: new makerjs.paths.Arc([0, hr + holeRadius], holeRadius, 180, 270),
            wFillet: new makerjs.paths.Arc([hr + holeRadius, 0], holeRadius, 180, 270)
        };
    }
    return stackboxCorner;
})();
var stackboxInner = (function () {
    function stackboxInner(width, height, holeRadius, rimThickness) {
        var mm = makerjs.model;
        var corner = new stackboxCorner(holeRadius, rimThickness);
        this.models = {
            bottomLeft: corner,
            bottomRight: mm.move(mm.mirror(corner, true, false), [width, 0]),
            topLeft: mm.move(mm.mirror(corner, false, true), [0, height]),
            topRight: mm.move(mm.mirror(corner, true, true), [width, height])
        };
        var line = makerjs.paths.Line;
        var d = 2 * holeRadius + rimThickness;
        this.paths = {
            bottom: new line([d, -holeRadius], [width - d, -holeRadius]),
            top: new line([d, height + holeRadius], [width - d, height + holeRadius]),
            left: new line([-holeRadius, d], [-holeRadius, height - d]),
            right: new line([width + holeRadius, d], [width + holeRadius, height - d])
        };
    }
    return stackboxInner;
})();
var stackbox = (function () {
    function stackbox(width, height, holeRadius, rimThickness) {
        var mm = makerjs.models;
        var cornerRadius = holeRadius + rimThickness;
        var c2 = cornerRadius * 2;
        this.models = {
            bolts: new mm.BoltRectangle(width, height, holeRadius),
            outer: new mm.RoundRectangle(width + c2, height + c2, cornerRadius),
            inner: new stackboxInner(width, height, holeRadius, rimThickness)
        };
        this.models['outer'].origin = [-cornerRadius, -cornerRadius];
    }
    return stackbox;
})();
module.exports = stackbox;
