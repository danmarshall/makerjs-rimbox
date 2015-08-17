var makerjs = require('makerjs');
var stackbox = require('./index.js');

var model = new stackbox(100, 100, 3, 2);

console.log(makerjs.exporter.toSVG(model));

