// By default, the first board loaded by your page will be the same
// each time you load (which is accomplished by "seeding" the random
// number generator. This makes testing (and grading!) easier!

// MINTE
Math.seedrandom(0);

let backgroundSound = false;
var scoreWin = 32;
// A short jQuery extension to read query parameters from the URL.
$.extend({
    getUrlVars: function () {
        var vars = [],
            pair;
        var pairs = window.location.search.substr(1).split("&");
        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i].split("=");
            vars.push(pair[0]);
            vars[pair[0]] =
                pair[1] && decodeURIComponent(pair[1].replace(/\+/g, " "));
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    },
});

// constants
var DEFAULT_BOARD_SIZE = 8;

// data model at global scope for easier debugging
var board;
var rules;
var col_array = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
var inputBoxInfo;
var validInput = false;
var image_array;
var BOARD_SIZE;
var globalCrushCounter = true;
var mouseDownLocation;
var mouseUpLocation;

// initialize board
if ($.getUrlVar("size") && $.getUrlVar("size") >= 3) {
    board = new Board($.getUrlVar("size"));
    BOARD_SIZE = $.getUrlVar("size");
} else {
    board = new Board(DEFAULT_BOARD_SIZE);
    BOARD_SIZE = DEFAULT_BOARD_SIZE;
}

// load a rule
rules = new Rules(board);

// Final initialization entry point: the Javascript code inside this block
// runs at the end of start-up when the page has finished loading.
$(document).ready(function () {
    // Your code here.
});

/* Event Handlers */
// access the candy object with info.candy

// add a candy to the board
$(board).on("add", function (e, info) {
    // Your code here.
});

// move a candy on the board
$(board).on("move", function (e, info) {
    // Your code here.
});

// remove a candy from the board
$(board).on("remove", function (e, info) {
    // Your code here.
    // var candy = info.candy;
    // console.log('candy remved');
    // // console.log(candy);
    // $('info').fadeOut('slow');
});

// move a candy on the board
// $(board).on('scoreUpdate', function (e, info) {
//     // Your code here. To be implemented in pset 2.
//     $("#score").html(board.getScore());
//     console.log(board.getScore());
// });

// keyboard events arrive here
$(document).on("keydown", function (evt) {
    // Your code here.
});

$(document).keypress(function (evt) {
    if (evt.which == 13) {
        checkInput();
    }
});

function checkInput() {
    inputBoxInfo = document.getElementById("inputBox").value;
    // console.log(inputBoxInfo.length);
    if (inputBoxInfo.length <= 3) {
        var bool1 = col_array.indexOf(inputBoxInfo.charAt(0)) != -1;
        var bool2 =
            Number(inputBoxInfo.charAt(1)) > 0 &&
            Number(inputBoxInfo.charAt(1)) <= 20;
        if (bool1 && bool2) {
            validInput = true;
            var counter = 0;
            if (avaliableMove("up")) {
                document.getElementById("up").disabled = false;
                counter++;
            }
            if (avaliableMove("left")) {
                document.getElementById("left").disabled = false;
                counter++;
            }
            if (avaliableMove("right")) {
                document.getElementById("right").disabled = false;
                counter++;
            }
            if (avaliableMove("down")) {
                document.getElementById("down").disabled = false;
                counter++;
            }
            if (counter > 0) return;
        }
    }
    // console.log("hello");
    document.getElementById("inputBox").value = null;
    document.getElementById("inputBox").focus();
    document.getElementById("up").disabled = true;
    document.getElementById("left").disabled = true;
    document.getElementById("right").disabled = true;
    document.getElementById("down").disabled = true;
}

// $(document).on('focusout', "#inputBox", function(evt){
//   checkInput();
// });

$(document).on("click", "#up", function (evt) {
    if (validInput) checkMove("up");
});

$(document).on("click", "#left", function (evt) {
    if (validInput) checkMove("left");
});

$(document).on("click", "#right", function (evt) {
    if (validInput) checkMove("right");
});

$(document).on("click", "#down", function (evt) {
    if (validInput) checkMove("down");
});

