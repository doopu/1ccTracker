const appDiv: HTMLElement | null = document.getElementById('app');
const debugDiv: HTMLElement | null = document.getElementById('debug');

const canvas: HTMLCanvasElement = document.getElementById('mainCanvas') as HTMLCanvasElement;
const downloadButton: HTMLAnchorElement = document.getElementById('download') as HTMLAnchorElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

canvas.style.width="800px";
canvas.style.height="640px";
canvas.onselectstart = function () {
   return false;
}

if (ctx) {
    // Dark voodoo
    window.devicePixelRatio = 2;
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(800 * scale);
    canvas.height = Math.floor(640 * scale);
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
}

let download = function(e: Event) {
    deselectBox();
    if (debugDiv) {
	debugDiv.innerHTML = '(Double-)Click a square!';
    }
    drawScreen();
    var image = canvas.toDataURL("image/png");
    (e.target! as HTMLAnchorElement).href = image;
};

const boxWidth = 16;

function drawBox(x: number, y: number, width: number = boxWidth, height: number = boxWidth, lineWidth: number = 1.0, strokeStyle: string = 'rgba(128, 128, 128, 1.0)') : void {
    if (ctx) {
	ctx.lineCap = 'butt';
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.strokeRect(x, y, width, height);
    }
}

function drawExtraHeader(x: number, y: number) : void {
    if (ctx) {
	ctx.lineCap = 'butt';
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
	ctx.lineWidth = 1.0;

	ctx.beginPath();
	ctx.lineTo(0, y);
	ctx.lineTo(canvas.width, y);
	ctx.stroke();

	drawText("EXTRA", 2, y + 8);

    }
}

function drawGFWBox(x: number, y: number) : void {
    if (ctx) {
	ctx.lineCap = 'butt';
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
	ctx.lineWidth = 2.0;
	// Do the really annoying thing of tracing around the box...
	ctx.beginPath();
	ctx.lineTo(x, y);
	ctx.lineTo(x + boxWidth * 6, y);
	ctx.lineTo(x + boxWidth * 6, y + boxWidth * 2);
	ctx.lineTo(x + boxWidth * 7, y + boxWidth * 2);
	ctx.lineTo(x + boxWidth * 7, y + boxWidth * 3);
	ctx.lineTo(x, y + boxWidth * 3);
	ctx.lineTo(x, y);
	ctx.stroke();

	// Add the special line to the EX box
	ctx.lineWidth = 1.0;
	ctx.beginPath();
	ctx.lineTo(x + boxWidth * 6 + 2, y + boxWidth * 2);
	ctx.lineTo(x + boxWidth * 6 + 2, y + boxWidth * 3 + 8);
	ctx.lineTo(x + boxWidth * 6, y + boxWidth * 3 + 8);
	ctx.stroke();
    }
}

function drawLOLKBox(x: number, y: number) : void {
    if (ctx) {
	ctx.lineCap = 'butt';
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
	ctx.lineWidth = 2.0;
	// Do the really annoying thing of tracing around the box...
	ctx.beginPath();
	ctx.lineTo(x, y + boxWidth);
	ctx.lineTo(x + boxWidth, y + boxWidth);
	ctx.lineTo(x + boxWidth, y);
	ctx.lineTo(x + boxWidth * 2, y);
	ctx.lineTo(x + boxWidth * 2, y + boxWidth);

	ctx.lineTo(x + boxWidth * 3, y + boxWidth);
	ctx.lineTo(x + boxWidth * 3, y);
	ctx.lineTo(x + boxWidth * 4, y);
	ctx.lineTo(x + boxWidth * 4, y + boxWidth);

	ctx.lineTo(x + boxWidth * 5, y + boxWidth);
	ctx.lineTo(x + boxWidth * 5, y);
	ctx.lineTo(x + boxWidth * 6, y);
	ctx.lineTo(x + boxWidth * 6, y + boxWidth);

	ctx.lineTo(x + boxWidth * 7, y + boxWidth);
	ctx.lineTo(x + boxWidth * 7, y);
	ctx.lineTo(x + boxWidth * 8, y);
	ctx.lineTo(x + boxWidth * 8, y + boxWidth * 4);

	ctx.lineTo(x, y + boxWidth * 4);
	ctx.lineTo(x, y + boxWidth);

	ctx.stroke();
    }
}

