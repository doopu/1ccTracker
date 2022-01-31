"use strict";
const world = 'my love';
const appDiv = document.getElementById('app');
const debugDiv = document.getElementById('debug');
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext("2d");
canvas.style.width = "800px";
canvas.style.height = "640px";
if (ctx) {
    // Dark voodoo
    window.devicePixelRatio = 2;
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(800 * scale);
    canvas.height = Math.floor(640 * scale);
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
}
const boxWidth = 16;
function drawBox(x, y, width = boxWidth, height = boxWidth, lineWidth = 1.0, strokeStyle = 'rgba(128, 128, 128, 1.0)') {
    if (ctx) {
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
    }
}
function drawBoxContents(x, y, boxName, colour) {
    const box = getBoxFromState([new Path2D(), boxName]);
    if (ctx) {
        ctx.fillStyle = colour;
        if (box.done) {
            ctx.fillRect(x, y, boxWidth, boxWidth);
        }
    }
}
class Character {
    constructor(name, subcharacters = []) {
        this.name = name;
        this.subcharacters = subcharacters.slice();
    }
}
class BoxObject {
    constructor(name) {
        this.name = name;
        this.done = false;
    }
}
class Game {
    constructor(name, colour, difficulties, characters) {
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
const eosd = new Game("EOSD", "red", "XLHN".split(''), [new Character("R", ["A", "B"]),
    new Character("M", ["A", "B"])]);
const stb = new Game("STB", "brown", ["85", "66"], [new Character("AY")]);
const ds = new Game("DS", "blue", ["108", "58"], [new Character("AY"), new Character("HA")]);
const isc = new Game("ISC", "brown", ["NI", "C"], [new Character("SJ")]);
const pcb = new Game("PCB", "pink", "PXLHN".split(''), [new Character("R", ["A", "B"]),
    new Character("M", ["A", "B"]),
    new Character("S", ["A", "B"])]);
const imp = new Game("IN", "brown", ["X", "B-L", "B-H", "B-N", "A-L", "A-H", "A-N"], [new Character("BT"),
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
const pofv = new Game("POFV", "blue", "XLHN".split(''), [new Character("R"),
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
let lastX = 0;
let lastY = 0;
function drawText(text, x, y, align = 'left', font = "16px touhouFont") {
    if (ctx) {
        ctx.font = font;
        ctx.textAlign = align;
        ctx.fillStyle = 'black';
        ctx.fillText(text, x, y);
    }
}
function drawDot(colour, x, y, width = 2) {
    if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.arc(x, y, width, 0, 2 * Math.PI);
        ctx.fill();
    }
}
let boxes = [];
function drawGame(game, baseX, baseY, drawDifficulties = false) {
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
        }
        else {
            width += 1;
            expandedChars.push(character.name);
        }
    }
    // Draw difficulties?
    if (drawDifficulties) {
        let y = 1;
        for (let difficulty of game.difficulties) {
            drawText(difficulty, baseX + 11, baseY + (y * boxWidth), 'right');
            y += 1;
        }
        baseX += 14;
    }
    let dotOffset = 0;
    if (width == 1) {
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
            let box = new Path2D();
            box.rect(baseX + (x * boxWidth), baseY + (y * boxWidth), boxWidth, boxWidth);
            let boxName = game.name + '-' + character + '-' + difficulty;
            boxes.push([box, boxName]);
            drawBoxContents(baseX + (x * boxWidth), baseY + (y * boxWidth), boxName, game.colour);
            drawBox(baseX + (x * boxWidth), baseY + (y * boxWidth), boxWidth, boxWidth, 0.5);
            lastY = baseY + (y * boxWidth);
            y++;
        }
        lastX = baseX + (x * boxWidth);
        x++;
    }
    // Draw outer box
    drawBox(baseX + 0, baseY + 0, boxWidth * width, boxWidth * height, 2.5);
    // Draw characters
    let charX = 0;
    for (let character of game.characters) {
        if (character.subcharacters.length > 0) {
            drawText(character.name, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 14);
            for (let subcharacter of character.subcharacters) {
                drawText(subcharacter, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 7, 'left', "12px touhouFont");
                charX += 1;
            }
            charX -= 1;
        }
        else {
            drawText(character.name, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 8);
        }
        charX += 1;
    }
}
if (ctx) {
    canvas.addEventListener('click', function (event) {
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
                console.log(box[1]);
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
    });
    canvas.addEventListener('dblclick', function (event) {
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
    });
    canvas.addEventListener('contextmenu', function (event) {
        deselectBox();
        if (debugDiv) {
            debugDiv.innerHTML = '(Double-)Click a square!';
        }
        drawScreen();
    });
}
let selectedBox = null;
function setupControls() {
    const doneCheckbox = document.getElementById('doneCheckbox');
    doneCheckbox.addEventListener('change', updateDoneStatus);
}
function toggleDone() {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.done = !currentBox.done;
        setBoxInState(currentBox);
        selectBox(selectedBox);
        drawScreen();
    }
}
function updateDoneStatus(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.done = e.target.checked;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function selectBox(box) {
    selectedBox = box;
    // Enable all the buttons
    const doneCheckbox = document.getElementById('doneCheckbox');
    doneCheckbox.disabled = false;
    // Set their state according to the selected box
    const boxObject = getBoxFromState(box);
    doneCheckbox.checked = boxObject.done;
}
function deselectBox() {
    selectedBox = null;
    // Disable the controls!
    const doneCheckbox = document.getElementById('doneCheckbox');
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
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawText("1CC CHART", 0, 10);
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
    drawHighlight();
    drawText("1CC CHART GENERATOR BY DOOPU", 0, 615);
    drawText("ORIGINAL TEMPLATE AUTHOR UNKNOWN", 0, 623);
    drawText("MAKE YOUR OWN AT TINYURL.COM/BDHVT732", 0, 631);
}
const font = new FontFace('touhouFont', 'url(touhouFont2.ttf)');
let state = new Map();
function getBoxFromState(box) {
    if (state.has(box[1])) {
        return state.get(box[1]);
    }
    else {
        let newBox = new BoxObject(box[1]);
        state.set(box[1], newBox);
        return newBox;
    }
}
function setBoxInState(box) {
    state.set(box.name, box);
    window.localStorage.setItem('state', JSON.stringify(Array.from(state.entries())));
}
function loadState() {
    if (window.localStorage.getItem('state')) {
        state = new Map(JSON.parse(window.localStorage.getItem('state')));
    }
}
font.load().then(function () {
    loadState();
    setupControls();
    drawScreen();
});
