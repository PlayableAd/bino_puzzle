
// By default, the first board loaded by your page will be the same 
// each time you load (which is accomplished by "seeding" the random
// number generator. This makes testing (and grading!) easier!
Math.seedrandom(0);


// A short jQuery extension to read query parameters from the URL.
$.extend({
    getUrlVars: function () {
        var vars = [], pair;
        var pairs = window.location.search.substr(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i].split('=');
            vars.push(pair[0]);
            vars[pair[0]] = pair[1] &&
                decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

// constants
var DEFAULT_BOARD_SIZE = 8;

// data model at global scope for easier debugging
var board;
var rules;
var col_array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var inputBoxInfo;
var validInput = false;
var image_array;
var BOARD_SIZE;
var globalCrushCounter = true;
var mouseDownLocation;
var mouseUpLocation;

// initialize board
if ($.getUrlVar('size') && $.getUrlVar('size') >= 3) {
    board = new Board($.getUrlVar('size'));
    BOARD_SIZE = $.getUrlVar('size');
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
$(board).on('add', function (e, info) {
    // Your code here.
});

// move a candy on the board
$(board).on('move', function (e, info) {
    // Your code here.
});

// remove a candy from the board
$(board).on('remove', function (e, info) {
    // Your code here.
    // var candy = info.candy;
    // console.log('candy remved');
    // // console.log(candy);

    // $('info').fadeOut('slow');

});

// move a candy on the board
$(board).on('scoreUpdate', function (e, info) {
    // Your code here. To be implemented in pset 2.
    $("#score").html(board.getScore());
});

// keyboard events arrive here
$(document).on('keydown', function (evt) {
    // Your code here.
});

// Button Events
$(document).on('click', "#newGame", function (evt) {
    rules.cleanBoard();
    rules.prepareNewGame();
    $("#mainColumn").html(drawBoard());
    board.resetScore();
});


$(document).keypress(function (evt) {
    if (evt.which == 13) {
        checkInput();
    }
});

function checkInput() {
    inputBoxInfo = document.getElementById('inputBox').value;
    // console.log(inputBoxInfo.length);
    if (inputBoxInfo.length <= 3) {
        var bool1 = col_array.indexOf(inputBoxInfo.charAt(0)) != -1;
        var bool2 = (Number(inputBoxInfo.charAt(1)) > 0 && Number(inputBoxInfo.charAt(1)) <= 20);
        if (bool1 && bool2) {
            validInput = true;
            var counter = 0;
            if (avaliableMove('up')) {
                document.getElementById('up').disabled = false;
                counter++;
            }
            if (avaliableMove('left')) {
                document.getElementById('left').disabled = false;
                counter++;
            }
            if (avaliableMove('right')) {
                document.getElementById('right').disabled = false;
                counter++;
            }
            if (avaliableMove('down')) {
                document.getElementById('down').disabled = false;
                counter++;
            }
            if (counter > 0)
                return;
        }
    }
    // console.log("hello");
    document.getElementById('inputBox').value = null;
    document.getElementById('inputBox').focus();
    document.getElementById('up').disabled = true;
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    document.getElementById('down').disabled = true;
}

// $(document).on('focusout', "#inputBox", function(evt){
//   checkInput();
// });

$(document).on('click', "#up", function (evt) {
    if (validInput)
        checkMove('up');
});

$(document).on('click', "#left", function (evt) {
    if (validInput)
        checkMove('left');
});

$(document).on('click', "#right", function (evt) {
    if (validInput)
        checkMove('right');
});

$(document).on('click', "#down", function (evt) {
    if (validInput)
        checkMove('down');
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
    var canvas = document.getElementById('Canvas');
    ctxt = canvas.getContext('2d');
    
    var candyTo = board.getCandyInDirection(currCandy, dir);
    var size = (320 / board.getSize());

    var clearWidth, clearHeight;

    var destRow, destCol, originRow, originCol;

    if (dir == 'right' || dir == 'left') {
        clearWidth = size * 2;
        clearHeight = size;
        var originColor, destColor;
        if (currCandy.col > candyTo.col) {
            destCol = currCandy.col * size;
            originCol = candyTo.col * size;
            originColor = candyTo.color;
            destColor = currCandy.color;
        }
        else {
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

            ctxt.drawImage(document.getElementById(originColor + '-candy'), originCol + timer * size / 20, originRow, size, size);
            ctxt.drawImage(document.getElementById(destColor + '-candy'), destCol - timer * size / 20, destRow, size, size);

            timer++;
            // console.log(timer);
            if (timer == 21) {
                clearInterval(inter);
                flipAndDraw(currCandy, dir);
            }
        }, 10);
    }

    else {
        clearWidth = size;
        clearHeight = size * 2;
        if (currCandy.row > candyTo.row) {
            destRow = currCandy.row * size;
            originRow = candyTo.row * size;
            originColor = candyTo.color;
            destColor = currCandy.color;
        }
        else {
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

            ctxt.drawImage(document.getElementById(originColor + '-candy'), originCol, originRow + timer * size / 20, size, size);
            ctxt.drawImage(document.getElementById(destColor + '-candy'), destCol, destRow - timer * size / 20, size, size);

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


    document.getElementById('inputBox').value = null;
    document.getElementById('inputBox').focus();
    validInput = false;
    document.getElementById('up').disabled = true;
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    document.getElementById('down').disabled = true;
    document.getElementById('crusher').disabled = false;
    document.getElementById('inputBox').disabled = true;
    document.getElementById('Canvas').style.pointerEvents = 'none';

    var counter = true;
    crushcrush();

    var gg = setInterval(function () {
        // console.log(counter);
        if (globalCrushCounter == true) {
            // console.log(globalCrushCounter);
            crushcrush();
        }
        else {
            clearInterval(gg);
            document.getElementById('Canvas').style.pointerEvents = 'auto';

        }
    }, 1100);
}

function crushcrush() {

    var listRemove = rules.getCandyCrushes();
    var canvas = document.getElementById("Canvas");
    var cxt = canvas.getContext('2d');
    var size = (320 / board.getSize());
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
                    var color = String(listRemove[i][j].color) + '-candy';
                    var scoreColor = listRemove[i][j].color;
                    ctx.clearRect(listRemove[i][j].col * size, listRemove[i][j].row * size, size, size);
                    cxt.drawImage(document.getElementById(color), listRemove[i][j].col * size, listRemove[i][j].row * size, size, size);
                }
            }
            changeColor(scoreColor);
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
            document.getElementById('crusher').disabled = true;
            document.getElementById('inputBox').disabled = false;
            document.getElementById('inputBox').focus();
            // console.log('crush false');
            globalCrushCounter = false;
        }

        else {
            document.getElementById('inputBox').disabled = true;
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
    var colorChange = 'style=background-color:' + candy;
    switch (colorChange) {
        case 'style=background-color:red':
            document.getElementById('score').style.backgroundColor = 'red';
            break;
        case 'style=background-color:green':
            document.getElementById('score').style.backgroundColor = 'green';
            break;
        case 'style=background-color:blue':
            document.getElementById('score').style.backgroundColor = 'blue';
            break;
        case 'style=background-color:orange':
            document.getElementById('score').style.backgroundColor = 'orange';
            break;
        case 'style=background-color:purple':
            document.getElementById('score').style.backgroundColor = 'purple';
            break;
        case 'style=background-color:yellow':
            document.getElementById('score').style.backgroundColor = 'yellow';
            break;
    }
}

function drawCandy(row, col, size, color) {
    switch (color) {
        case 'red':
            ctx.drawImage(document.getElementById('red-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
        case 'green':
            ctx.drawImage(document.getElementById('green-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
        case 'blue':
            ctx.drawImage(document.getElementById('blue-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
        case 'orange':
            ctx.drawImage(document.getElementById('orange-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
        case 'purple':
            ctx.drawImage(document.getElementById('purple-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
        case 'yellow':
            ctx.drawImage(document.getElementById('yellow-candy'), col * size, row * size, candyWidth, candyHeight);
            ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
            break;
    }
}




// $(document).on('click', "#crusher", function(evt){
//     var listRemove = rules.getCandyCrushes();
//     // console.log(listRemove);
//     var candy = listRemove[0][0];
//     // console.log(candy);
//     var colorChange = 'style=background-color:' + candy;
//     switch(colorChange){
//       case 'style=background-color:red':
//         document.getElementById('score').style.backgroundColor = 'red';
//         break;
//       case 'style=background-color:green':
//         document.getElementById('score').style.backgroundColor = 'green';
//         break;
//       case 'style=background-color:blue':
//         document.getElementById('score').style.backgroundColor = 'blue';
//         break;
//       case 'style=background-color:orange':
//         document.getElementById('score').style.backgroundColor = 'orange';
//         break;
//       case 'style=background-color:purple':
//         document.getElementById('score').style.backgroundColor = 'purple';
//         break;
//       case 'style=background-color:yellow':
//         document.getElementById('score').style.backgroundColor = 'yellow';
//         break;
//     }

//     // console.log(colorChange);
//     rules.removeCrushes(listRemove);

//     $("#mainColumn").html(drawBoard());

//     setTimeout(function(){ 
//       rules.moveCandiesDown();
//       $("#mainColumn").html(drawBoard());
//       listRemove = rules.getCandyCrushes();
//       if(listRemove.length == 0) {
//         document.getElementById('crusher').disabled = true;
//         document.getElementById('inputBox').disabled = false;
//         document.getElementById('inputBox').focus();
//       }
//       else
//         document.getElementById('inputBox').disabled = true;
//     }, 500);

// });


function getCanvasPos(evt) {
    var canvasRect = document.getElementById('Canvas').getBoundingClientRect();

    //Get relative position on canvas
    var xPos = (evt.clientX - canvasRect.left);
    var yPos = (evt.clientY - canvasRect.top);

    //Get coordinate
    var size = 320 / BOARD_SIZE;
    yPos = Math.floor((yPos / size)) + 1;
    xPos = Math.floor((xPos / size));
    xPos = col_array[xPos];

    // console.log({ col: xPos, row: yPos});
    return xPos + yPos;
}

$(document).on('mousedown', '#Canvas', function (evt) {
    console.log('mousedown');
    mouseDownLocation = getCanvasPos(evt);
    console.log('mousedown: ' + mouseDownLocation);

    document.getElementById('inputBox').value = mouseDownLocation;
});

$(document).on('mouseup', '#Canvas', function (evt) {
    console.log('mouseup');
    mouseUpLocation = getCanvasPos(evt);
    console.log('mouseUp: ' + mouseUpLocation);
    clearMoves();
    $("#mainColumn").html(drawBoard());

    checkDrag();
});

$(document).on('mousemove', '#Canvas', function (evt) {
    console.log('mousemove');
});

$(document).on('mouseout', '#Canvas', function (evt) {
    console.log('mouseout');
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
            if (avaliableMove('down')) {
                checkMove('down');
                document.getElementById("invalid").style.visibility = 'hidden';
            }
            else
                document.getElementById("invalid").style.visibility = 'visible';
        }
        else {
            if (avaliableMove('up')) {
                checkMove('up');
                document.getElementById("invalid").style.visibility = 'hidden';
            }
            else
                document.getElementById("invalid").style.visibility = 'visible';
        }
    }
    else {
        if (originCol < destCol) {
            if (avaliableMove('right')) {
                checkMove('right');
                document.getElementById("invalid").style.visibility = 'hidden';
            }
            else
                document.getElementById("invalid").style.visibility = 'visible';
        }
        else {
            if (avaliableMove('left')) {
                checkMove('left');
                document.getElementById("invalid").style.visibility = 'hidden';
            }
            else
                document.getElementById("invalid").style.visibility = 'visible';
        }
        //moving left or right
    }

}
function clearMoves() {
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    document.getElementById('up').disabled = true;
    document.getElementById('down').disabled = true;
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
        }
        img.src = imgToLoad[i];
        // console.log(img.src);
        img_array = img;

    }
    // console.log(loaded);
    // return img_array;
}

function drawBoard() {

    load_img(['./graphics/blue-candy.png', './graphics/blue-special.png',
        './graphics/green-candy.png', './graphics/green-special.png',
        './graphics/orange-candy.png', './graphics/orange-special.png',
        './graphics/purple-candy.png', './graphics/purple-special.png',
        './graphics/red-candy.png', './graphics/red-special.png',
        './graphics/yellow-candy.png', './graphics/color-bomb.png']);

    var size = 320 / board.getSize();
    var candyHeight = size;
    var candyWidth = size;

    // console.log(size);
    var canvas = document.getElementById('Canvas');
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = "lightgrey";


    for (var row = 0; row < BOARD_SIZE; row++) {
        for (var col = 0; col < BOARD_SIZE; col++) {
            var colorBack = board.getCandyAt(row, col);
            var color = "style=background-color:" + colorBack;

            switch (color) {
                case 'style=background-color:red':
                    // ctx.globalAlpha = .5;
                    ctx.drawImage(document.getElementById('red-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    // ctx.globalAlpha = 1.0;
                    break;
                case 'style=background-color:green':
                    ctx.drawImage(document.getElementById('green-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case 'style=background-color:blue':
                    ctx.drawImage(document.getElementById('blue-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case 'style=background-color:orange':
                    ctx.drawImage(document.getElementById('orange-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case 'style=background-color:purple':
                    ctx.drawImage(document.getElementById('purple-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
                case 'style=background-color:yellow':
                    ctx.drawImage(document.getElementById('yellow-candy'), col * size, row * size, candyWidth, candyHeight);
                    ctx.strokeRect(col * size, row * size, candyWidth, candyHeight);
                    break;
            }
            // ctx.drawImage(document.getElementById('green-candy'), row, col, (320/8), (320/8));
            // ctx.drawImage(document.getElementById('orange-candy'),row, col, 20,10);
        }
    }
    var canvas2 = document.getElementById('candyCanvas1');
    cntxt = canvas2.getContext('2d');
    cntxt.fillRect(0, 0, 200, 200);
}
