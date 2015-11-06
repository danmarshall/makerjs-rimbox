var makerjs = require('makerjs');
var Rimbox = require('./index.js');

var model = new Rimbox(100, 100, 3, 2);

console.log(makerjs.exporter.toSVG(model));