function avaliableMove(dir) {
    //old implementation
    // var inputCol = col_array.indexOf(inputBoxInfo.charAt(0));
    // var inputRow;
    // if(inputBoxInfo.length < 3)
    //  inputRow = Number(inputBoxInfo.charAt(1))-1;
    // else {
    //   var temp = inputBoxInfo.charAt(1) + inputBoxInfo.charAt(2);
    //   inputRow = Number(temp) -1;
    // }
    // var currCandy = board.getCandyAt(inputRow, inputCol);
    // var bool = rules.isMoveTypeValid(currCandy,dir);
    // return bool;

    var inputCol = col_array.indexOf(mouseDownLocation.charAt(0));
    var inputRow;
    if (mouseDownLocation.length < 3)
        inputRow = Number(mouseDownLocation.charAt(1)) - 1;
    else {
        var temp = mouseDownLocation.charAt(1) + mouseDownLocation.charAt(2);
        inputRow = Number(temp) - 1;
    }
    var currCandy = board.getCandyAt(inputRow, inputCol);
    var bool = rules.isMoveTypeValid(currCandy, dir);
    return bool;
}

/* Add basic behaivor to gameplay
 * because this game is stupid
 */
function checkMove(dir) {
    // var inputCol = col_array.indexOf(inputBoxInfo.charAt(0));
    // var inputRow;
    // if(inputBoxInfo.length < 3)
    //  inputRow = Number(inputBoxInfo.charAt(1))-1;
    // else {
    //   var temp = inputBoxInfo.charAt(1) + inputBoxInfo.charAt(2);
    //   inputRow = Number(temp) -1;
    // }
    console.log(mouseDownLocation);
    console.log(mouseUpLocation);
    var inputRow;
    var inputCol = col_array.indexOf(mouseDownLocation.charAt(0));
    if (mouseDownLocation.length < 3)
        inputRow = Number(mouseDownLocation.charAt(1)) - 1;
    else {
        var temp = mouseDownLocation.charAt(1) + mouseDownLocation.charAt(2);
        inputRow = Number(temp) - 1;
    }
    var currCandy = board.getCandyAt(inputRow, inputCol);
    var bool = rules.isMoveTypeValid(currCandy, dir);
    var canvas = document.getElementById("Canvas");
    ctxt = canvas.getContext("2d");

    var candyTo = board.getCandyInDirection(currCandy, dir);

    var size = 320 / board.getSize();

    var clearWidth, clearHeight;

    var destRow, destCol, originRow, originCol;

    if (dir == "right" || dir == "left") {
        clearWidth = size * 2;
        clearHeight = size;
        var originColor, destColor;
        if (currCandy.col > candyTo.col) {
            destCol = currCandy.col * size;
            originCol = candyTo.col * size;
            originColor = candyTo.color;
            destColor = currCandy.color;
        } else {
            destCol = candyTo.col * size;
            originCol = currCandy.col * size;
            originColor = currCandy.color;
            destColor = candyTo.color;
        }
        destRow = candyTo.row * size;
        originRow = currCandy.row * size;
        var timer = 0;

        var inter = setInterval(function () {
            // console.log('switching here');
            ctxt.clearRect(originCol, originRow, clearWidth, clearHeight);

            ctxt.drawImage(
                document.getElementById(originColor + "-candy"),
                originCol + (timer * size) / 20,
                originRow,
                size,
                size
            );
            ctxt.drawImage(
                document.getElementById(destColor + "-candy"),
                destCol - (timer * size) / 20,
                destRow,
                size,
                size
            );

            timer++;
            // console.log(timer);
            if (timer == 21) {
                clearInterval(inter);
                flipAndDraw(currCandy, dir);
            }
        }, 10);
    } else {
        clearWidth = size;
        clearHeight = size * 2;
        if (currCandy.row > candyTo.row) {
            destRow = currCandy.row * size;
            originRow = candyTo.row * size;
            originColor = candyTo.color;
            destColor = currCandy.color;
        } else {
            destRow = candyTo.row * size;
            originRow = currCandy.row * size;
            originColor = currCandy.color;
            destColor = candyTo.color;
        }
        destCol = candyTo.col * size;
        originCol = currCandy.col * size;
        var timer = 0;

        var inter = setInterval(function () {
            ctxt.clearRect(originCol, originRow, clearWidth, clearHeight);

            ctxt.drawImage(
                document.getElementById(originColor + "-candy"),
                originCol,
                originRow + (timer * size) / 20,
                size,
                size
            );
            ctxt.drawImage(
                document.getElementById(destColor + "-candy"),
                destCol,
                destRow - (timer * size) / 20,
                size,
                size
            );

            timer++;

            // console.log(timer);
            if (timer == 21) {
                clearInterval(inter);
                flipAndDraw(currCandy, dir);
            }
        }, 10);
    }
}

