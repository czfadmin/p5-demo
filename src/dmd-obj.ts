import { StripInfo } from './stripinfo';
import * as P5Cls from 'p5';
import { Platform } from './dmd-platform';
import { ScanDirection } from './scandirection';
export class DMDObj {

	dmdHalfHeight = 8;
	dmdHalfWidth = 55;

	motionX: number = 0;
	motionY: number = 0;
	sketch: P5Cls;

	enableTwoWay = false;

	stripInfos: StripInfo[];
	platform: Platform;


	constructor(sketch: P5Cls, platform: Platform, dmdHalfHeight: number = 8, dmdHalfWidth: number = 55) {
		this.sketch = sketch;
		this.platform = platform;
		this.dmdHalfHeight = dmdHalfHeight;
		this.dmdHalfWidth = dmdHalfWidth;
		this.stripInfos = [];
		this.calculateStripInfo();
		this.motionX = this.stripInfos[0].startLoc.x;
		this.motionY = this.stripInfos[0].startLoc.y;
	}
	draw() {
		let sketch = this.sketch;
		sketch.stroke(122, 122, 80);
		sketch.fill("rgba(50,100,20,12");
		sketch.translate(this.motionX, this.motionY);
		sketch.rotate(-sketch.cos(sketch.PI * 5 / 12));
		sketch.rect(0, 0, this.dmdHalfWidth * 2, this.dmdHalfHeight * 2);
	}

	calculateStripInfo() {
		let idx = this.platform.width - 2 * this.dmdHalfWidth / this.dmdHalfWidth;
		this.stripInfos = [];
		for (let i = 0; i < idx; i++) {
			let x = (i * 2 + 1) * this.dmdHalfWidth;
			let y = this.enableTwoWay ? (i % 2 != 0 ? this.dmdHalfHeight : this.platform.height - 2 * this.dmdHalfHeight) : this.platform.height - 2 * this.dmdHalfHeight;
			this.stripInfos.push(new StripInfo(
				{
					x: x,
					y: y,
				},
				{
					x: this.platform.width - x,
					y: this.platform.height - y,
				},
				this.enableTwoWay ? (i % 2 != 0 ? ScanDirection.UpToDown : ScanDirection.DownToUp) : ScanDirection.DownToUp))
		}
	}
}

