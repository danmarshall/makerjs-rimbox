/// <reference path="typings/tsd.d.ts" />

var makerjs: typeof MakerJs = require('makerjs');

class stackboxCorner implements MakerJs.IModel {
	public paths: MakerJs.IPathMap;
	
	constructor(holeRadius: number, rimThickness: number) {	
		var hr = holeRadius + rimThickness;
		
		this.paths = {
			centerRound: new makerjs.paths.Arc([0, 0], hr, 0, 90),
			hFillet: new makerjs.paths.Arc([0, hr + holeRadius], holeRadius, 180, 270),
			wFillet: new makerjs.paths.Arc([hr + holeRadius, 0], holeRadius, 180, 270)
		};
	}	
}

class stackboxInner implements MakerJs.IModel {
	public models: MakerJs.IModelMap;
	public paths: MakerJs.IPathMap;
	
	constructor(width: number, height: number, holeRadius: number, rimThickness: number) {
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
}

class stackbox implements MakerJs.IModel {
	public models: MakerJs.IModelMap;
	
	constructor(width: number, height: number, holeRadius: number, rimThickness: number) {
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
}

export = stackbox;