function flipAndDraw(currCandy, dir) {
    // console.log(currCandy);
    board.flipCandies(currCandy, board.getCandyInDirection(currCandy, dir));

    // ctxt.clearRect(0, 0, canvas.width, canvas.height);
    $("#mainColumn").html(drawBoard());

    document.getElementById("inputBox").value = null;
    document.getElementById("inputBox").focus();
    validInput = false;
    document.getElementById("up").disabled = true;
    document.getElementById("left").disabled = true;
    document.getElementById("right").disabled = true;
    document.getElementById("down").disabled = true;
    document.getElementById("crusher").disabled = false;
    document.getElementById("inputBox").disabled = true;
    document.getElementById("Canvas").style.pointerEvents = "none";

    var counter = true;
    crushcrush();

    var gg = setInterval(function () {
        // console.log(counter);
        if (globalCrushCounter == true) {
            // console.log(globalCrushCounter);
            crushcrush();
        } else {
            clearInterval(gg);
            document.getElementById("Canvas").style.pointerEvents = "auto";
        }
    }, 1100);
}

function crushcrush() {
    var listRemove = rules.getCandyCrushes();
    var canvas = document.getElementById("Canvas");
    var cxt = canvas.getContext("2d");
    var size = 320 / board.getSize();
    var alphaCounter = 10;
    if (listRemove.length != 0) {
        var numCrush = listRemove.length;
        var crushLength = listRemove[0].length;

        var alpha = setInterval(function () {
            alphaCounter = alphaCounter - 1;
            cxt.globalAlpha = alphaCounter / 10;
            // console.log(alphaCounter/10);
            for (var i = 0; i < numCrush; i++) {
                for (var j = 0; j < crushLength; j++) {
                    var color = String(listRemove[i][j].color) + "-candy";
                    var scoreColor = listRemove[i][j].color;
                    ctx.clearRect(
                        listRemove[i][j].col * size,
                        listRemove[i][j].row * size,
                        size,
                        size
                    );
                    cxt.drawImage(
                        document.getElementById(color),
                        listRemove[i][j].col * size,
                        listRemove[i][j].row * size,
                        size,
                        size
                    );
                }
            }
            // changeColor(scoreColor);
            if (alphaCounter <= 0) {
                clearInterval(alpha);
                // console.log('alpha cleared');
            }
        }, 50);
    }

    setTimeout(function () {
        ctx.globalAlpha = 1.0;
        rules.removeCrushes(listRemove);

        $("#mainColumn").html(drawBoard());
        rules.moveCandiesDown();

        $("#mainColumn").html(drawBoard());

        listRemove = rules.getCandyCrushes();
        if (listRemove.length == 0) {
            document.getElementById("crusher").disabled = true;
            document.getElementById("inputBox").disabled = false;
            document.getElementById("inputBox").focus();
            // console.log('crush false');
            globalCrushCounter = false;
        } else {
            document.getElementById("inputBox").disabled = true;
            // console.log('crush true');
            globalCrushCounter = true;
        }
    }, 550);
}
function getAllCandy(crushList) {
    var candies = [];
    // console.log(crushList);
    for (var i = 0; i < crushList.length; i++) {
        for (var j = 0; j < crushList[i].length; j++) {
            // console.log(candies);
        }
    }
}

function changeColor(candy) {
    var colorChange = "style=background-color:" + candy;
    switch (colorChange) {
        case "style=background-color:red":
            document.getElementById("score").style.backgroundColor = "red";
            break;
        case "style=background-color:green":
            document.getElementById("score").style.backgroundColor = "green";
            break;
        case "style=background-color:blue":
            document.getElementById("score").style.backgroundColor = "blue";
            break;
        case "style=background-color:orange":
            document.getElementById("score").style.backgroundColor = "orange";
            break;
        case "style=background-color:purple":
            document.getElementById("score").style.backgroundColor = "purple";
            break;
        case "style=background-color:yellow":
            document.getElementById("score").style.backgroundColor = "yellow";
            break;
    }
}

function drawCandy(row, col, size, color) {
    // switch (color) {
    //     case 'red':
    //         ctx.drawImage(document.getElementById('red-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    //     case 'green':
    //         ctx.drawImage(document.getElementById('green-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    //     case 'blue':
    //         ctx.drawImage(document.getElementById('blue-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    //     case 'orange':
    //         ctx.drawImage(document.getElementById('orange-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    //     case 'purple':
    //         ctx.drawImage(document.getElementById('purple-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    //     case 'yellow':
    //         ctx.drawImage(document.getElementById('yellow-candy'), col * size, row * size, candyWidth, candyHeight);
    //         ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
    //         break;
    // }
}

