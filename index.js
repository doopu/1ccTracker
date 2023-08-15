"use strict";
const appDiv = document.getElementById('app');
const debugDiv = document.getElementById('debug');
const canvas = document.getElementById('mainCanvas');
const downloadButton = document.getElementById('download');
const ctx = canvas.getContext("2d");
canvas.style.width = "800px";
canvas.style.height = "640px";
// Prevent selection of text while interacting with the canvas
canvas.onselectstart = function () {
    return false;
};
var scale = 1;
if (ctx) {
    // Keeping for posterity - canvas scaling tech, which
    // doesn't work across browsers or OSes and certainly
    // not for our use-case of creating 800x640 images...
    canvas.width = Math.floor(800 * scale);
    canvas.height = Math.floor(640 * scale);
    ctx.scale(scale, scale);
}
let download = function (e) {
    deselectBox();
    if (debugDiv) {
        debugDiv.innerHTML = '(Double-)Click a square!';
    }
    drawScreen();
    var image = canvas.toDataURL("image/png");
    e.target.href = image;
};
const boxWidth = 17;
function drawBox(x, y, width = boxWidth, height = boxWidth, lineWidth = 1.0, strokeStyle = 'rgba(128, 128, 128, 1.0)') {
    if (ctx) {
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
    }
}
function drawExtraHeader(x, y) {
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
function drawGFWBox(x, y) {
    if (ctx) {
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
        ctx.lineWidth = 2.0;
        // Do the really annoying thing of tracing around the box...
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.lineTo(x + boxWidth * 6, y);
        const height = easyMode ? 4 : 3;
        ctx.lineTo(x + boxWidth * 6, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 7, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 7, y + boxWidth * height);
        ctx.lineTo(x, y + boxWidth * height);
        ctx.lineTo(x, y);
        ctx.stroke();
        // We disabled drawing lines for C2 and EX to handle this very
        // annoying edge case, so draw them all in.
        y += 0.5;
        x += 0.5;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.lineTo(x + boxWidth * 5, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 6, y + boxWidth * (height - 1));
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + boxWidth * 5, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 5, y + boxWidth * height);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + boxWidth * 6 - 1, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 6 - 1, y + boxWidth * height + 8.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + boxWidth * 6 + 1, y + boxWidth * (height - 1));
        ctx.lineTo(x + boxWidth * 6 + 1, y + boxWidth * height + 8.5);
        ctx.stroke();
    }
}
function drawLOLKBox(x, y) {
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
        if (!easyMode) {
            ctx.lineTo(x + boxWidth * 8, y + boxWidth * 4);
            ctx.lineTo(x, y + boxWidth * 4);
            ctx.lineTo(x, y + boxWidth);
        }
        if (easyMode) {
            ctx.lineTo(x + boxWidth * 8, y + boxWidth * 5);
            ctx.lineTo(x, y + boxWidth * 5);
            ctx.lineTo(x, y + boxWidth);
        }
        ctx.stroke();
    }
}
function drawHSIFSBox(x, y) {
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
        let height = 4;
        if (easyMode) {
            height = 5;
        }
        ctx.lineTo(x + boxWidth * 16, y + boxWidth * height);
        ctx.lineTo(x, y + boxWidth * height);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Draw the X dividers
        y += 0.5;
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
function drawTDUMBox(x, y) {
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
        ctx.lineTo(x + boxWidth * 2, y + boxWidth);
        ctx.lineTo(x + boxWidth * 2, y);
        ctx.lineTo(x + boxWidth * 3, y);
        ctx.lineTo(x + boxWidth * 3, y + boxWidth);
        ctx.lineTo(x + boxWidth * 4, y + boxWidth);
        ctx.lineTo(x + boxWidth * 4, y);
        ctx.lineTo(x + boxWidth * 5, y);
        ctx.lineTo(x + boxWidth * 5, y + boxWidth);
        ctx.lineTo(x + boxWidth * 6, y + boxWidth);
        ctx.lineTo(x + boxWidth * 6, y);
        ctx.lineTo(x + boxWidth * 7, y);
        ctx.lineTo(x + boxWidth * 7, y + boxWidth);
        ctx.lineTo(x + boxWidth * 8, y + boxWidth);
        const height = easyMode ? 5 : 4;
        ctx.lineTo(x + boxWidth * 8, y + boxWidth * height);
        ctx.lineTo(x, y + boxWidth * height);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Draw the X dividers
        y += 0.5;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.lineTo(x, y + boxWidth - 2);
        ctx.lineTo(x + boxWidth, y + boxWidth - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + 2 * boxWidth, y + boxWidth - 2);
        ctx.lineTo(x + 3 * boxWidth, y + boxWidth - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + 4 * boxWidth, y + boxWidth - 2);
        ctx.lineTo(x + 5 * boxWidth, y + boxWidth - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x + 6 * boxWidth, y + boxWidth - 2);
        ctx.lineTo(x + 7 * boxWidth, y + boxWidth - 2);
        ctx.stroke();
    }
}
function drawBoxContentsAux(x, y, done, misses, bombs, lives, vertical, focus, pacifist, unique, cellColour, textColour, colour) {
    if (ctx) {
        if (done) {
            ctx.fillStyle = colour;
        }
        else {
            ctx.fillStyle = cellColour;
        }
        ctx.fillRect(x, y, boxWidth, boxWidth);
        // Draw the little bits and pieces
        // Draw miss/bomb/starting counts
        if (misses) {
            drawText(misses, x + 2, y + 7, 'left', "16px touhouFontMini", textColour);
        }
        if (bombs) {
            drawText(bombs, x + 7, y + 7, 'left', "16px touhouFontMini", textColour);
        }
        if (lives) {
            drawText(lives, x + 16, y + 7, 'right', "16px touhouFontMini", textColour);
        }
        // No vertical?
        if (vertical) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = textColour;
            ctx.beginPath();
            ctx.lineTo(x + 1.5, y + boxWidth / 2 - 0.5);
            ctx.lineTo(x + boxWidth - 2.5, y + boxWidth / 2 - 0.5);
            ctx.stroke();
        }
        // No focus / pacifist / unique
        if (focus) {
            drawText("F", x + 2, y + 15, 'left', "16px touhouFontMini", textColour);
        }
        if (pacifist) {
            drawText("P", x + 7, y + 15, 'left', "16px touhouFontMini", textColour);
        }
        if (unique) {
            drawText("U", x + 12, y + 15, 'left', "16px touhouFontMini", textColour);
        }
    }
}
function drawBoxContents(x, y, boxName, colour) {
    const box = getBoxFromState([new Path2D(), boxName]);
    drawBoxContentsAux(x, y, box.done, box.misses, box.bombs, box.lives, box.vertical, box.focus, box.pacifist, box.unique, box.cellColour, box.textColour, colour);
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
        this.textColour = '#000000';
        this.cellColour = '#FFFFFF';
        this.done = false;
        this.pacifist = false;
        this.unique = false;
        this.focus = false;
        this.vertical = false;
        this.lives = null;
        this.bombs = null;
        this.misses = null;
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
const htrp = new Game("HRTP", "rgba(210, 60, 255, 1.0)", "LHN".split(''), [new Character("", ["ma", "j"])]);
const soew = new Game("SOEW", "rgba(32, 51, 255, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b", "c"])]);
const podd = new Game("PODD", "rgba(255, 92, 92, 1.0)", "LHN".split(''), [new Character("R"),
    new Character("MI"),
    new Character("M"),
    new Character("EL"),
    new Character("KH"),
    new Character("KA"),
    new Character("RI"),
    new Character("CH"),
    new Character("YM")]);