function drawHSIFSBox(x: number, y: number) : void {
    if (ctx) {
	ctx.lineCap = 'square';
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
	ctx.lineWidth = 2.0;
	// Do the really annoying thing of tracing around the box...
	ctx.beginPath();
	ctx.lineTo(x, y);
	ctx.lineTo(x + boxWidth, y);
	ctx.lineTo(x + boxWidth, y + boxWidth);
	ctx.lineTo(x + boxWidth * 4, y + boxWidth);

	ctx.lineTo(x + boxWidth * 4, y);
	ctx.lineTo(x + boxWidth * 5, y);
	ctx.lineTo(x + boxWidth * 5, y + boxWidth);
	ctx.lineTo(x + boxWidth * 8, y + boxWidth);

	ctx.lineTo(x + boxWidth * 8, y);
	ctx.lineTo(x + boxWidth * 9, y);
	ctx.lineTo(x + boxWidth * 9, y + boxWidth);
	ctx.lineTo(x + boxWidth * 12, y + boxWidth);

	ctx.lineTo(x + boxWidth * 12, y);
	ctx.lineTo(x + boxWidth * 13, y);
	ctx.lineTo(x + boxWidth * 13, y + boxWidth);
	ctx.lineTo(x + boxWidth * 16, y + boxWidth);

	ctx.lineTo(x + boxWidth * 16, y + boxWidth * 4);
	ctx.lineTo(x, y + boxWidth * 4);
	ctx.lineTo(x, y);

	ctx.stroke();

	// Draw the X dividers
	ctx.lineWidth = 1.0;
	ctx.beginPath();
	ctx.lineTo(x, y + boxWidth - 2);
	ctx.lineTo(x + boxWidth, y + boxWidth - 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineTo(x + 4 * boxWidth, y + boxWidth - 2);
	ctx.lineTo(x + 5 * boxWidth, y + boxWidth - 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineTo(x + 8 * boxWidth, y + boxWidth - 2);
	ctx.lineTo(x + 9 * boxWidth, y + boxWidth - 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineTo(x + 12 * boxWidth, y + boxWidth - 2);
	ctx.lineTo(x + 13 * boxWidth, y + boxWidth - 2);
	ctx.stroke();
    }
}

function drawBoxContents(x: number, y: number, boxName: string, colour: string) : void {
    const box = getBoxFromState([new Path2D(), boxName]);
    if (ctx) {
	if (box.done) {
	    ctx.fillStyle = colour;
	} else {
	    ctx.fillStyle = 'white';
	}
	ctx.fillRect(x, y, boxWidth, boxWidth);
    }
}

class Character {
    name: string;
    subcharacters: string[];

    constructor(name: string,
		subcharacters: string[] = []) {
	this.name = name;
	this.subcharacters = subcharacters.slice();
    }
}

class BoxObject {
    name: string;
    done: boolean;

    constructor(name: string) {
	this.name = name;
	this.done = false;
    }
}

class Game {
    name: string;
    colour: string;
    difficulties: string[];
    characters: Character[];

    constructor(name:string,
		colour: string,
		difficulties: string[],
		characters: Character[]) {
	this.name = name;
	this.colour = colour;
	this.difficulties = difficulties.slice();
	this.characters = characters.slice();
    }
}

const htrp = new Game("HRTP", "rgba(210, 60, 255, 1.0)", "LHN".split(''), [new Character("", ["MA", "J"])]);
const soew = new Game("SOEW", "rgba(32, 51, 255, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B", "C"])]);
const podd = new Game("PODD", "rgba(255, 92, 92, 1.0)", "LHN".split(''), [new Character("R"),
									  new Character("MI"),
									  new Character("M"),
									  new Character("EL"),
									  new Character("KH"),
									  new Character("KA"),
									  new Character("RI"),
									  new Character("CH"),
									  new Character("YM")]);