function getCanvasPos(evt) {
    var canvasRect = document.getElementById("Canvas").getBoundingClientRect();
    //Get relative position on canvas
    var xPos, yPos;
    if (
        evt.type == "touchstart" ||
        evt.type == "touchmove" ||
        evt.type == "touchend" ||
        evt.type == "touchcancel"
    ) {
        var touch =
            evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
        xPos = touch.clientX - canvasRect.left;
        yPos = touch.clientY - canvasRect.top;
    } else if (
        evt.type == "mousedown" ||
        evt.type == "mouseup" ||
        evt.type == "mousemove" ||
        evt.type == "mouseover" ||
        evt.type == "mouseout" ||
        evt.type == "mouseenter" ||
        e.type == "mouseleave"
    ) {
        xPos = evt.clientX - canvasRect.left;
        yPos = evt.clientY - canvasRect.top;
    }
    //Get coordinate
    var size = 320 / BOARD_SIZE;
    yPos = Math.floor(yPos / size) + 1;
    xPos = Math.floor(xPos / size);
    xPos = col_array[xPos];

    // console.log({ col: xPos, row: yPos});
    return xPos + yPos;
}
// ------------mobile
$(document).on("touchstart", "#Canvas", function (evt) {
    console.log("touchstart");
    mouseDownLocation = getCanvasPos(evt);
    console.log("touchstart: " + mouseDownLocation);

    document.getElementById("inputBox").value = mouseDownLocation;
});

$(document).on("touchend", "#Canvas", function (evt) {
    console.log("touchend");
    mouseUpLocation = getCanvasPos(evt);
    console.log("mouseUp: " + mouseUpLocation);
    clearMoves();
    $("#mainColumn").html(drawBoard());

    checkDrag();
});

$(document).on("touchmove", "#Canvas", function (evt) {
    console.log("touchmove");
});

$(document).on("mouseout", "#Canvas", function (evt) {
    console.log("mouseout");
});

// ------------PC

$(document).on("mousedown", "#Canvas", function (evt) {
    console.log("mousedown");
    mouseDownLocation = getCanvasPos(evt);
    console.log("mousedown: " + mouseDownLocation);

    document.getElementById("inputBox").value = mouseDownLocation;
});

$(document).on("mouseup", "#Canvas", function (evt) {
    console.log("mouseup");
    mouseUpLocation = getCanvasPos(evt);
    console.log("mouseUp: " + mouseUpLocation);
    clearMoves();
    $("#mainColumn").html(drawBoard());

    checkDrag();
});

$(document).on("mousemove", "#Canvas", function (evt) {
    console.log("mousemove");
});

$(document).on("mouseout", "#Canvas", function (evt) {
    console.log("mouseout");
});
// $(document).on('click', "#Canvas", function(evt) {
//   var location = getCanvasPos(evt);
//   // console.log(location);
//   clearMoves();
//   $("#mainColumn").html(drawBoard());
//   document.getElementById('inputBox').value = location;
//   checkInput(); //Once click it will check for possible moves
// });

function checkDrag() {
    var originCol = col_array.indexOf(mouseDownLocation.charAt(0));
    var destCol = col_array.indexOf(mouseUpLocation.charAt(0));
    var spliceSize = BOARD_SIZE > 9 ? 2 : 1;
    var originRow = mouseDownLocation.substr(1, spliceSize);
    var destRow = mouseUpLocation.substr(1, spliceSize);
    // console.log(originRow);
    // console.log(destRow);
    // console.log(mouseDownLocation);
    // console.log(mouseUpLocation);
    // console.log(originCol);
    // console.log(destCol);
    if (originCol == destCol) {
        //moving up or down
        if (originRow < destRow) {
            if (avaliableMove("down")) {
                checkMove("down");
                document.getElementById("invalid").style.visibility = "hidden";
            } else
                document.getElementById("invalid").style.visibility = "visible";
        } else {
            if (avaliableMove("up")) {
                checkMove("up");
                document.getElementById("invalid").style.visibility = "hidden";
            } else
                document.getElementById("invalid").style.visibility = "visible";
        }
    } else {
        if (originCol < destCol) {
            if (avaliableMove("right")) {
                checkMove("right");
                document.getElementById("invalid").style.visibility = "hidden";
            } else
                document.getElementById("invalid").style.visibility = "visible";
        } else {
            if (avaliableMove("left")) {
                checkMove("left");
                document.getElementById("invalid").style.visibility = "hidden";
            } else
                document.getElementById("invalid").style.visibility = "visible";
        }
        //moving left or right
    }
}
function clearMoves() {
    document.getElementById("left").disabled = true;
    document.getElementById("right").disabled = true;
    document.getElementById("up").disabled = true;
    document.getElementById("down").disabled = true;
}

