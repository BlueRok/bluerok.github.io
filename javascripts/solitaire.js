var wholeGameArea;
var scoreArea;
var timeScore;
var timeScoreHrs;
var timeScoreMins;
var timeScoreSecs;
var timeScoreTime;
var timeStart;
var timeScoreTimer;
var timeScoreArea;
var pointsScore = 0;
var pointsScoreArea;
var gameArea;
var solitaireDirectory;
var resetDeckButtonSrc;
var resetDeckButton;
var buttonsArea;
var playButton;
var hardButton;
var mediumButton;
var easyButton;
var touchDevice;
var GAME_TYPES = {
    Easy: 1,
    Medium: 2,
    Hard: 3
};
var GAME_DIFFICULTY = GAME_TYPES.Hard;
var gameLoaded = false;
var gameStarted = false;
var gameFinished = false;
var autoCompleteTime = 400;
var deckDealTimer = undefined;
var deckDealTime = 500;
var deckFaceUpCards = 0;
var deckMargin = 0.35;
var deckPadding = 0.3;
var numberOfFoundations = 4;
var foundationSrc;
var foundationAreaWidth = 0.55;
var foundationY;
var topMargin;
var numberOfTableax = 7;
var gameAreaBoundaries;
var dropBuffer;
var movingCards = [];
var foundations = [];
var tableauMaxCardPadding;
var tableauTop;
var tableaux = [];
$(function () {
    wholeGameArea = $("#solitaireGame");

    // Score
    scoreArea = wholeGameArea.find(".gameScoreArea");
    scoreArea.append("<div class=\"gameScoreTime\"></div>");
    scoreArea.append("<div class=\"gameScorePoints\"></div>");
    timeScoreArea = scoreArea.find(".gameScoreTime");
    pointsScoreArea = scoreArea.find(".gameScorePoints");

    // Play
    gameArea = wholeGameArea.find(".gameArea");
    solitaireDirectory = cardsDirectory + "solitaire/";
    resetDeckButtonSrc = solitaireDirectory + "resetDeck.png";
    gameArea.append("<img class=\"card\" src=\"" + resetDeckButtonSrc + "\" draggable=false>");
    resetDeckButton = gameArea.find("img[src$=\"" + resetDeckButtonSrc + "\"]");

    // Buttons
    buttonsArea = wholeGameArea.find(".gameButtonsArea");
    buttonsArea.append("<button class=\"gameButtonsPlay\">Play</button>");
    buttonsArea.append("<button class=\"gameButtonsHard\" hidden>Hard</button>");
    buttonsArea.append("<button class=\"gameButtonsMedium\" hidden>Medium</button>");
    buttonsArea.append("<button class=\"gameButtonsEasy\" hidden>Easy</button>");
    playButton = buttonsArea.find(".gameButtonsPlay");
    hardButton = buttonsArea.find(".gameButtonsHard");
    mediumButton = buttonsArea.find(".gameButtonsMedium");
    easyButton = buttonsArea.find(".gameButtonsEasy");
    playButton.on("click", function (event) {
        showDifficultyButtons(1000);
        playButton.hide();
    });
    hardButton.on("click", function (event) {
        GAME_DIFFICULTY = GAME_TYPES.Hard;
        startGame();
        hideDifficultyButtons(250);
    });
    mediumButton.on("click", function (event) {
        GAME_DIFFICULTY = GAME_TYPES.Medium;
        startGame();
        hideDifficultyButtons(500);
    });
    easyButton.on("click", function (event) {
        GAME_DIFFICULTY = GAME_TYPES.Easy;
        startGame();
        hideDifficultyButtons(1000);
    });

    function setTimeScore(change) {
        timeScore = new Date(new Date().getTime() - timeStart);
        timeScoreHrs = timeScore.getHours();
        timeScoreMins = ("0" + timeScore.getMinutes()).slice(-2);
        timeScoreSecs = ("0" + timeScore.getSeconds()).slice(-2);
        if (timeScoreHrs.toString().length < 2) {
            timeScoreHrs = "0" + timeScoreHrs;
        }
        timeScoreTime = timeScoreHrs + ":" + timeScoreMins + ":" + timeScoreSecs;
        timeScoreArea.text("Time: " + timeScoreTime);

        if ((timeScoreSecs % 10) == 0) {
            setPointsScore(-2);
        }
    }

    function setPointsScore(change) {
        if (!gameFinished) {
            pointsScore += change;
            if (pointsScore < 0) {
                pointsScore = 0;
            }
            pointsScoreArea.text("Score: " + pointsScore);
        }
    }

    function showDifficultyButtons(time) {
        hardButton.fadeIn(time);
        mediumButton.fadeIn(time);
        easyButton.fadeIn(time);
    }

    function hideDifficultyButtons(time) {
        hardButton.slideUp(time);
        mediumButton.slideUp(time);
        easyButton.slideUp(time);
    }

    function startGame() {
        calculateSizes();
        handDealCards();
        gameStarted = true;
        scoreArea.css("background-color", buttonsArea.css("background-color"));
        timeStart = new Date().getTime();
        setTimeScore();
        setPointsScore(0);
        timeScoreTimer = setInterval(function () {
            setTimeScore(1);
        }, 1000);
    }

    function gameOver() {
        alert("You won!\nYou took " + timeScoreTime + "\n\nRestart to play again");
    }

    scoreArea.css("background-color", wholeGameArea.css("background-color"));
    generateCards(gameArea);

    touchDevice = ('ontouchstart' in window) || ('onmsgesturechange' in window);

    // Deck
    function handDealCards() {
        for (var i = 0; i < tableaux.length; i++) {
            for (var j = i; j < tableaux.length; j++) {
                var cardID = DECK.cardIDs[DECK.cardIDs.length - 1];
                tableaux[j].addCard(cardID, i);
                DECK.removeCard(cardID);
                if (j == i) {
                    CARD_OBJECTS[cardID].turnFaceUp(function (currentCardID) {
                        CARD_OBJECTS[currentCardID].cardImage.attr("draggable", true);
                    });
                }
            }
        }
    }

    function getDeckCardPosX(cardNum) {
        return DECK.x + (cardImageSize.width * (1 + deckMargin + (deckPadding * cardNum)))
    }

    function removeCardFromDeck(cardID) {
        cardID = parseInt(cardID);
        for (var j = 1; j <= GAME_DIFFICULTY; j++) {
            var prevCardID = DECK.cardIDs[DECK.cardIDs.indexOf(cardID) + j];
            if (prevCardID != undefined) {
                if (j < GAME_DIFFICULTY) {
                    CARD_OBJECTS[prevCardID].lastPosX = getDeckCardPosX(GAME_DIFFICULTY - 1 - j + 1);
                    CARD_OBJECTS[prevCardID].cardImage.css("z-index", parseInt(CARD_OBJECTS[prevCardID].cardImage.css("z-index")) + 1);
                    moveCardToLastPos(prevCardID, cardMoveTime);
                } else {
                    CARD_OBJECTS[prevCardID].cardImage.css("z-index", 1);
                }
            }
        }
        DECK.removeCard(cardID);
        deckFaceUpCards--;
        if (deckFaceUpCards > 0) {
            CARD_OBJECTS[DECK.cardIDs[DECK.cardIDs.length - 1 - (deckFaceUpCards - 1)]].cardImage.attr("draggable", true);
        }
    }

    function isFromDeck(cardID) {
        var result = false;
        var dropWidth = getDeckCardPosX(GAME_DIFFICULTY - 1) - getDeckCardPosX(0);
        if (isInPos({
                x: CARD_OBJECTS[cardID].lastPosX,
                y: CARD_OBJECTS[cardID].lastPosY
            }, {
                x: getDeckCardPosX(0) + (dropWidth / 2),
                y: DECK.y
            }, {
                x: (dropWidth / 2) + 0.1,
                y: 0.1
            })) {
            removeCardFromDeck(cardID);
            result = true;
        }
        return result
    }

    function isDeckDealOnLastCard(cardID) {
        var prevCardID = DECK.cardIDs[DECK.cardIDs.indexOf(cardID) + 1];
        if ((prevCardID != undefined) && isInPos({
                x: CARD_OBJECTS[cardID].cardImage.position().left,
                y: CARD_OBJECTS[cardID].cardImage.position().top
            }, {
                x: getDeckCardPosX(0),
                y: DECK.y
            }, {
                x: 0.1,
                y: 0.1
            }) && isInPos({
                x: CARD_OBJECTS[prevCardID].cardImage.position().left,
                y: CARD_OBJECTS[prevCardID].cardImage.position().top
            }, {
                x: getDeckCardPosX(0),
                y: DECK.y
            }, {
                x: 0.1,
                y: 0.1
            })) {
            CARD_OBJECTS[prevCardID].cardImage.css("z-index", 0);
        }
    }

    function resetDeck(excludingLast, moveTime) {
        for (var i = 0; i < (DECK.cardIDs.length - excludingLast); i++) {
            var cardID = DECK.cardIDs[i];
            CARD_OBJECTS[cardID].lastPosX = DECK.x;
            CARD_OBJECTS[cardID].lastPosY = DECK.y;
            CARD_OBJECTS[cardID].turnFaceDown();
            CARD_OBJECTS[cardID].cardImage.css("z-index", 0);
            moveCardToLastPos(cardID, moveTime);
        }
        for (var i = 0; i < excludingLast; i++) {
            var cardID = DECK.cardIDs[DECK.cardIDs.length - excludingLast + i];
            CARD_OBJECTS[cardID].lastPosX = getDeckCardPosX(Math.max(0, GAME_DIFFICULTY - 1 - i));
            CARD_OBJECTS[cardID].lastPosY = DECK.y;
            moveCardToLastPos(cardID, moveTime);
        }
        deckFaceUpCards = excludingLast;
    }

    function checkForAutoComplete() {
        var autoCompletable = true;
        for (var rank = 1; rank <= 13; rank++) {
            for (var suit = 1; suit <= 4; suit++) {
                var cardID = getCardID(rank, suit);
                if ($.inArray(cardID, DECK.cardIDs) == -1) {
                    if (!(CARD_OBJECTS[cardID].faceUp)) {
                        autoCompletable = false;
                        break;
                    }
                }
            }
            if (!autoCompletable) {
                break;
            }
        }
        if (autoCompletable) {
            autoComplete();
        }
    }

    function autoComplete() {
        gameFinished = true;
        clearInterval(timeScoreTimer);
        resetDeckButton.hide();
        for (var rank = 1; rank <= 13; rank++) {
            for (var suit = 1; suit <= 4; suit++) {
                var cardID = getCardID(rank, suit);
                CARD_OBJECTS[cardID].turnFaceUp();
                for (var i = 0; i < foundations.length; i++) {
                    if (tryAddToFoundation(cardID, i, autoCompleteTime)) {
                        break;
                    }
                }
            }
        }
        setTimeout(function () {
            gameOver();
        }, autoCompleteTime);
    }

    // Foundations
    foundationSrc = solitaireDirectory + "/foundation.png";

    class Foundation {
        constructor() {
            this.x = undefined;
            gameArea.append("<img class=\"card\" src=\"" + foundationSrc + "\" draggable=false>");
            this.background = $("img[src$=\"" + foundationSrc + "\"]").last();
            this.cardIDs = [];
        }

        setX(newX) {
            this.x = newX;
            this.background.css("left", this.x - (this.background.width() / 2));
            this.background.css("top", foundationY);
            for (var i = 0; i < this.cardIDs.length; i++) {
                this.setCardPos(this.cardIDs[i]);
                moveCardToLastPos(this.cardIDs[i], cardMoveTime);
            }
        }

        addCard(cardID, moveTime) {
            this.cardIDs = this.cardIDs.concat([cardID]);
            this.setCardPos(cardID);
            setFoundationCardZindex(cardID);
            moveCardToLastPos(cardID, moveTime);
        }

        setCardPos(cardID) {
            CARD_OBJECTS[cardID].lastPosX = this.x - (CARD_OBJECTS[cardID].cardImage.width() / 2);
            CARD_OBJECTS[cardID].lastPosY = foundationY;
        }

        removeCard(cardID) {
            this.cardIDs = this.cardIDs.filter(function (item) {
                return item != cardID;
            })
        }
    }

    for (var i = 0; i < numberOfFoundations; i++) {
        foundations[i] = new Foundation();
    }

    function canAddToFoundation(cardID, index) {
        var addable = false;
        var foundationEmpty = !(foundations[index].cardIDs.length > 0);
        if ((CARD_OBJECTS[cardID].rank != CARD_RANKS.Ace) && !foundationEmpty) {
            var foundationLastCardID = foundations[index].cardIDs[foundations[index].cardIDs.length - 1];
            if ((CARD_OBJECTS[foundationLastCardID].rank == (CARD_OBJECTS[cardID].rank - 1)) && (CARD_OBJECTS[foundationLastCardID].suit == CARD_OBJECTS[cardID].suit)) {
                addable = true;
            }
        } else if ((CARD_OBJECTS[cardID].rank == CARD_RANKS.Ace) && foundationEmpty) {
            addable = true;
        }
        return addable
    }

    function isFromFoundation(cardID, index) {
        var result = false;
        if (isInPos({
                x: CARD_OBJECTS[cardID].lastPosX + (CARD_OBJECTS[cardID].cardImage.width() / 2),
                y: CARD_OBJECTS[cardID].lastPosY
            }, {
                x: foundations[index].x,
                y: foundationY
            }, {
                x: 0.1,
                y: 0.1
            })) {
            result = true;
        }
        return result
    }

    function tryAddToFoundation(cardID, index, moveTime) {
        var added = false;
        var cardImage = CARD_OBJECTS[cardID].cardImage;
        if (canAddToFoundation(cardID, index)) {
            var foundationFromIndex = -1;
            if (!(isFromDeck(cardID))) {
                var removed = false;
                for (var j = 0; j < tableaux.length; j++) {
                    if (isFromTableau(cardID, j)) {
                        tableaux[j].removeCard(cardID);
                        removed = true;
                        break;
                    }
                }
                if (!removed) {
                    for (var j = 0; j < foundations.length; j++) {
                        if (isFromFoundation(cardID, j)) {
                            foundationFromIndex = j;
                            if (j != index) {
                                foundations[j].removeCard(cardID);
                            }
                            break;
                        }
                    }
                }
            }
            if (index != foundationFromIndex) {
                foundations[index].addCard(cardID, moveTime);
                if (foundationFromIndex == -1) {
                    setPointsScore(10);
                }
                added = true;
            }
        }
        return added
    }

    function setFoundationCardZindex(cardID) {
        CARD_OBJECTS[cardID].cardImage.css("z-index", CARD_OBJECTS[cardID].rank - 1);
    }

    // Tableaux
    class Tableau {
        constructor() {
            this.x = undefined;
            this.cardIDs = [];
        }

        setX(newX) {
            this.x = newX;
            this.calculateCardPadding();
        }

        calculateCardPadding(zIndex) {
            if (this.cardIDs.length > 1) {
                this.cardPadding = (gameAreaBoundaries.top + gameArea.height() - tableauTop - cardImageSize.height) / (this.cardIDs.length - 1);
            } else {
                this.cardPadding = 0;
            }
            if (this.cardPadding > tableauMaxCardPadding) {
                this.cardPadding = tableauMaxCardPadding;
            }
            for (var i = 0; i < this.cardIDs.length; i++) {
                CARD_OBJECTS[this.cardIDs[i]].lastPosX = this.x - (CARD_OBJECTS[this.cardIDs[i]].cardImage.width() / 2);
                CARD_OBJECTS[this.cardIDs[i]].lastPosY = tableauTop + (i * this.cardPadding);
                if (i == (this.cardIDs.length - 1)) {
                    if (zIndex != undefined) {
                        CARD_OBJECTS[this.cardIDs[i]].cardImage.css("z-index", zIndex);
                    } else {
                        setTableauCardZindex(this.cardIDs[i]);
                    }
                }
                moveCardToLastPos(this.cardIDs[i], cardMoveTime);
            }
        }

        addCard(cardID, zIndex) {
            this.cardIDs = this.cardIDs.concat([cardID]);
            this.calculateCardPadding(zIndex);
        }

        removeCard(cardID) {
            this.cardIDs = this.cardIDs.filter(function (item) {
                return item != cardID;
            })
            if (this.cardIDs.length > 0) {
                var lastCardID = this.cardIDs[this.cardIDs.length - 1];
                CARD_OBJECTS[lastCardID].turnFaceUp(function (currentCardID) {
                    setTableauCardZindex(currentCardID);
                    CARD_OBJECTS[currentCardID].cardImage.attr("draggable", true);
                    setPointsScore(5);
                    checkForAutoComplete();
                });
            }
            this.calculateCardPadding();
        }
    }

    for (var i = 0; i < numberOfTableax; i++) {
        tableaux[i] = new Tableau();
    }

    function canAddToTableau(cardID, index) {
        var addable = false;
        var tableauEmpty = !(tableaux[index].cardIDs.length > 0);
        if ((CARD_OBJECTS[cardID].rank != CARD_RANKS.King) && !tableauEmpty) {
            var tableauLastCardID = tableaux[index].cardIDs[tableaux[index].cardIDs.length - 1];
            if ((CARD_OBJECTS[tableauLastCardID].rank == (CARD_OBJECTS[cardID].rank + 1)) && (CARD_OBJECTS[tableauLastCardID].suitColor != CARD_OBJECTS[cardID].suitColor)) {
                addable = true;
            }
        } else if ((CARD_OBJECTS[cardID].rank == CARD_RANKS.King) && tableauEmpty) {
            addable = true;
        }
        return addable
    }

    function isFromTableau(cardID, index) {
        var result = false;
        if (isInPos({
                x: CARD_OBJECTS[cardID].lastPosX + (CARD_OBJECTS[cardID].cardImage.width() / 2),
                y: undefined
            }, {
                x: tableaux[index].x,
                y: undefined
            }, {
                x: 0.1,
                y: 0.1
            })) {
            result = true;
        }
        return result
    }

    function setTableauCardZindex(cardID) {
        CARD_OBJECTS[cardID].cardImage.css("z-index", tableaux.length + 13 - CARD_OBJECTS[cardID].rank);
    }

    // Resizing
    function calculateSizes() {
        gameAreaBoundaries = {
            left: wholeGameArea.position().left + parseInt(wholeGameArea.css("margin-left").replace("px", "")) + parseInt(gameArea.css("margin-left").replace("px", "")) + parseInt(gameArea.css("padding-left").replace("px", "")),
            top: wholeGameArea.position().top + parseInt(wholeGameArea.css("margin-top").replace("px", "")) + parseInt(scoreArea.css("height").replace("px", "")) + parseInt(gameArea.css("margin-top").replace("px", "")) + parseInt(gameArea.css("padding-top").replace("px", ""))
        };
        DECK.x = gameAreaBoundaries.left;
        DECK.y = gameAreaBoundaries.top;
        setCardImageSize(gameArea.width() / Math.max((tableaux.length + 1), (1 + GAME_DIFFICULTY + numberOfFoundations)));
        resetDeckButton.css("width", cardImageSize.width);
        resetDeckButton.css("height", cardImageSize.height);
        resetDeckButton.css("left", DECK.x);
        resetDeckButton.css("top", DECK.y);
        dropBuffer = cardImageSize.width / 2;
        resetDeck(deckFaceUpCards, 0);
        foundationY = gameAreaBoundaries.top;
        for (var i = 0; i < foundations.length; i++) {
            foundations[i].setX(gameAreaBoundaries.left + (gameArea.width() * (1 - foundationAreaWidth)) + (gameArea.width() * foundationAreaWidth / foundations.length * (i + 0.5)));
            foundations[i].background.css("width", cardImageSize.width);
            foundations[i].background.css("height", cardImageSize.height);
            for (var j = 0; j < foundations[i].cardIDs.length; j++) {
                foundations[i].setCardPos(foundations[i].cardIDs[j]);
                moveCardToLastPos(foundations[i].cardIDs[j], cardMoveTime);
            }
        }
        topMargin = cardImageSize.height / 5;
        tableauTop = gameAreaBoundaries.top + cardImageSize.height + topMargin;
        tableauMaxCardPadding = cardImageSize.height / 4;
        gameArea.css("height", cardImageSize.height + topMargin + (12 * tableauMaxCardPadding) + cardImageSize.height);
        for (var i = 0; i < tableaux.length; i++) {
            tableaux[i].setX(gameAreaBoundaries.left + (gameArea.width() / tableaux.length * (i + 0.5)));
        }
    }
    CARD_OBJECTS[getCardID(1, 1)].cardImage.on("load", function () {
        if (!gameLoaded) {
            gameLoaded = true;
            cardImageRatio = CARD_OBJECTS[getCardID(1, 1)].cardImage.height() / CARD_OBJECTS[getCardID(1, 1)].cardImage.width();
            calculateSizes();
        }
    })
    calculateSizes();

    $(window).resize(function () {
        calculateSizes();
    });

    // Action
    function dragStart(event, card) {
        if (gameStarted && !(card.is(":animated"))) {
            var thisCardID = parseInt(card.attr("data-cardID"));
            if (isCardInLastPos(thisCardID) && !(card.is(":animated")) && CARD_OBJECTS[thisCardID].cardImage.attr("draggable")) {
                CARD_OBJECTS[thisCardID].selectedXOffset = event.pageX - CARD_OBJECTS[thisCardID].lastPosX;
                CARD_OBJECTS[thisCardID].selectedYOffset = event.pageY - CARD_OBJECTS[thisCardID].lastPosY;
                movingCards = [{
                    ID: thisCardID,
                    image: card,
                    yOffset: 0,
                    selectedXOffset: CARD_OBJECTS[thisCardID].selectedXOffset,
                    selectedYOffset: CARD_OBJECTS[thisCardID].selectedYOffset
                        }];
                for (var j = 0; j < tableaux.length; j++) {
                    if (isFromTableau(thisCardID, j)) {
                        var thisCardIndex = tableaux[j].cardIDs.indexOf(thisCardID);
                        if (thisCardIndex < (tableaux[j].cardIDs.length - 1)) {
                            for (var k = (thisCardIndex + 1); k < tableaux[j].cardIDs.length; k++) {
                                var belowCardID = tableaux[j].cardIDs[k];
                                movingCards[movingCards.length] = {
                                    ID: belowCardID,
                                    image: CARD_OBJECTS[belowCardID].cardImage,
                                    yOffset: CARD_OBJECTS[belowCardID].lastPosY - CARD_OBJECTS[thisCardID].lastPosY
                                };
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    function drag(event, card) {
        var thisCardID = parseInt(card.attr("data-cardID"));
        if (gameStarted && !(card.is(":animated")) && CARD_OBJECTS[thisCardID].cardImage.attr("draggable")) {

            for (var j = 0; j < movingCards.length; j++) {
                if (event.pageX != 0 && event.pageY != 0) {
                    var posX = event.pageX - movingCards[0].selectedXOffset;
                    var posY = event.pageY - movingCards[0].selectedYOffset + movingCards[j].yOffset;

                    // Boundaries
                    if (posX < gameAreaBoundaries.left) {
                        movingCards[j].image.css("left", gameAreaBoundaries.left + "px");
                    } else if (posX > (gameAreaBoundaries.left + gameArea.width() - movingCards[j].image.width())) {
                        movingCards[j].image.css("left", gameAreaBoundaries.left + gameArea.width() - movingCards[j].image.width() + "px");
                    } else {
                        movingCards[j].image.css("left", posX + "px");
                    }
                    if (posY < gameAreaBoundaries.top) {
                        movingCards[j].image.css("top", gameAreaBoundaries.top + "px");
                    } else if (posY > (gameAreaBoundaries.top + gameArea.height() - movingCards[j].image.height())) {
                        movingCards[j].image.css("top", gameAreaBoundaries.top + gameArea.height() - movingCards[j].image.height() + "px");
                    } else {
                        movingCards[j].image.css("top", posY + "px");
                    }
                }
            }
        }
    }

    function dragEnd(event, card) {
        for (var j = 0; j < movingCards.length; j++) {
            var added = false;
            for (var k = 0; k < foundations.length; k++) {
                if (isInPos({
                        x: movingCards[j].image.position().left + (movingCards[j].image.width() / 2),
                        y: movingCards[j].image.position().top
                    }, {
                        x: foundations[k].x,
                        y: foundationY
                    }, {
                        x: dropBuffer,
                        y: dropBuffer
                    })) {
                    added = tryAddToFoundation(movingCards[j].ID, k, cardMoveTime);
                    if (added) {
                        break;
                    }
                }
            }
            if (!added) {
                for (var k = 0; k < tableaux.length; k++) {
                    if (isInPos({
                            x: movingCards[j].image.position().left + (movingCards[j].image.width() / 2),
                            y: movingCards[j].image.position().top + (movingCards[j].image.height() / 2)
                        }, {
                            x: tableaux[k].x,
                            y: tableauTop + ((gameAreaBoundaries.top + gameArea.height() - tableauTop) / 2)
                        }, {
                            x: dropBuffer,
                            y: ((gameAreaBoundaries.top + gameArea.height() - tableauTop) / 2) + dropBuffer
                        }) && canAddToTableau(movingCards[j].ID, k)) {
                        var removed = false;
                        var tableauFromIndex = -1;
                        if (!(isFromDeck(movingCards[j].ID))) {
                            for (var l = 0; l < foundations.length; l++) {
                                if (isFromFoundation(movingCards[j].ID, l)) {
                                    foundations[l].removeCard(movingCards[j].ID);
                                    setPointsScore(-15);
                                    removed = true;
                                    break;
                                }
                            }
                            if (!removed) {
                                for (var l = 0; l < tableaux.length; l++) {
                                    if (isFromTableau(movingCards[j].ID, l)) {
                                        tableauFromIndex = l;
                                        if (l != k) {
                                            tableaux[l].removeCard(movingCards[j].ID);
                                            removed = true;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (k != tableauFromIndex) {
                            tableaux[k].addCard(movingCards[j].ID);
                            if (!removed) {
                                setPointsScore(5);
                            }
                            added = true;
                            break;
                        }
                    }
                }
            }
            if (!added) {
                moveCardToLastPos(movingCards[j].ID, cardMoveTime);
            }
        }
    }

    gameArea.on("click", function (event) {
        if (gameStarted) {
            if (isInPos({
                    x: event.pageX,
                    y: event.pageY
                }, {
                    x: DECK.x + (cardImageSize.width / 2),
                    y: DECK.y + (cardImageSize.height / 2)
                }, {
                    x: cardImageSize.width / 2,
                    y: cardImageSize.height / 2
                })) {
                if (deckFaceUpCards > 0) {
                    CARD_OBJECTS[DECK.cardIDs[DECK.cardIDs.length - 1 - (deckFaceUpCards - 1)]].cardImage.attr("draggable", false);
                }
                if (deckDealTimer == undefined) {
                    var i = 0;
                    deckDealTimer = setInterval(function () {
                            if (deckFaceUpCards < DECK.cardIDs.length) {
                                var cardID = DECK.cardIDs[DECK.cardIDs.length - 1 - deckFaceUpCards];
                                CARD_OBJECTS[cardID].lastPosX = getDeckCardPosX(GAME_DIFFICULTY - 1);
                                CARD_OBJECTS[cardID].cardImage.css("z-index", GAME_DIFFICULTY + 1);
                                CARD_OBJECTS[cardID].turnFaceUp();
                                moveCardToLastPos(cardID, deckDealTime / GAME_DIFFICULTY, function (currentCardID) {
                                    isDeckDealOnLastCard(currentCardID);
                                    CARD_OBJECTS[currentCardID].cardImage.css("z-index", parseInt(CARD_OBJECTS[currentCardID].cardImage.css("z-index")) - 1);
                                });
                                for (var j = 1; j <= (GAME_DIFFICULTY - 1); j++) {
                                    var prevCardID = DECK.cardIDs[DECK.cardIDs.indexOf(cardID) + j];
                                    if (prevCardID != undefined) {
                                        if (CARD_OBJECTS[prevCardID].lastPosX == CARD_OBJECTS[DECK.cardIDs[DECK.cardIDs.indexOf(prevCardID) - 1]].lastPosX) {
                                            CARD_OBJECTS[prevCardID].lastPosX = getDeckCardPosX(GAME_DIFFICULTY - 1 - j);
                                            moveCardToLastPos(prevCardID, deckDealTime / GAME_DIFFICULTY, function (currentCardID) {
                                                var currentPrevCardID = DECK.cardIDs[DECK.cardIDs.indexOf(currentCardID) + 1];
                                                isDeckDealOnLastCard(currentCardID);
                                                CARD_OBJECTS[currentCardID].cardImage.css("z-index", parseInt(CARD_OBJECTS[currentCardID].cardImage.css("z-index")) - 1);
                                            });
                                        }
                                    }
                                }
                                deckFaceUpCards++;
                                i++;
                            } else {
                                if (i == 0) {
                                    resetDeck(0, cardMoveTime);
                                    if (GAME_DIFFICULTY == GAME_TYPES.Easy) {
                                        setPointsScore(-100);
                                    }
                                }
                                i = GAME_DIFFICULTY;
                            }
                            if (i >= GAME_DIFFICULTY) {
                                var lastCardID = deckFaceUpCards;
                                if (lastCardID == 0) {
                                    lastCardID = DECK.cardIDs.length;
                                }
                                CARD_OBJECTS[DECK.cardIDs[DECK.cardIDs.length - 1 - (lastCardID - 1)]].cardImage.attr("draggable", true);
                                clearInterval(deckDealTimer);
                                deckDealTimer = undefined;
                            }
                        },
                        deckDealTime / GAME_DIFFICULTY);
                }
            }
        } else {
            var msg = "Please ";
            if (playButton.is(":visible")) {
                msg = msg.concat("click \"Play\", then ");
            }
            msg = msg.concat("select your difficulty to start");
            alert(msg);
        }
    });
    for (var rank = 1; rank <= 13; rank++) {
        for (suit = 1; suit <= 4; suit++) {
            var cardID = getCardID(rank, suit);
            if (!touchDevice) {
                CARD_OBJECTS[cardID].cardImage.on("dragstart", function (event) {
                    dragStart(event, $(this));
                });

                CARD_OBJECTS[cardID].cardImage.on("drag", function (event) {
                    drag(event, $(this));
                });

                CARD_OBJECTS[cardID].cardImage.on("dragend", function (event) {
                    dragEnd(event, $(this));
                });
            } else {

                CARD_OBJECTS[cardID].cardImage.on("touchstart", function (event) {
                    dragStart(event, $(this));
                });

                CARD_OBJECTS[cardID].cardImage.on("touchmove", function (event) {
                    drag(event, $(this));
                });

                CARD_OBJECTS[cardID].cardImage.on("touchend", function (event) {
                    dragEnd(event, $(this));
                });
            }
        }
    }
});