const ls = new Game("LS", "rgba(73, 250, 76, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B"]),
					  new Character("M", ["A", "B"])]);
const ms = new Game("MS", "rgba(194, 36, 128, 1.0)", "XLHN".split(''), [new Character("R"),
					  new Character("M"),
					  new Character("MI"),
					  new Character("YK")]);
const eosd = new Game("EOSD", "rgba(255, 51, 18, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B"]),
					      new Character("M", ["A", "B"])]);

const stb = new Game("STB", "rgba(99, 44, 0, 1.0)", ["85", "66"], [new Character("AY")]);
const ds = new Game("DS", "rgba(10, 34, 119, 1.0)", ["108", "58"], [new Character("AY"), new Character("HA")]);
const isc = new Game("ISC", "rgba(99, 44, 0, 1.0)", ["NI", "C"], [new Character("SJ")]);

const pcb = new Game("PCB", "rgba(255, 127, 191, 1.0)", "PXLHN".split(''), [new Character("R", ["A", "B"]),
							new Character("M", ["A", "B"]),
							new Character("S", ["A", "B"])]);

const imp = new Game("IN", "rgba(196, 101, 0, 1.0)", ["X", "B-L", "B-H", "B-N", "A-L", "A-H", "A-N"], [new Character("BT"),
										      new Character("MT"),
										      new Character("ST"),
										      new Character("NT"),
										      new Character("R"),
										      new Character("YU"),
										      new Character("M"),
										      new Character("A"),
										      new Character("S"),
										      new Character("RE"),
										      new Character("Y"),
										      new Character("YY")]);

const pofv = new Game("POFV", "rgba(16, 15, 107, 1.0)", "XLHN".split(''), [new Character("R"),
							 new Character("M"),
							 new Character("S"),
							 new Character("Y"),
							 new Character("RS"),
							 new Character("C"),
							 new Character("L"),
							 new Character("MY"),
							 new Character("T"),
							 new Character("AY"),
							 new Character("ME"),
							 new Character("YK"),
							 new Character("K"),
							 new Character("E")]);

const mof = new Game("MOF", "rgba(255, 168, 0, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B", "C"]),
									 new Character("M", ["A", "B", "C"])]);

const sa = new Game("SA", "rgba(0, 201, 109, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B", "C"]),
									 new Character("M", ["A", "B", "C"])]);

const ufo = new Game("UFO", "rgba(127, 191, 255, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B"]),
									   new Character("M", ["A", "B"]),
									   new Character("SN", ["A", "B"])]);

const gfw = new Game("GFW", "rgba(127, 253, 255, 1.0)", "LHN".split(''), [new Character("A1"),
									  new Character("A2"),
									  new Character("B1"),
									  new Character("B2"),
									  new Character("C1"),
									  new Character("C2"),
									  new Character("EX")]);

const td = new Game("TD", "rgba(255, 191, 127, 1.0)", "XLHN".split(''), [new Character("R"),
									  new Character("M"),
									  new Character("SN"),
									  new Character("Y")]);

const ddc = new Game("DDC", "rgba(123, 95, 135, 1.0)", "XLHN".split(''), [new Character("R", ["A", "B"]),
									   new Character("M", ["A", "B"]),
									   new Character("S", ["A", "B"])]);

const lolk = new Game("LOLK", "rgba(159, 21, 41, 1.0)", "XLHN".split(''), [new Character("R", ["P", "L"]),
									   new Character("M", ["P", "L"]),
									   new Character("SN", ["P", "L"]),
									   new Character("RS", ["P", "L"])]);

const hsifs = new Game("HSIFS", "rgba(255, 127, 39, 1.0)", "XLHN".split(''), [new Character("R", ["SP", "SM", "F", "W"]),
									      new Character("C", ["SP", "SM", "F", "W"]),
									      new Character("AY", ["SP", "SM", "F", "W"]),
									      new Character("M", ["SP", "SM", "F", "W"])]);