function load_img(imgToLoad) {
    var loaded = false;
    var counter = 0;
    for (var i = 0; i < imgToLoad.length; i++) {
        var img = new Image();
        // console.log(imgToLoad.length);
        img.onload = function () {
            counter++;
            //console.log(imgToLoad[i]);
            // console.log(counter);
            if (counter == imgToLoad.length) {
                loaded = true;
                // console.log(loaded);
            }
        };
        img.src = imgToLoad[i];
        // console.log(img.src);
        img_array = img;
    }
    // console.log(loaded);
    // return img_array;
}

function drawBoard() {
    load_img([
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
    ]);

    var size = 320 / board.getSize();
    var candyHeight = size;
    var candyWidth = size;

    // console.log(size);
    var canvas = document.getElementById("Canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = "lightgrey";

    for (var row = 0; row < BOARD_SIZE; row++) {
        for (var col = 0; col < BOARD_SIZE; col++) {
            var colorBack = board.getCandyAt(row, col);
            var color = "style=background-color:" + colorBack;

            switch (color) {
                case "style=background-color:red":
                    // ctx.globalAlpha = .5;
                    ctx.drawImage(
                        document.getElementById("red-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    // ctx.globalAlpha = 1.0;
                    break;
                case "style=background-color:green":
                    ctx.drawImage(
                        document.getElementById("green-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case "style=background-color:blue":
                    ctx.drawImage(
                        document.getElementById("blue-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case "style=background-color:orange":
                    ctx.drawImage(
                        document.getElementById("orange-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case "style=background-color:purple":
                    ctx.drawImage(
                        document.getElementById("purple-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case "style=background-color:yellow":
                    ctx.drawImage(
                        document.getElementById("yellow-candy"),
                        col * size,
                        row * size,
                        candyWidth,
                        candyHeight
                    );
                    // ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
            }
            // ctx.drawImage(document.getElementById('green-candy'), row, col, (320/8), (320/8));
            // ctx.drawImage(document.getElementById('orange-candy'),row, col, 20,10);
        }
    }
    var canvas2 = document.getElementById("candyCanvas1");
    cntxt = canvas2.getContext("2d");
    cntxt.fillRect(0, 0, 200, 200);
}

window.addEventListener("resize", (e) => {
    console.log(window.innerWidth, window.innerHeight);
    if (window.innerWidth < window.innerHeight) {
        document.body.style.alignItems = "flex-start";
    } else {
        document.body.style.alignItems = "center";
    }
});

// add bg sound
const handleBackgroundSound = () => {
    const audioTag = document.createElement("audio");
    const source = document.createElement("source");
    audioTag.setAttribute("id", "backgroundSound");
    audioTag.setAttribute("muted", "true");

    source.setAttribute("src", backgroundSoundB64);
    source.setAttribute("type", "audio/mpeg");
    audioTag.appendChild(source);
    document.querySelector(".container").appendChild(audioTag);

    let bgSound = document.getElementById("backgroundSound");
    bgSound.play();
    bgSound.addEventListener(
        "ended",
        function () {
            this.currentTime = 0;
            this.play();
        },
        false
    );

    backgroundSound = true;

    //turn off tutorial
    document
        .querySelector(".tutorial")
        .removeEventListener("touchstart", handleBackgroundSound, false);
    document.querySelector(".tutorial").style.display = "none";
};
if (backgroundSound === false) {
    document
        .querySelector(".tutorial")
        .addEventListener("touchstart", handleBackgroundSound);
}

$(board).on("scoreUpdate", function (e, info) {
    let score = board.getScore();

    //handle cage
    const pullUpLocation = (score / 30 || 0) * 100 * 2.5;
    document.querySelector(".cage-door").style.bottom = `${pullUpLocation - 30
        }px`;
    if (pullUpLocation - 30 >= 245) {
        document.querySelector(
            "#char-animation"
        ).style.backgroundImage = `url(${charHappyB64})`;
        document.querySelector("#char-animation").style.width = `170px`;
    }

    //handle win game.
    if (score >= scoreWin) {
        //offbgsound
        let bgSound = document.getElementById("backgroundSound");
        bgSound.pause();
        bgSoundcurrentTime = 0;

        //play wwin sound
        const audioTag = document.createElement("audio");
        const source = document.createElement("source");
        audioTag.setAttribute("id", "winSound");
        audioTag.setAttribute("muted", "true");

        source.setAttribute("src", winSoundB64);
        source.setAttribute("type", "audio/mpeg");
        audioTag.appendChild(source);
        document.querySelector(".container").appendChild(audioTag);

        let winSound = document.getElementById("winSound");
        winSound.play();

        //show cta
        document.querySelector(".text-tutorial").textContent =
            "TAP TO CONTINUE";
        document.querySelector(".hand-animation").style.display = "none";
        document.querySelector(".tutorial").style.display = "block";
        playConfetti();
        document
            .querySelector(".tutorial")
            .addEventListener("touchstart", () => {
                console.log("GOTOSTORE");
            });
    }
});

const playConfetti = () => {
    document.querySelector(".player-wrap").style.display = "block";
    /**
     * Confetti particle class
     */
    class ConfettiParticle {
        constructor(context, width, height) {
            this.context = context;
            this.width = width;
            this.height = height;
            this.color = "";
            this.lightness = 50;
            this.diameter = 0;
            this.tilt = 0;
            this.tiltAngleIncrement = 0;
            this.tiltAngle = 0;
            this.particleSpeed = 1;
            this.waveAngle = 0;
            this.x = 0;
            this.y = 0;
            this.reset();
        }

        reset() {
            this.lightness = 50;
            this.color = Math.floor(Math.random() * 360);
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height - this.height;
            this.diameter = Math.random() * 6 + 4;
            this.tilt = 0;
            this.tiltAngleIncrement = Math.random() * 0.1 + 0.04;
            this.tiltAngle = 0;
        }

        darken() {
            if (this.y < 100 || this.lightness <= 0) return;
            this.lightness -= 250 / this.height;
        }

        update() {
            this.waveAngle += this.tiltAngleIncrement;
            this.tiltAngle += this.tiltAngleIncrement;
            this.tilt = Math.sin(this.tiltAngle) * 12;
            this.x += Math.sin(this.waveAngle);
            this.y +=
                (Math.cos(this.waveAngle) +
                    this.diameter +
                    this.particleSpeed) *
                0.4;
            if (this.complete()) this.reset();
            this.darken();
        }

        complete() {
            return this.y > this.height + 20;
        }

        draw() {
            let x = this.x + this.tilt;
            this.context.beginPath();
            this.context.lineWidth = this.diameter;
            this.context.strokeStyle =
                "hsl(" + this.color + ", 50%, " + this.lightness + "%)";
            this.context.moveTo(x + this.diameter / 2, this.y);
            this.context.lineTo(x, this.y + this.tilt + this.diameter / 2);
            this.context.stroke();
        }
    }

    /**
     * Setup
     */
    (function () {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];

        // particle canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.id = "particle-canvas";
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        // change body bg color
        const changeBgColor = () => {
            const hue = Math.floor(Math.random() * 360);
            document.body.style.backgroundColor = "hsl(" + hue + ", 50%, 5%)";
        };

        // update canvas size
        const updateSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // create confetti particles
        const createParticles = () => {
            particles = [];
            let total = 100;

            if (width > 1080) {
                total = 400;
            } else if (width > 760) {
                total = 300;
            } else if (width > 520) {
                total = 200;
            }

            for (let i = 0; i < total; ++i) {
                particles.push(new ConfettiParticle(context, width, height));
            }
        };

        // animation loop function
        const animationFunc = () => {
            requestAnimationFrame(animationFunc);
            if (Math.random() > 0.98) changeBgColor();
            context.clearRect(0, 0, width, height);

            for (let p of particles) {
                p.width = width;
                p.height = height;
                p.update();
                p.draw();
            }
        };

        // on resize
        window.addEventListener("resize", (e) => {
            updateSize();
            createParticles();
        });

        // start
        updateSize();
        createParticles();
        changeBgColor();
        animationFunc();

        // setup audio
        // const aos = new AmpedOutStream();
        // aos.play();
    })();
};

var focused = true;

window.onfocus = function () {
    focused = true;
    let bgSound = document.getElementById("backgroundSound");
    if (bgSound) {
        bgSound.muted = false;
    }
};
window.onblur = function () {
    focused = false;
    let bgSound = document.getElementById("backgroundSound");
    if (bgSound) {
        bgSound.muted = true;
    }
};
