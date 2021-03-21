var gameContainer;
var HUDArea;
var gameArea;
var gameAreaBoundaries;
var squares = new Array(8 * 8);

class Piece {
    constructor(pieceNum) {
        this.pieceNum = pieceNum;
    }
}

$(function () {
    gameContainer = $("#chessGame");

    // HUD
    HUDArea = gameContainer.find(".gameHUDArea");
    HUDArea.children().css("width", (100 / HUDArea.children().length) + "%");

    // Play
    gameArea = gameContainer.find(".gameArea");
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            gameArea.append("<div class=\"chessSquare" + ((((col + (row % 2)) % 2) == 0) ? "White" : "Grey") + "\"></div>");
            squares[(row * 8) + col] = $("[class^=\"chessSquare\"]").last();
        }
    }

    // Buttons
    buttonsArea = gameContainer.find(".gameButtonsArea");

    // Resizing
    function calculateSizes() {
        gameAreaBoundaries = {
            left: gameContainer.position().left + parseInt(gameContainer.css("margin-left").replace("px", "")) + parseInt(gameArea.css("margin-left").replace("px", "")) + parseInt(gameArea.css("padding-left").replace("px", "")),
            top: gameContainer.position().top + parseInt(gameContainer.css("margin-top").replace("px", "")) + parseInt(HUDArea.css("height").replace("px", "")) + parseInt(gameArea.css("margin-top").replace("px", "")) + parseInt(gameArea.css("padding-top").replace("px", ""))
        };
        gameContainer.css("height", gameContainer.width() + HUDArea.height());
        gameArea.css("height", gameContainer.height() - (parseInt(gameArea.css("margin-top").replace("px", "")) + parseInt(gameArea.css("padding-top").replace("px", "")) + parseInt(gameArea.css("margin-bottom").replace("px", "")) + parseInt(gameArea.css("padding-bottom").replace("px", ""))) - HUDArea.height() - buttonsArea.height() + "px");
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var squareNum = (row * 8) + col;
                squares[squareNum].css("width", (gameArea.width() / 8) + "px");
                squares[squareNum].css("height", (gameArea.height() / 8) + "px");
                squares[squareNum].css("left", gameAreaBoundaries.left + (gameArea.width() / 8 * col) + "px");
                squares[squareNum].css("top", gameAreaBoundaries.top + (gameArea.height() / 8 * row) + "px");
            }
        }
    }
    calculateSizes();

    $(window).resize(function () {
        calculateSizes();
    });
});