const wbawc = new Game("WBAWC", "rgba(224, 66, 44, 1.0)", "XLHN".split(''), [new Character("R", ["W", "O", "E"]),
									     new Character("M", ["W", "O", "E"]),
									     new Character("Y", ["W", "O", "E"])]);

const um = new Game("UM", "rgba(0, 201, 109, 1.0)", "XLHN".split(''), [new Character("R"),
									  new Character("M"),
									  new Character("S"),
									  new Character("SN")]);

const iamp = new Game("IAMP", "rgba(78, 22, 86, 1.0)", "LHN".split(''), [new Character("R"),
									 new Character("M"),
									 new Character("S"),
									 new Character("A"),
									 new Character("P"),
									 new Character("Y"),
									 new Character("RE"),
									 new Character("YY"),
									 new Character("YU"),
									 new Character("SU")]);

const swr = new Game("SWR", "rgba(255, 51, 18, 1.0)", "LHN".split(''), [new Character("R"),
									new Character("M"),
									new Character("S"),
									new Character("A"),
									new Character("P"),
									new Character("Y"),
									new Character("RE"),
									new Character("YY"),
									new Character("YU"),
									new Character("SU"),
									new Character("RS"),
									new Character("AY"),
									new Character("K"),
									new Character("I"),
									new Character("TE")]);

const hsoku = new Game("H.SOKU", "rgba(210, 210, 210, 1.0)", "LHN".split(''), [new Character("SN"),
									new Character("C"),
									new Character("ML")]);

const hm = new Game("HM", "rgba(179, 193, 148, 1.0)", "LHN".split(''), [new Character("R"),
									 new Character("M"),
									 new Character("IC"),
									 new Character("B"),
									 new Character("F"),
									 new Character("TO"),
									 new Character("N"),
									 new Character("KO"),
									 new Character("MA"),
									 new Character("KK")]);

const ulil = new Game("ULIL", "rgba(0, 136, 148, 1.0)", "LHN".split(''), [new Character("R1"),
									  new Character("M"),
									  new Character("IC"),
									  new Character("B"),
									  new Character("F"),
									  new Character("TO"),
									  new Character("N"),
									  new Character("KO"),
									  new Character("MA"),
									  new Character("KK"),
									  new Character("MO"),
									  new Character("SH"),
									  new Character("KA"),
									  new Character("SM"),
									  new Character("R2")]);

const aocf = new Game("AOCF", "rgba(201, 143, 255, 1.0)", "LHN".split(''), [new Character("R"),
									    new Character("M"),
									    new Character("N"),
									    new Character("MA"),
									    new Character("TO"),
									    new Character("F"),
									    new Character("RS"),
									    new Character("SM"),
									    new Character("TE"),
									    new Character("YU"),
									    new Character("J")]);

let lastX = 0;
let lastY = 0;

function drawText(text: string, x: number, y: number, align: CanvasTextAlign = 'left', font: string = "16px touhouFont") {
    if (ctx) {
	ctx.font = font;
	ctx.textAlign = align;
	ctx.fillStyle = 'black';
	ctx.fillText(text, x, y);
    }
}

function drawDot(colour: string, x: number, y: number, width: number = 2) {
    if (ctx) {
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.arc(x, y, width, 0, 2 * Math.PI);
	ctx.fill();
    }
}

let boxes : [Path2D, string][] = [];