const ls = new Game("LS", "rgba(73, 250, 76, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b"]),
    new Character("M", ["a", "b"])]);
const ms = new Game("MS", "rgba(194, 36, 128, 1.0)", "XLHN".split(''), [new Character("R"),
    new Character("M"),
    new Character("MI"),
    new Character("YK")]);
const eosd = new Game("EOSD", "rgba(255, 51, 18, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b"]),
    new Character("M", ["a", "b"])]);
const stb = new Game("STB", "rgba(99, 44, 0, 1.0)", ["85", "66"], [new Character("AY")]);
const ds = new Game("DS", "rgba(10, 34, 119, 1.0)", ["108", "58"], [new Character("AY"), new Character("HA")]);
const isc = new Game("ISC", "rgba(99, 44, 0, 1.0)", ["NI", "C"], [new Character("SJ")]);
const vd = new Game("VD", "rgba(163, 73, 164, 1.0)", ["103", "C"], [new Character("SM")]);
const bm = new Game("100BM", "rgba(232, 125, 0, 1.0)", ["85", "C"], [new Character("M")]);
const pcb = new Game("PCB", "rgba(255, 127, 191, 1.0)", "PXLHN".split(''), [new Character("R", ["a", "b"]),
    new Character("M", ["a", "b"]),
    new Character("S", ["a", "b"])]);
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
const mof = new Game("MOF", "rgba(255, 168, 0, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b", "c"]),
    new Character("M", ["a", "b", "c"])]);
const sa = new Game("SA", "rgba(0, 201, 109, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b", "c"]),
    new Character("M", ["a", "b", "c"])]);
const ufo = new Game("UFO", "rgba(127, 191, 255, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b"]),
    new Character("M", ["a", "b"]),
    new Character("SN", ["a", "b"])]);
const gfw = new Game("GFW", "rgba(127, 253, 255, 1.0)", "LHN".split(''), [new Character("A1"),
    new Character("A2"),
    new Character("B1"),
    new Character("B2"),
    new Character("C1"),
    new Character("C2"),
    new Character("EX")]);
const td = new Game("TD", "rgba(255, 191, 127, 1.0)", "XLHN".split(''), [new Character("R", ["e1", "e2"]),
    new Character("M", ["e1", "e2"]),
    new Character("SN", ["e1", "e2"]),
    new Character("Y", ["e1", "e2"])]);
