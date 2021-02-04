import * as P5Cls from 'p5';
import { Platform } from './dmd-platform';
import { DMDObj } from './dmd-obj';
import 'bootstrap';
import './style.scss'
import { StripInfo } from './stripinfo';
import { ScanDirection } from './scandirection';

function buildP5Cls(sketch: (...args: any[]) => any, node?: HTMLElement): P5Cls {
	return new P5Cls(sketch, node);
}

function createComponent(title: string, elName: string = "div", parent?: HTMLElement, cls?: string[]): HTMLElement {
	var element = document.createElement(elName);
	parent !== undefined ? parent.appendChild(element) : document.body.appendChild(element);
	if (cls !== undefined && cls !== null) {
		cls.forEach(it => {
			element.classList.add(it)
		});
	}
	return element;
}

function createMainContainer(): HTMLElement {
	var main = document.createElement("main")
	main.classList.add("row");
	return main;
}
var mainContainer = createMainContainer();
var operationContainer = createComponent("operation", "div", mainContainer, ["col-md-4"])
var p51Div = createComponent("p51", "div", mainContainer, ["w-100", "text-center", "col-md-8"]);
var p51 = buildP5Cls((sketch: P5Cls) => {
	let platform: Platform;
	let dmdObj: DMDObj;
	let currentIndex = 0;
	let currentStripInfo: StripInfo;
	let dmdObjLocInfo: P5Cls.Element;
	sketch.setup = () => {
		platform = new Platform(sketch, 0, 0, 720, 480);
		dmdObj = new DMDObj(sketch, platform);
		sketch.createCanvas(platform.width, platform.height);
		sketch.frameRate(30);

		let twoWayBtn = sketch.createButton('TwoWay');
		twoWayBtn.addClass("btn");
		twoWayBtn.addClass("btn-primary");
		twoWayBtn.addClass("m-1")
		twoWayBtn.mouseClicked((param) => {
			dmdObj.enableTwoWay = !dmdObj.enableTwoWay;
			dmdObj.calculateStripInfo();
			currentIndex = 0;
			currentStripInfo = dmdObj.stripInfos[currentIndex];
			UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
		});
		twoWayBtn.parent(operationContainer);
		currentStripInfo = dmdObj.stripInfos[currentIndex];
		dmdObjLocInfo = sketch.createElement("h4", `Now Loc :(${dmdObj.motionX},${dmdObj.motionY})`);
		dmdObjLocInfo.addClass("m-1")
		dmdObjLocInfo.addClass("text-center");
		dmdObjLocInfo.parent(operationContainer);
	};
	sketch.draw = () => {
		sketch.background(0);
		sketch.stroke(255, 153, 0);
		sketch.fill('rgba(0,255,0,0.25)');
		platform.draw(dmdObj);

		if (dmdObj.enableTwoWay) {
			if (currentStripInfo.scanDirection === ScanDirection.DownToUp && dmdObj.motionY <= currentStripInfo.endLoc.y || currentStripInfo.scanDirection === ScanDirection.UpToDown && dmdObj.motionY >= currentStripInfo.endLoc.y) {
				currentIndex++;
				if (currentIndex <= dmdObj.stripInfos.length - 1) {
					currentStripInfo = dmdObj.stripInfos[currentIndex];
					UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
				} else {
					currentIndex = 0;
					currentStripInfo = dmdObj.stripInfos[currentIndex];
					UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
				}
			}
		} else {
			if (dmdObj.motionY <= currentStripInfo.endLoc.y) {
				currentIndex++;
				if (currentIndex <= dmdObj.stripInfos.length - 1) {
					currentStripInfo = dmdObj.stripInfos[currentIndex];
					UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
				} else {
					currentIndex = 0;
					currentStripInfo = dmdObj.stripInfos[currentIndex];
					UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
				}
			}
		}
		if (dmdObj.motionX > platform.width - dmdObj.dmdHalfWidth * 2) {
			currentIndex = 0;
			currentStripInfo = dmdObj.stripInfos[currentIndex];
			UpdateDmdLocInPlatform(dmdObj, currentStripInfo);
		}

		if (currentStripInfo.scanDirection === ScanDirection.DownToUp) {
			dmdObj.motionY -= 2;
		} else {
			dmdObj.motionY += 2;
		}
		dmdObjLocInfo.html(`Now Loc :(${dmdObj.motionX},${dmdObj.motionY})`);
		dmdObj.draw();
	};
}, p51Div);

function UpdateDmdLocInPlatform(dmdObj: DMDObj, stripInfo: StripInfo) {
	dmdObj.motionX = stripInfo.startLoc.x;
	dmdObj.motionY = stripInfo.startLoc.y;
}

document.body.appendChild(mainContainer);