function drawGame(game: Game, baseX: number, baseY: number, drawDifficulties: boolean = false) {
    // Except for certain games, we can just draw a difficulties-by-subcharacters box grid
    const height = game.difficulties.length;
    let width = 0;
    // Expand out the subcharacters while we're at it
    let expandedChars = [];
    for (let character of game.characters) {
	if (character.subcharacters.length > 0) {
	    width += character.subcharacters.length;
	    for (let subcharacter of character.subcharacters) {
		expandedChars.push(character.name + subcharacter);
	    }
	} else {
	    width += 1;
	    expandedChars.push(character.name);
	}
    }

    // Draw difficulties?
    if (drawDifficulties)
    {
	let y = 1;
	for (let difficulty of game.difficulties) {
	    drawText(difficulty, baseX + 11, baseY + (y * boxWidth), 'right');
	    y += 1;
	}
	baseX += 14;
    }

    let dotOffset = 0;
    if (width == 1)
    {
	dotOffset = -6;
    }

    // Draw game colour dot
    drawDot(game.colour, baseX + 4 + dotOffset, baseY - 5);

    // Draw game name
    drawText(game.name, baseX + 7 + dotOffset, baseY - 2);

    let lastY = 0;

    // Draw individual boxes
    let x = 0;
    let y = 0;
    for (let character of expandedChars) {
	y = 0;
	for (let difficulty of game.difficulties) {
	    // Some games need to skip boxes...
	    let skipBox = false;
	    skipBox = skipBox || (game.name === 'GFW' && character === 'EX' && difficulty !== 'N');
	    skipBox = skipBox || (game.name === 'LOLK' && !character.endsWith('L') && difficulty === 'X');
	    skipBox = skipBox || (game.name === 'HSIFS' && !character.endsWith('SP') && difficulty === 'X');

	    if (!skipBox)
	    {
		let box : Path2D = new Path2D();
		box.rect(baseX + (x * boxWidth), baseY + (y * boxWidth), boxWidth, boxWidth);
		let boxName = game.name + '-' + character + '-' + difficulty;
		boxes.push([box, boxName]);

		drawBoxContents(baseX + (x * boxWidth), baseY + (y * boxWidth), boxName, game.colour);
		drawBox(baseX + (x * boxWidth), baseY + (y * boxWidth), boxWidth, boxWidth, 1);
	    }

	    lastY = baseY + (y * boxWidth);
	    y++;
	}
	lastX = baseX + (x * boxWidth);
	x++;
    }

    // Draw outer box, except for annoying games like LOLK, GFW and HSIFS.
    if (game.name !== 'LOLK' && game.name !== 'GFW' && game.name !== 'HSIFS') {
	drawBox(baseX + 0, baseY + 0, boxWidth * width, boxWidth * height, 2);
    }

    if (game.name === 'LOLK') {
	drawLOLKBox(baseX, baseY);
    }
    if (game.name === 'GFW') {
	drawGFWBox(baseX + 0, baseY + 0);
    }
    if (game.name === 'HSIFS') {
	drawHSIFSBox(baseX, baseY);
    }

    // Draw characters
    let charX = 0;
    for (let character of game.characters) {
	if (character.subcharacters.length > 0) {
	    // If this is the first character, we need a long thick bar at the start..
	    let lineWidth = 0.05;
	    let xAdjust = 0.5;
	    if (charX == 0) {
		lineWidth = 1;
		xAdjust = 0;
	    }
	    drawBox(xAdjust + (charX * boxWidth) + baseX - 0.5, lastY + boxWidth, lineWidth, boxWidth - 2, 1);

	    drawText(character.name, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 14);
	    for (let subcharacter of character.subcharacters) {
		drawText(subcharacter, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 7, 'left', "13px touhouFont");
		charX += 1;
	    }
	    charX -= 1;
	} else {
	    // If this is the first chracter, we need a thick short bar at the start, otherwise a thin one
	    let lineWidth = 0.05;
	    let xAdjust = 0.5;
	    let textAdjust = 0;
	    if (charX == 0) {
		lineWidth = 1;
		xAdjust = 0;
	    }
	    if (game.name === 'GFW' && character.name === 'EX') {
		textAdjust = 1;
	    }
	    drawBox(xAdjust + baseX - 0.5 + (charX * boxWidth), lastY + boxWidth, lineWidth, boxWidth - 8, 1);

	    drawText(character.name, textAdjust + baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 8);
	}
	charX += 1;
    }
    // Draw closing bar
    drawBox(baseX - 0.5 + (charX * boxWidth), lastY + boxWidth, 1, boxWidth - 8, 1);

}