const ddc = new Game("DDC", "rgba(123, 95, 135, 1.0)", "XLHN".split(''), [new Character("R", ["a", "b"]),
    new Character("M", ["a", "b"]),
    new Character("S", ["a", "b"])]);
const lolk = new Game("LOLK", "rgba(159, 21, 41, 1.0)", "XLHN".split(''), [new Character("R", ["p", "l"]),
    new Character("M", ["p", "l"]),
    new Character("SN", ["p", "l"]),
    new Character("RS", ["p", "l"])]);
const hsifs = new Game("HSIFS", "rgba(255, 127, 39, 1.0)", "XLHN".split(''), [new Character("R", ["sp", "sm", "f", "w"]),
    new Character("C", ["sp", "sm", "f", "w"]),
    new Character("AY", ["sp", "sm", "f", "w"]),
    new Character("M", ["sp", "sm", "f", "w"])]);
const wbawc = new Game("WBAWC", "rgba(224, 66, 44, 1.0)", "XLHN".split(''), [new Character("R", ["w", "o", "e"]),
    new Character("M", ["w", "o", "e"]),
    new Character("Y", ["w", "o", "e"])]);
const um = new Game("UM", "rgba(0, 201, 109, 1.0)", "XLHN".split(''), [new Character("R", ["e1", "e2"]),
    new Character("M", ["e1", "e2"]),
    new Character("S", ["e1", "e2"]),
    new Character("SN", ["e1", "e2"])]);
const udoalg = new Game("UDOALG", "rgba(255, 255, 0, 1.0)", "LHN".split(''), [new Character("R"),
	new Character("M"),
	new Character("SN"),
	new Character("RA"),
	new Character("A"),
	new Character("N"),
	new Character("SR"),
	new Character("RI"),
	new Character("TS"),
	new Character("MM"),
	new Character("YC"),
	new Character("SK"),
	new Character("YT"),
	new Character("SU"),
	new Character("BS"),
	new Character("EN"),
	new Character("CY"),
	new Character("H"),
	new Character("Z")]);
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
const gi = new Game("GI", "rgba(131, 5, 5, 1.0)", "HN".split(''), [new Character("R"),
    new Character("M"),
    new Character("KA"),
    new Character("MU"),
    new Character("J"),
    new Character("FL", ["a", "b", "c"]),
	new Character("YT")]);
