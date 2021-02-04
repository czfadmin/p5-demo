import { ScanDirection } from './scandirection';
export class StripInfo {
	startLoc: DPoint;
	endLoc: DPoint;
	scanDirection: ScanDirection;
	constructor(startLoc: DPoint, endLoc: DPoint, scanDirection: ScanDirection) {
		this.startLoc = startLoc;
		this.endLoc = endLoc;
		this.scanDirection = scanDirection;
	}
}
export interface DPoint {
	x: number;
	y: number;
}