if (ctx) {
    downloadButton.addEventListener('click', download);

    canvas.addEventListener('click', function(event) {
	event.preventDefault();
	var ClientRect = canvas.getBoundingClientRect();
	const x = Math.round(event.clientX - ClientRect.left) * 2;
	const y = Math.round(event.clientY - ClientRect.top) * 2;
	let found = false;
	for (let box of boxes) {
	    if (ctx.isPointInPath(box[0], x, y)) {
		found = true;
		selectBox(box);
		drawScreen();
		if (debugDiv) {
		    debugDiv.innerHTML = box[1];
		}
		break;
	    }
	}
	if (!found) {
	    deselectBox();
	    if (debugDiv) {
		debugDiv.innerHTML = '(Double-)Click a square!';
	    }
	    drawScreen();
	}
	return false;
    });

    canvas.addEventListener('dblclick', function(event) {
	event.preventDefault();
	var ClientRect = canvas.getBoundingClientRect();
	const x = Math.round(event.clientX - ClientRect.left) * 2;
	const y = Math.round(event.clientY - ClientRect.top) * 2;
	let found = false;
	for (let box of boxes) {
	    if (ctx.isPointInPath(box[0], x, y)) {
		found = true;
		selectBox(box);
		toggleDone();
		break;
	    }
	}
	if (!found) {
	    deselectBox();
	    if (debugDiv) {
		debugDiv.innerHTML = '(Double-)Click a square!';
	    }
	    drawScreen();
	}
	return false;
    });

    canvas.addEventListener('contextmenu', function(event) {
	deselectBox();
	if (debugDiv) {
	    debugDiv.innerHTML = '(Double-)Click a square!';
	}
	drawScreen();
    });

}

let selectedBox : [Path2D, string] | null = null;

function setupControls() {
    const doneCheckbox: HTMLInputElement | null = document.getElementById('doneCheckbox') as HTMLInputElement;
    doneCheckbox.addEventListener('change', updateDoneStatus);

    const bgCheckbox: HTMLInputElement | null = document.getElementById('useBackgroundCheckbox') as HTMLInputElement;
    bgCheckbox.addEventListener('change', updateBgStatus);

    const fightingCheckbox: HTMLInputElement | null = document.getElementById('fightingCheckbox') as HTMLInputElement;
    fightingCheckbox.addEventListener('change', updateFightingStatus);
}

function toggleDone()
{
    if (selectedBox) {
	let currentBox = getBoxFromState(selectedBox);
	currentBox.done = !currentBox.done;
	setBoxInState(currentBox);
	selectBox(selectedBox);
	drawScreen();
    }
}

function updateDoneStatus(e: Event) {
    if (selectedBox) {
	let currentBox = getBoxFromState(selectedBox);
	currentBox.done = (e.target! as HTMLInputElement).checked;
	setBoxInState(currentBox);
	drawScreen();
    }
}

let transparentPng = true;
let showFighting = true;

function updateBgStatus(e: Event) {
    transparentPng = (e.target! as HTMLInputElement).checked;
    drawScreen();
}

function updateFightingStatus(e: Event) {
    showFighting = (e.target! as HTMLInputElement).checked;
    drawScreen();
}

function selectBox(box : [Path2D, string]) {
    selectedBox = box;
    // Enable all the buttons
    const doneCheckbox: HTMLInputElement | null = document.getElementById('doneCheckbox') as HTMLInputElement;
    doneCheckbox.disabled = false;

    // Set their state according to the selected box
    const boxObject = getBoxFromState(box);
    doneCheckbox.checked = boxObject.done;
}

function deselectBox() {
    selectedBox = null;
    // Disable the controls!
    const doneCheckbox: HTMLInputElement | null = document.getElementById('doneCheckbox') as HTMLInputElement;
    doneCheckbox.disabled = true;
    doneCheckbox.checked = false;
}

