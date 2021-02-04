import * as P5Cls from 'p5';
import { DMDObj } from './dmd-obj';

export class Platform {
	xLoc = 0;
	yLoc = 0;
	width = 0;
	height = 0;

	sketch: P5Cls;

	constructor(sketch: P5Cls, x: number, y: number, width: number, height: number) {
		this.xLoc = x;
		this.yLoc = y;
		this.width = width;
		this.height = height;
		this.sketch = sketch;
	}


	draw(dmdObj: DMDObj) {
		this.sketch.rect(dmdObj.dmdHalfWidth, dmdObj.dmdHalfHeight, this.width - dmdObj.dmdHalfWidth * 2, this.height - dmdObj.dmdHalfHeight * 2);
	}
}