var canvas; //information van de dimensies
var canvasContext; // visuele informatie
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
var winScore = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
var paddleHeight = 100;
var paddlethickness = 10;


function handleMouseClick(event) {
    //m.a.w. als je de winscreen laat zien, dan krijgen de p1S en p2S weer een waarde van 0 en wordt showingWinScreen false. dus een soort reset op de game
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function () { //lees script na volledig laden van de pagina
    //invullen van waarde van variabele canvas met de id
    canvas = document.getElementById('gameCanvas');
    //html5 context geven aan canvasContext, bovenin nog geen 'waarde' gekregen, unassigned > assigned
    // aangeven van 2d render bron: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    canvasContext = canvas.getContext('2d');


    var framesPersecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
        computerMovement();
    }, 1000 / framesPersecond); // berekeningen maken in hoeveel FPS

    //dit zorgt ervoor dat je kan klikken als het spel is afgelopen
    //aangeven van dat er een eventlistener is met actie/event 'mousedown' waarbij de functie van handleMouseClick wordt aangeroepen
    canvas.addEventListener('mousedown', handleMouseClick);


    //dit spreekt redelijk voor zich, maar dit zijn de controls voor P1 & P2
    document.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField(e) {
        var keyCode = e.keyCode;
        if (keyCode == 81) {
            paddle1Y -= 60;
        } else if (keyCode == 65) {
            paddle1Y += 60;
        } else if (keyCode == 38) {
            paddle2Y = paddle2Y - 60;
        } else if (keyCode == 40) {
            paddle2Y = paddle2Y + 60;
        }
    }
};

function ballReset() {
    if (player1Score >= winScore || player2Score >= winScore) {
        showingWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
};

// stukje 'AI', leuk om te illustreren
function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y + 10;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y - 10;
    }
};

function moveEverything() {
    if (showingWinScreen == true) {
        return;
    }

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;


    if (ballX < 20) { // de 20 zorgt ervoor dat de bal niet over de paddle komt
        if (ballY > paddle1Y && // is de y-coordinaat van de bal groter dan de 0,0 van p1?
            ballY < paddle1Y + paddleHeight) { // komt de bal onder p1 (0,0) +pHoogte? DAN>>
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++; // moet voor ballReset zijn
            ballReset();

        }
    }
    if (ballX > (canvas.width - 20)) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;


            var deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();


        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
};

function drawNet() {
    for (var i = 0; i < canvas.height; i += 30) {
        colorRect(canvas.width / 2 - 1, i, 2, 15, 'white');
    }
}

function drawEverything() {
    // next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');


    //aangeven, als je de winscreen laat zien, dan maak de 'style' van de content wit
    if (showingWinScreen) {
        canvasContext.fillStyle = 'white';

        //als P1 wint, laat dan bericht zien, anders laat ander bericht zien
        if (player1Score >= winScore) {
            canvasContext.fillText("Linker speler heeft gewonnen", 350, 200);
        } else if (player2Score >= winScore) {
            canvasContext.fillText("Rechter speler heeft gewonnen", 350, 200);
        }

        // laat dit sowieso zien
        canvasContext.fillText("click to continue", 350, 500);
        return;
    }

    //aanroepen van drawNet functie
    drawNet();

    // dit is de linker 'racket' voor de spelers
    colorRect(0, paddle1Y, paddlethickness, 100, 'white');
    //rechter racket (PC/2P)
    colorRect(canvas.width - paddlethickness, paddle2Y, paddlethickness, paddleHeight, 'white');
    // dit is de bal waarmee gespeeld wordt
    colorCircle(ballX, ballY, 10, 'white');

    //scoreboard voor beide spelers
    // (variabele = score, x-as, y-as)
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, 700, 100);


    //colorRect(ballX,100,10,10,'red'); rechthoekige 'bal'
};

//Bron van: https://www.w3schools.com/tags/canvas_arc.asp
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true); //centerX,centerY,radius,start hoek in radialen, einde van de hoek in radialen, klokmee of tegen
    canvasContext.fill(); //geen stroke want anders een uitlijning
};

//Bron fillRect: https://www.w3schools.com/tags/canvas_fillrect.asp
//Bron fillStyle: https://www.w3schools.com/tags/canvas_fillstyle.asp
//functie aanmaken waarin er een extra argument gegeven kan worden namelijk 'drawColor', wat dus een kleur geeft aan de Rectangle.
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