function drawHighlight() {
    if (selectedBox) {
	if (ctx) {
	    ctx.lineCap = 'butt';
	    ctx.lineJoin = 'miter';
	    ctx.strokeStyle = 'rgba(128, 0, 0, 1.0)';
	    ctx.lineWidth = 2.0;
	    ctx.stroke(selectedBox[0]);
	}
    }
}

function drawScreen() {
    boxes = [];
    if (ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!transparentPng) {
	    ctx.fillStyle = 'white';
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
    }
    drawText("1CC CHART", 2, 10);
    drawGame(htrp, 2, 40 + boxWidth, true);
    drawGame(soew, lastX + boxWidth, 40);
    drawGame(podd, lastX + boxWidth, 40 + boxWidth);
    drawGame(ls, lastX + boxWidth, 40);
    drawGame(ms, lastX + boxWidth, 40);
    drawGame(eosd, lastX + boxWidth, 40);

    drawGame(stb, lastX + 3 * boxWidth, 40 + 2 * boxWidth, true);
    drawGame(ds, lastX + 2 * boxWidth, 40 + 2 * boxWidth, true);
    drawGame(isc, lastX + 2 * boxWidth, 40 + 2 * boxWidth, true);

    drawGame(pcb, 2, 40 + 8 * boxWidth, true);
    drawGame(imp, lastX + 2 * boxWidth, 40 + 6 * boxWidth, true);
    drawGame(pofv, lastX + 2 * boxWidth, 40 + 9 * boxWidth, true);

    drawGame(mof, 2, 40 + 15 * boxWidth, true);
    drawGame(sa, lastX + boxWidth, 40 + 15 * boxWidth);
    drawGame(ufo, lastX + boxWidth, 40 + 15 * boxWidth);
    drawGame(gfw, lastX + boxWidth, 40 + 16 * boxWidth);

    drawGame(td, lastX + 3 * boxWidth, 40 + 15 * boxWidth, true);
    drawGame(ddc, lastX + boxWidth, 40 + 15 * boxWidth);
    drawGame(lolk, lastX + boxWidth, 40 + 15 * boxWidth);

    drawGame(hsifs, 2, 40 + 21 * boxWidth, true);

    drawGame(wbawc, lastX + 3 * boxWidth, 40 + 21 * boxWidth, true);
    drawGame(um, lastX + boxWidth, 40 + 21 * boxWidth);

    if (showFighting) {
	drawExtraHeader(lastX, 40 + 26.7 * boxWidth);
	drawGame(iamp, 2, 40 + 28 * boxWidth, true);
	drawGame(swr, lastX + boxWidth, 40 + 28 * boxWidth);
	drawGame(hsoku, lastX + boxWidth, 40 + 28 * boxWidth);
	drawGame(hm, lastX + boxWidth, 40 + 28 * boxWidth);

	drawGame(ulil, 2, 40 + 33 * boxWidth, true);
	drawGame(aocf, lastX + boxWidth, 40 + 33 * boxWidth);
    }

    drawHighlight();
    drawText("ORIGINAL TEMPLATE AUTHOR UNKNOWN", 798, 10, 'right');
    drawText("MAKE YOUR OWN AT TINYURL.COM/TJ9829WC", 798, 18, 'right');
}

const font = new FontFace('touhouFont', 'url(touhouFont2.ttf)');

let state : Map<string, BoxObject> = new Map();

function getBoxFromState(box: [Path2D, string]) : BoxObject {
    if (state.has(box[1])) {
	return state.get(box[1])!;
    } else {
	let newBox = new BoxObject(box[1]);
	state.set(box[1], newBox);
	return newBox;
    }
}

function setBoxInState(box: BoxObject) {
    state.set(box.name, box);
    window.localStorage.setItem('state', JSON.stringify(Array.from(state.entries())));
}

function loadState() {
    if (window.localStorage.getItem('state'))
    {
	state = new Map(JSON.parse(window.localStorage.getItem('state')!)!)!;
    }
}

font.load().then(function() {
    loadState();
    setupControls();
    if (ctx) {
	// Voodoo...
	ctx.translate(0.5, 0.5);
    }
    drawScreen();
});