let lastX = 0;
let lastY = 0;
function drawText(text, x, y, align = 'left', font = "16px touhouFont", colour = "black") {
    x -= 0.5; // Dumb hack for Windows
    if (ctx) {
        ctx.font = font;
        ctx.textAlign = align;
        ctx.fillStyle = colour;
        ctx.fillText(text, x, y - 1);
    }
}
function drawUILine(x, y, drop, width) {
    if (ctx) {
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + drop);
        ctx.strokeStyle = 'rgba(128, 128, 128, 1.0)';
        ctx.lineWidth = width;
        ctx.stroke();
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
    // Easy mode toggle need special work
    let difficulties = game.difficulties.slice();
    if (easyMode) {
        if (game.name === 'IN') {
            difficulties = ["X", "B-L", "B-H", "B-N", "B-E", "A-L", "A-H", "A-N", "A-E"];
        }
        else if (difficulties[difficulties.length - 1] === 'N') {
            difficulties.push('E');
        }
    }
    const height = difficulties.length;
    // Draw difficulties?
    if (drawDifficulties) {
        if (game.name === 'IN') {
            // IN has an A/B split, so do this custom-style.
            difficulties = 'XLHNLHN'.split('');
            if (easyMode) {
                difficulties = 'XLHNELHNE'.split('');
            }
            if (ctx) {
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.lineTo(baseX - 3.5, baseY + (boxWidth));
                ctx.lineTo(baseX + 15, baseY + (boxWidth));
                ctx.stroke();
                drawText("B", baseX - 2, baseY + (boxWidth) + 7);
                let aOffset = 4;
                if (easyMode) {
                    aOffset = 5;
                }
                ctx.beginPath();
                ctx.lineTo(baseX - 3.5, baseY + (aOffset * boxWidth));
                ctx.lineTo(baseX + 15, baseY + (aOffset * boxWidth));
                ctx.stroke();
                drawText("A", baseX - 2, baseY + (aOffset * boxWidth) + 7);
            }
        }
        let y = 1;
        for (let difficulty of difficulties) {
            drawText(difficulty, baseX + 11, baseY + (y * boxWidth) - 1, 'right');
            y += 1;
        }
        baseX += 14;
    }
    if (easyMode) {
        // We screwed with IN to make it render nice, so fix it up again.
        if (game.name === 'IN') {
            difficulties = ["X", "B-L", "B-H", "B-N", "B-E", "A-L", "A-H", "A-N", "A-E"];
        }
    }
    let dotOffset = 0;
    if (width == 1) {
        dotOffset = -6;
    }
    let dotNameOffset = 3;
    const gap = 4;
    if (game.name === 'GFW' || game.name === 'PODD') {
        dotNameOffset = 4;
    }
    // Draw game colour dot
    drawDot(game.colour, baseX + dotNameOffset + dotOffset, baseY - 5);
    // Draw game name
    drawText(game.name, baseX + dotNameOffset + gap + dotOffset, baseY - 2);
    let lastY = 0;
    // Draw individual boxes
    let x = 0;
    let y = 0;
    for (let character of expandedChars) {
        y = 0;
        for (let difficulty of difficulties) {
            // Some games need to skip boxes...
            let skipBox = false;
            let skipDraw = false;
            skipBox = skipBox || (game.name === 'GFW' && character === 'EX' && difficulty !== 'N');
            skipBox = skipBox || (game.name === 'LOLK' && !character.endsWith('l') && difficulty === 'X');
            skipBox = skipBox || (game.name === 'HSIFS' && !character.endsWith('sp') && difficulty === 'X');
            skipBox = skipBox || (game.name === 'TD' && character.endsWith('2') && difficulty === 'X');
            skipBox = skipBox || (game.name === 'UM' && character.endsWith('2') && difficulty === 'X');
            skipDraw = (game.name === 'GFW' && character === 'EX' && difficulty === 'N');
            if (easyMode) {
                skipDraw = skipDraw || (game.name === 'GFW' && character === 'C2' && difficulty === 'E');
            }
            else {
                skipDraw = skipDraw || (game.name === 'GFW' && character === 'C2' && difficulty === 'N');
            }
            if (!skipBox) {
                let yDraw = y;
                if (game.name === 'GFW' && character === 'EX' && difficulty === 'N' && easyMode) {
                    yDraw += 1;
                }
                let box = new Path2D();
                box.rect(baseX + (x * boxWidth) + 0.5, baseY + (yDraw * boxWidth) + 0.5, boxWidth - 1, boxWidth - 1);
                let boxName = game.name + '-' + character + '-' + difficulty;
                boxes.push([box, boxName]);
                drawBoxContents(baseX + (x * boxWidth), baseY + (yDraw * boxWidth), boxName, game.colour);
                if (!skipDraw) {
                    drawBox(baseX + (x * boxWidth), baseY + (yDraw * boxWidth), boxWidth, boxWidth, 1);
                }
            }
            lastY = baseY + (y * boxWidth);
            y++;
        }
        lastX = baseX + (x * boxWidth);
        x++;
    }
    // Draw outer box, except for annoying games like LOLK, GFW and HSIFS.
    if (game.name != 'TD' && game.name != 'UM' && game.name !== 'LOLK' && game.name !== 'GFW' && game.name !== 'HSIFS') {
        drawBox(baseX - 0.5, baseY - 0.5, boxWidth * width, boxWidth * height, 2);
    }
    if (game.name === 'LOLK') {
        drawLOLKBox(baseX - 0.5, baseY - 0.5);
    }
    if (game.name === 'TD' || game.name === 'UM') {
        drawTDUMBox(baseX - 0.5, baseY - 0.5);
    }
    if (game.name === 'GFW') {
        drawGFWBox(baseX - 0.5, baseY - 0.5);
    }
    if (game.name === 'HSIFS') {
        drawHSIFSBox(baseX - 0.5, baseY - 0.5);
    }
    // Draw characters
    let charX = 0;
    for (let character of game.characters) {
        if (character.subcharacters.length > 0) {
            let lineWidth = 1;
            let xAdjust = 0;
            let yAdjust = 0.5;
            // If this is the first character, we need a long thick bar at the start..
            if (charX == 0) {
                lineWidth = 2;
                xAdjust = -0.5;
                yAdjust = 0.5;
            }
            drawUILine(xAdjust + (charX * boxWidth) + baseX, yAdjust + lastY + boxWidth, boxWidth - 2, lineWidth);
            drawText(character.name, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 14);
            for (let subcharacter of character.subcharacters) {
                drawText(subcharacter, baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 7, 'left', "16px touhouFontMini");
                charX += 1;
            }
            charX -= 1;
        }
        else {
            // If this is the first chracter, we need a thick short bar at the start, otherwise a thin one
            let lineWidth = 1;
            let xAdjust = 1;
            let yAdjust = 0.5;
            let textAdjust = 0;
            if (charX == 0) {
                lineWidth = 2;
                xAdjust = 0.5;
            }
            if (game.name === 'GFW' && character.name === 'EX') {
                textAdjust = 1;
            }
            else {
                // We draw the GFW EX line ourselves
                drawUILine(xAdjust + baseX - 1 + (charX * boxWidth), lastY + boxWidth, boxWidth - 8 + yAdjust, lineWidth);
            }
            drawText(character.name, textAdjust + baseX + (charX * boxWidth) + 2, lastY + (boxWidth) + 8);
        }
        charX += 1;
    }
    // Draw closing bar
    drawUILine(baseX - 0.5 + (charX * boxWidth), lastY + boxWidth + 0.5, boxWidth - 8, 2);
}
if (ctx) {
    downloadButton.addEventListener('click', download);
    canvas.addEventListener('click', function (event) {
        event.preventDefault();
        var ClientRect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - ClientRect.left) * scale;
        const y = Math.round(event.clientY - ClientRect.top) * scale;
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
    canvas.addEventListener('dblclick', function (event) {
        event.preventDefault();
        var ClientRect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - ClientRect.left) * scale;
        const y = Math.round(event.clientY - ClientRect.top) * scale;
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
    const pacifistCheckbox = document.getElementById('pacifistCheckbox');
    pacifistCheckbox.addEventListener('change', updatePacifistStatus);
    const focusCheckbox = document.getElementById('focusCheckbox');
    focusCheckbox.addEventListener('change', updateFocusStatus);
    const uniqueCheckbox = document.getElementById('uniqueCheckbox');
    uniqueCheckbox.addEventListener('change', updateUniqueStatus);
    const verticalCheckbox = document.getElementById('verticalCheckbox');
    verticalCheckbox.addEventListener('change', updateVerticalStatus);
    const livesSelect = document.getElementById('livesSelect');
    livesSelect.addEventListener('change', updateLives);
    const bombsSelect = document.getElementById('bombsSelect');
    bombsSelect.addEventListener('change', updateBombs);
    const missesSelect = document.getElementById('missesSelect');
    missesSelect.addEventListener('change', updateMisses);
    const cellColour = document.getElementById('bgColour');
    cellColour.addEventListener('change', updateCellColour);
    const textColour = document.getElementById('textColour');
    textColour.addEventListener('change', updateTextColour);
    const bgCheckbox = document.getElementById('useBackgroundCheckbox');
    bgCheckbox.addEventListener('change', updateBgStatus);
    const fightingCheckbox = document.getElementById('fightingCheckbox');
    fightingCheckbox.addEventListener('change', updateFightingStatus);
    const easyCheckbox = document.getElementById('easyCheckbox');
    easyCheckbox.addEventListener('change', updateEasyStatus);
    const legendCheckbox = document.getElementById('legendCheckbox');
    legendCheckbox.addEventListener('change', updateLegendStatus);
    // For the checkboxes, set them to whatever's in the checkboxState map, if available.
    let checkboxValue = getCheckboxFromState('bg');
    if (checkboxValue !== null) {
        transparentPng = checkboxValue;
        bgCheckbox.checked = checkboxValue;
    }
    checkboxValue = getCheckboxFromState('fighting');
    if (checkboxValue !== null) {
        showFighting = checkboxValue;
        fightingCheckbox.checked = checkboxValue;
    }
    checkboxValue = getCheckboxFromState('easy');
    if (checkboxValue !== null) {
        easyMode = checkboxValue;
        easyCheckbox.checked = checkboxValue;
    }
    checkboxValue = getCheckboxFromState('legend');
    if (checkboxValue !== null) {
        showLegend = checkboxValue;
        legendCheckbox.checked = checkboxValue;
    }
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
function updateCellColour(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.cellColour = e.target.value;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateTextColour(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.textColour = e.target.value;
        setBoxInState(currentBox);
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
function updateFocusStatus(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.focus = e.target.checked;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updatePacifistStatus(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.pacifist = e.target.checked;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateVerticalStatus(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.vertical = e.target.checked;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateUniqueStatus(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.unique = e.target.checked;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateLives(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.lives = e.target.value;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateBombs(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.bombs = e.target.value;
        setBoxInState(currentBox);
        drawScreen();
    }
}
function updateMisses(e) {
    if (selectedBox) {
        let currentBox = getBoxFromState(selectedBox);
        currentBox.misses = e.target.value;
        setBoxInState(currentBox);
        drawScreen();
    }
}
let transparentPng = true;
let showFighting = true;
let showLegend = true;
let easyMode = false;
function updateCanvasHeight() {
    let height = 745;
    if (!showFighting && !easyMode) {
        height = 540;
    }
    if (easyMode && !showFighting) {
        height = 550;
        height += 5.5 * boxWidth;
    }
    if (easyMode && showFighting) {
		height = 750;
        height += 7.5 * boxWidth;
    }
    canvas.height = height;
    canvas.style.height = height + "px";
    if (ctx) {
        ctx.translate(0.5, 0.5);
    }
    drawScreen();
}
function updateBgStatus(e) {
    transparentPng = e.target.checked;
    setCheckboxInState('bg', transparentPng);
    drawScreen();
}
function updateLegendStatus(e) {
    showLegend = e.target.checked;
    setCheckboxInState('legend', showLegend);
    drawScreen();
}
function updateFightingStatus(e) {
    showFighting = e.target.checked;
    setCheckboxInState('fighting', showFighting);
    updateCanvasHeight();
}
function updateEasyStatus(e) {
    easyMode = e.target.checked;
    setCheckboxInState('easy', easyMode);
    updateCanvasHeight();
}
function selectBox(box) {
    selectedBox = box;
    // Enable all the buttons
    const doneCheckbox = document.getElementById('doneCheckbox');
    doneCheckbox.disabled = false;
    const verticalCheckbox = document.getElementById('verticalCheckbox');
    verticalCheckbox.disabled = false;
    const pacifistCheckbox = document.getElementById('pacifistCheckbox');
    pacifistCheckbox.disabled = false;
    const uniqueCheckbox = document.getElementById('uniqueCheckbox');
    uniqueCheckbox.disabled = false;
    const focusCheckbox = document.getElementById('focusCheckbox');
    focusCheckbox.disabled = false;
    const livesSelect = document.getElementById('livesSelect');
    livesSelect.disabled = false;
    const missesSelect = document.getElementById('missesSelect');
    missesSelect.disabled = false;
    const bombsSelect = document.getElementById('bombsSelect');
    bombsSelect.disabled = false;
    const cellColour = document.getElementById('bgColour');
    cellColour.disabled = false;
    const textColour = document.getElementById('textColour');
    textColour.disabled = false;
    // Set their state according to the selected box
    const boxObject = getBoxFromState(box);
    doneCheckbox.checked = boxObject.done;
    pacifistCheckbox.checked = boxObject.pacifist;
    focusCheckbox.checked = boxObject.focus;
    uniqueCheckbox.checked = boxObject.unique;
    verticalCheckbox.checked = boxObject.vertical;
    cellColour.value = boxObject.cellColour;
    textColour.value = boxObject.textColour;
    if (boxObject.lives) {
        livesSelect.value = boxObject.lives;
    }
    else {
        livesSelect.value = "";
    }
    if (boxObject.misses) {
        missesSelect.value = boxObject.misses;
    }
    else {
        missesSelect.value = "";
    }
    if (boxObject.bombs) {
        bombsSelect.value = boxObject.bombs;
    }
    else {
        bombsSelect.value = "";
    }
}
function deselectBox() {
    selectedBox = null;
    // Disable the controls!
    const doneCheckbox = document.getElementById('doneCheckbox');
    doneCheckbox.disabled = true;
    doneCheckbox.checked = false;
    const focusCheckbox = document.getElementById('focusCheckbox');
    focusCheckbox.disabled = true;
    focusCheckbox.checked = false;
    const pacifistCheckbox = document.getElementById('pacifistCheckbox');
    pacifistCheckbox.disabled = true;
    pacifistCheckbox.checked = false;
    const uniqueCheckbox = document.getElementById('uniqueCheckbox');
    uniqueCheckbox.disabled = true;
    uniqueCheckbox.checked = false;
    const verticalCheckbox = document.getElementById('verticalCheckbox');
    verticalCheckbox.disabled = true;
    verticalCheckbox.checked = false;
    const livesSelect = document.getElementById('livesSelect');
    livesSelect.disabled = true;
    livesSelect.value = "";
    const missesSelect = document.getElementById('missesSelect');
    missesSelect.disabled = true;
    missesSelect.value = "";
    const bombsSelect = document.getElementById('bombsSelect');
    bombsSelect.disabled = true;
    bombsSelect.value = "";
    const cellColour = document.getElementById('bgColour');
    cellColour.disabled = true;
    cellColour.value = "#ffffff";
    const textColour = document.getElementById('textColour');
    textColour.disabled = true;
    textColour.value = "#000000";
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
function drawLegend() {
    const topLeft = canvas.width - 8 * boxWidth + 2.5;
    const textOffset = topLeft - 0.5;
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(topLeft, -2.5, 8 * boxWidth, 15 * boxWidth);
        drawBox(canvas.width - 8 * boxWidth + 2.5, -2.5, 8 * boxWidth, 15 * boxWidth, 2.0);
        drawBox(canvas.width - 8 * boxWidth + 2.5, -2.5, 8 * boxWidth, 10 * boxWidth + 6, 2.0);
        drawText("LEGEND", textOffset + 5, 8);
        let yOffset = 0;
        drawBoxContentsAux(topLeft + 5.5, 15, false, "0", null, null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth, 15, false, "1", null, null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 2, 15, false, "2", null, null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 3, 15, false, "3", null, null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBox(topLeft + 5, 14 + 0.5, 4 * boxWidth, boxWidth, 2.0);
        drawBox(topLeft + 5.5, 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + boxWidth, 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 2 * boxWidth, 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 3 * boxWidth, 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawText("ETC", textOffset + 10 + 4 * boxWidth, 22);
        drawText("MISS COUNT", textOffset + 5, 8 + boxWidth * 2 - 3);
        yOffset = boxWidth * 2 - 6;
        drawBoxContentsAux(topLeft + 5.5, yOffset + 15, false, null, "0", null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth, yOffset + 15, false, null, "1", null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 2, yOffset + 15, false, null, "2", null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 3, yOffset + 15, false, null, "3", null, false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBox(topLeft + 5, yOffset + 14 + 0.5, 4 * boxWidth, boxWidth, 2.0);
        drawBox(topLeft + 5.5, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 2 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 3 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawText("ETC", textOffset + 10 + 4 * boxWidth, yOffset + 22);
        drawText("BOMB COUNT", textOffset + 5, yOffset + 8 + boxWidth * 2 - 3);
        yOffset = boxWidth * 4 - 12;
        drawBoxContentsAux(topLeft + 6, yOffset + 15, false, null, null, "7", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth, yOffset + 15, false, null, null, "6", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 2, yOffset + 15, false, null, null, "5", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 3, yOffset + 15, false, null, null, "4", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 4, yOffset + 15, false, null, null, "2", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 5, yOffset + 15, false, null, null, "1", false, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBox(topLeft + 5, yOffset + 14 + 0.5, 6 * boxWidth, boxWidth, 2.0);
        drawBox(topLeft + 5.5, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 2 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 3 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 4 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawBox(topLeft + 5.5 + 5 * boxWidth, yOffset + 14 + 0.5, boxWidth, boxWidth, 1.0);
        drawText("STARTING LIVES", textOffset + 5, yOffset + 8 + boxWidth * 2 - 3);
        yOffset = boxWidth * 6 - 18;
        drawBoxContentsAux(topLeft + 5.5, yOffset + 14, false, null, null, null, true, false, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5, yOffset + 14 + boxWidth, false, null, null, null, false, true, false, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5, yOffset + 14 + boxWidth * 2, false, null, null, null, false, false, true, false, "#FFFFFF", "#000000", "#FFFFFF");
        drawBoxContentsAux(topLeft + 5.5, yOffset + 14 + boxWidth * 3, false, null, null, null, false, false, false, true, "#FFFFFF", "#000000", "#FFFFFF");
        drawBox(topLeft + 5, yOffset + 14 + 0.5, boxWidth, boxWidth * 4, 2.0);
        drawBox(topLeft + 5, yOffset + 14, boxWidth, boxWidth, 1.0);
        drawText("NO", textOffset + 8 + boxWidth, yOffset + 22);
        drawText("VERTICAL", textOffset + 8 + boxWidth, yOffset + 28);
        drawBox(topLeft + 5, boxWidth + yOffset + 14, boxWidth, boxWidth, 1.0);
        drawText("F", textOffset + 26 + boxWidth, yOffset + 21 + boxWidth, 'left', "16px touhouFont", "red");
        drawText("NO  OCUS", textOffset + 8 + boxWidth, yOffset + 21 + boxWidth);
        drawBox(topLeft + 5, 2 * boxWidth + yOffset + 14, boxWidth, boxWidth, 1.0);
        drawText("P", textOffset + 8 + boxWidth, yOffset + 21 + boxWidth * 2, 'left', "16px touhouFont", "red");
        drawText(" ACIFIST", textOffset + 8 + boxWidth, yOffset + 21 + boxWidth * 2);
        drawBox(topLeft + 5, 3 * boxWidth + yOffset + 14, boxWidth, boxWidth, 1.0);
        drawText("U", textOffset + 8 + boxWidth, yOffset + 21 + boxWidth * 3, 'left', "16px touhouFont", "red");
        drawText(" NIQUE", textOffset + 8 + boxWidth, yOffset + 21 + boxWidth * 3);
        drawText(" (GAME-SPECIFIC)", textOffset + 6 + boxWidth, yOffset + 27 + boxWidth * 3);
        drawText("LIMITATION", textOffset + 8 + boxWidth, yOffset + 33 + boxWidth * 3);
        yOffset = 10 * boxWidth + 6;
        drawText("METADATA", textOffset + 5, yOffset + 6);
        drawText("1234567890", textOffset + 5, yOffset + 14);
        drawText("QWERTYUIOP", textOffset + 5, yOffset + 20);
        drawText("ASDFGHJKL", textOffset + 5, yOffset + 26);
        drawText("ZXCVBNM", textOffset + 5, yOffset + 32);
        drawText("18", topLeft + 10.5 + boxWidth * 4, yOffset + 13, 'left', "16px touhouFontMini");
        drawText("1", topLeft + 24.5 + boxWidth * 4, yOffset + 13 + boxWidth / 2, 'left', "16px touhouFontMini");
        drawText("8", topLeft + 24.5 + boxWidth * 4, yOffset + 13 + boxWidth / 2 + 6, 'left', "16px touhouFontMini");
        drawBox(topLeft + 5.5 + boxWidth * 4, yOffset + 14, boxWidth, boxWidth, 1.0);
        drawBoxContentsAux(topLeft + 5.5 + boxWidth * 6, yOffset + 14, false, "0", "0", "1", true, true, true, true, "#FFFFFF", "#000000", "#FFFFFF");
        drawBox(topLeft + 5.5 + boxWidth * 6, yOffset + 14, boxWidth, boxWidth, 1.0);
        drawText("CREATE YOUR CHART AT:", textOffset + 5, yOffset + 48);
        drawText("TINYURL.COM/TJ9829WC", textOffset + 5, yOffset + 54);
        drawText("FONT SIZE 5 PIXELS", textOffset + 5, yOffset + 70);
    }
}
function drawScreen() {
    boxes = [];
    if (ctx) {
        ctx.clearRect(-2, -2, canvas.width + 2, canvas.height + 2);
        if (!transparentPng) {
            ctx.fillStyle = 'white';
            ctx.fillRect(-2, -2, canvas.width + 2, canvas.height + 2);
        }
    }
    let yOffset = boxWidth;
    drawText("1CC CHART", 2, 6);
    if (showLegend) {
        drawLegend();
    }
    drawGame(htrp, 2, yOffset + boxWidth, true);
    drawGame(soew, lastX + boxWidth, yOffset);
    drawGame(podd, lastX + boxWidth, yOffset + boxWidth);
    drawGame(ls, lastX + boxWidth, yOffset);
    drawGame(ms, lastX + boxWidth, yOffset);
    drawGame(eosd, lastX + boxWidth, yOffset);
    if (easyMode) {
        yOffset += boxWidth;
    }
    drawGame(stb, lastX + 2 * boxWidth - 6, yOffset + 0 * boxWidth, true);
    drawGame(ds, lastX + 2 * boxWidth - 4, yOffset + 0 * boxWidth, true);
    drawGame(isc, lastX + 2 * boxWidth - 8, yOffset + 0 * boxWidth, true);
    drawGame(vd, lastX + 2 * boxWidth, yOffset + 0 * boxWidth, true);
	drawGame(bm, 27.585 * boxWidth, yOffset + 4 * boxWidth, true);
    let pcvPofvOffset = 0;
    if (easyMode) {
        pcvPofvOffset = 1;
    }
    drawGame(pcb, 2, yOffset + ((pcvPofvOffset + 8) * boxWidth), true);
    drawGame(imp, lastX + 2 * boxWidth, yOffset + 6 * boxWidth, true);
    drawGame(pofv, lastX + 2 * boxWidth, yOffset + ((pcvPofvOffset + 9) * boxWidth), true);
    if (easyMode) {
        yOffset += 2 * boxWidth;
    }
    drawGame(mof, 2, yOffset + 15 * boxWidth, true);
    drawGame(sa, lastX + boxWidth, yOffset + 15 * boxWidth);
    drawGame(ufo, lastX + boxWidth, yOffset + 15 * boxWidth);
    drawGame(gfw, lastX + boxWidth, yOffset + 16 * boxWidth);
    drawGame(td, lastX + 2 * boxWidth, yOffset + 15 * boxWidth, true);
    drawGame(ddc, lastX + boxWidth, yOffset + 15 * boxWidth);
    if (easyMode) {
        yOffset += boxWidth;
    }
    drawGame(lolk, 2, yOffset + 21 * boxWidth, true);
    drawGame(hsifs, lastX + 2 * boxWidth, yOffset + 21 * boxWidth, true);
    drawGame(wbawc, lastX + 2 * boxWidth, yOffset + 21 * boxWidth, true);
    drawGame(um, lastX + boxWidth, yOffset + 21 * boxWidth);
    if (easyMode) {
        yOffset += boxWidth;
    }
	drawGame(udoalg, 2, yOffset + 27 * boxWidth, true);
	if (easyMode) {
		yOffset += boxWidth;
	}
    if (showFighting) {
        drawExtraHeader(lastX, yOffset + 32.7 * boxWidth);
        drawGame(iamp, 2, yOffset + 34 * boxWidth, true);
        drawGame(swr, lastX + boxWidth, yOffset + 34 * boxWidth);
        drawGame(hsoku, lastX + boxWidth, yOffset + 34 * boxWidth);
        drawGame(hm, lastX + boxWidth, yOffset + 34 * boxWidth);
        if (easyMode) {
            yOffset += boxWidth;
        }
        drawGame(ulil, 2, yOffset + 39 * boxWidth, true);
        drawGame(aocf, lastX + boxWidth, yOffset + 39 * boxWidth);
        drawGame(gi, lastX + 2 * boxWidth, yOffset + 39 * boxWidth, true);
    }
    drawHighlight();
}
let checkboxState = new Map();
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
function getCheckboxFromState(checkboxName) {
    if (checkboxState.has(checkboxName)) {
        return checkboxState.get(checkboxName);
    }
    else {
        return null;
    }
}
function setCheckboxInState(checkboxName, checkboxValue) {
    checkboxState.set(checkboxName, checkboxValue);
    window.localStorage.setItem('checkboxState', JSON.stringify(Array.from(checkboxState.entries())));
}
function setBoxInState(box) {
    state.set(box.name, box);
    window.localStorage.setItem('state', JSON.stringify(Array.from(state.entries())));
}
function loadState() {
    if (window.localStorage.getItem('state')) {
        state = new Map(JSON.parse(window.localStorage.getItem('state')));
    }
    if (window.localStorage.getItem('checkboxState')) {
        checkboxState = new Map(JSON.parse(window.localStorage.getItem('checkboxState')));
    }
}
const font = new FontFace('touhouFont', 'url(touhouFont2.ttf)');
const fontMini = new FontFace('touhouFontMini', 'url(touhouFontLittle.ttf)');
fontMini.load().then(function () {
    font.load().then(function () {
        loadState();
        setupControls();
        updateCanvasHeight();
        drawScreen();
    });
});
