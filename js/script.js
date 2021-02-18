sessionStorage.clear(); //Clear current user session storage
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');
const APIKEY = "602cef725ad3610fb5bb616f";
const leaderboard = document.getElementById("leaderboard-container");

menu.addEventListener('click',function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

const modal = document.getElementById('email-modal');
const openBtn = document.querySelector('#login');
const closeBtn = document.querySelector('.close-btn');

//Click event
var showModal = function(){
    modal.style.display = 'block';
}
openBtn.addEventListener('click', showModal);

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if (e.target === modal){
        modal.style.display = 'none';
    }
})

//Sign up code
$("#signup-btn").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();

    //Retrieve form data
    let name = $("#name").val();
    let password = $("#password").val();
    let cfmpassword = $("#cfm-password").val();

    //Validation
    if(name == "" || password == "" || cfmpassword == ""){
        alert("Please fill in all the fields");
        return
    }
    if(password != cfmpassword){
        alert("Password does not match");
        return
    }

    //Get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
    "name": name,
    "password": password
    };

    //Create our AJAX settings. Take note of API key
    let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://gamemoo-3814.restdb.io/rest/person",
    "method": "POST", //use post to send info
    "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata),
    "beforeSend": function(){
        //disable our button
        $("#signup-btn").prop( "disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#add-contact-form").trigger("reset");
    },
    error: function() {
        alert("Name is taken, try other name");
    }
    }

    // Send  ajax request over to the DB and print response of the RESTDB storage to console
    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#login").html(response.name);
        openBtn.removeEventListener('click', showModal)
        $("#name").val("");
        $("#password").val("");
        $("#cfm-password").val("");
        $("#signup-btn").prop( "disabled", false);
        modal.style.display = 'none';

        sessionStorage.setItem("currentuser",response.name);
    });
});

//Login code
$("#login-btn").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();

    //Retrieve form data
    let name = $("#name").val();
    let password = $("#password").val();

    //Validation
    if(name == "" || password == ""){
        alert("Please fill in all the fields");
        return
    }

    //Get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
    "name": name,
    "password": password
    };

    //Create our AJAX settings. Take note of API key
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://gamemoo-3814.restdb.io/rest/person",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "beforeSend": function(){
            //disable our button
            $("#login-btn").prop( "disabled", true);
            //clear our form using the form id and triggering it's reset feature
            $("#add-contact-form").trigger("reset");
        }
        }
        
        $.ajax(settings).done(function (response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
            if(response[i].name == name && response[i].password == password){
                $("#login").html(name);
                openBtn.removeEventListener('click', showModal)
                alert("Logged in");
                $("#name").val("")
                $("#password").val("")
                $("#login-btn").prop( "disabled", false);
                modal.style.display = 'none';

                sessionStorage.setItem("currentuser",name);
                return;
            }
        }
        $("#name").val("")
        $("#password").val("")
        alert("Invalid username or password");
    });
});

// Start of TicTacToe Code
const ticTicToe = '<div id="game-container"><h1>Tic Tac Toe</h1><div class="game--container"><div data-cell-index="0" class="cell"></div><div data-cell-index="1" class="cell"></div><div data-cell-index="2" class="cell"></div><div data-cell-index="3" class="cell"></div><div data-cell-index="4" class="cell"></div><div data-cell-index="5" class="cell"></div><div data-cell-index="6" class="cell"></div><div data-cell-index="7" class="cell"></div><div data-cell-index="8" class="cell"></div></div><h2 class="game--status"></h2><button class="game--restart">Restart Game</button></div>';

function TicTacToe(){
    const statusDisplay = document.querySelector('.game--status');
    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn();

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
}
// End of TicTacToe Code

// Start of Flappy Bird Code
const flappyBird = '<div id="game-container"><h1>Flappy Bird</h1><br><br><br><br><button class="game--restart" onclick="restartGame()">Restart</button><button class="game--restart" onmousedown="accelerate(-0.2)" onmouseup="accelerate(0.05)">Fly!</button></div>';

var myGamePiece;
var myObstacles = [];
var myScore;
var gameOver = false;

function startGame() {
    myGamePiece = new component(30, 30, "#95AFBA", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

function restartGame() {
    gameOver = false;
    myGamePiece = {};
    myScore = {};
    clearInterval(myGameArea.interval)
    myGameArea.clear();
    myObstacles = [];
    myGamePiece = new component(30, 30, "#95AFBA", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas   ", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game-container").insertBefore(this.canvas, document.getElementById("game-container").childNodes[3]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            if(gameOver == false){
                updateLeaderBoard("flappybird", myGameArea.frameNo)
                gameOver = true;
            }
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "rgb(32, 109, 197)", x, 0));
        myObstacles.push(new component(10, x - height - gap, "rgb(32, 109, 197)", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
// End of Flappy Bird Code

//Start of Dino Game Code
const dinoGame = '<div id="game-container"><h1>Dino Game</h1><br><h3 id="dinoscore">Start</h3><div id="dino-game-container"><div id="dino"></div><div id="cactus"></div></div><br><h2>Tap on any keys to play</h2></div>';
function DinoGame(){

    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const dinoscore = document.getElementById("dinoscore");
    var scoreCount = 0
    var intervalId;
    
    function countScore(){
        var countScoreInterval = setInterval(function(){
            scoreCount += 1;
            dinoscore.innerHTML = "score: " + scoreCount;
        }, 100 );
    
        return countScoreInterval;
    }
    
    function jump(){
        if(dino.classList != "jump"){
            dino.classList.add("jump");
        
            setTimeout(function(){
                dino.classList.remove("jump");
            }, 300)
        }
        if(cactus.classList != "block"){
            dinoscore.innerHTML = "score: " + scoreCount;
            isAlive;
            cactus.classList.add("block");
            intervalId = countScore();
        }
    }
    
    let isAlive = setInterval(() => {
        //Get current dino Y value
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    
        //Get current cactus X value
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
        //Check if it collide
        if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){
            dinoscore.innerHTML = "Your score is : " + scoreCount;
            updateLeaderBoard("dino", scoreCount);
            cactus.classList.remove("block"); 
            clearInterval(intervalId);
            scoreCount = 0;
        }
    }, 10);
    
    document.addEventListener("keydown", function (event){
        jump();
    })
}
// End of Dino Game Code

//Start of Breakout Code
const breakout = '<div id="game-container"></div>';

function Breakout(){
    let ball;
    let paddle;
    let bricks;
    let scoreText;
    let livesText;
    let startButton;
    let rotation;
    let gameOverText;
    let wonTheGameText;
    var end = false;
    
    let score = 0;
    let lives = 3;
    
    const textStyle = { 
        font: 'bold 18px Arial', 
        fill: '#000' 
    };
    
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#fff',
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true,
                checkCollision: {
                    up: true,
                    down: false,
                    left: true,
                    right: true
                }
            }
        },
        scene: {
            preload,
            create,
            update
        }
    };
    
    var game = new Phaser.Game(config);
    
    function preload() {
        this.load.image('paddle', 'img/paddle.png');
        this.load.image('brick', 'img/neutral-face.png');
        this.load.image('destroyed', 'img/flushed-face.png');
        this.load.image('ball', 'img/clown-face.png');
    }
    
    function create() {
        paddle = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 50, 'paddle')
           .setImmovable();
    
        ball = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 100, 'ball')
            .setCollideWorldBounds(true)
            .setBounce(1);
    
        bricks = this.physics.add.staticGroup({
            key: 'brick',
            frameQuantity: 20,
            gridAlign: { width: 10, cellWidth: 60, cellHeight: 60, x: this.cameras.main.centerX - 277.5, y: 100 }
        });
    
        scoreText = this.add.text(20, 20, 'Score: 0', textStyle);
        livesText = this.add.text(this.game.config.width - 20, 20, 'Lives: '+lives, textStyle).setOrigin(1, 0);
        
        gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game over!', textStyle)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => restartGame.call(this))
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111', fill: '#e74c3c' })
            .setVisible(false);
    
        wonTheGameText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You won the game!', textStyle)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111', fill: '#fff' })
            .setVisible(false);
    
        startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start game', textStyle)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111',fill: '#FFF' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => startGame.call(this))
            .on('pointerover', () => startButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }));
    
        this.physics.add.collider(ball, bricks, brickHit, null, this);
        this.physics.add.collider(ball, paddle, paddleHit, null, this);
    }
    
    function update() {
        if (rotation) {
            ball.rotation = rotation === 'left' ?  ball.rotation - .05 : ball.rotation + .05;
        }
    
        if (ball.y > paddle.y) {
            lives--;
    
            if (lives > 0) {
                livesText.setText(`Lives: ${lives}`);
    
                ball.setPosition(this.cameras.main.centerX, this.game.config.height - 100)
                    .setVelocity(300, -150);
            } else {
                ball.destroy();
    
                gameOverText.setVisible(true);
            }
        }
    }
    
    function paddleHit(ball, paddle) {
        var diff = 0;
    
        if (ball.x < paddle.x) {
            diff = paddle.x - ball.x;
            ball.setVelocityX(-20 * diff);
            rotation = 'left';
        } else if (ball.x > paddle.x) {
            diff = ball.x - paddle.x;
            ball.setVelocityX(20 * diff);
            rotation = 'right';
        } else {
            ball.setVelocityX(2 + Math.random() * 10);
        }
    }
    
    function brickHit(ball, brick) {
        brick.setTexture('destroyed');
       
        score += 5;
        scoreText.setText(`Score: ${score}`);
    
        this.tweens.add({
            targets: brick,
            scaleX: 0,
            scaleY: 0,
            ease: 'Power1',
            duration: 500,
            delay: 250,
            angle: 180,
            onComplete: () => { 
                brick.destroy();
    
                if (bricks.countActive() === 0) {
                    ball.destroy();
                    wonTheGameText.setVisible(true);
                    if(end == false){
                        updateLeaderBoard("breakout", score);
                        end = true;
                    }
                }
            }
        });
    }
    
    function startGame() {
        startButton.destroy();
        ball.setVelocity(-300, -150);
        rotation = 'left';
    
        this.input.on('pointermove', pointer => {
            paddle.x = Phaser.Math.Clamp(pointer.x, paddle.width / 2, this.game.config.width - paddle.width / 2);
        });
    }
    
    function restartGame() {
        var element = document.getElementsByTagName("canvas"), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        end = false;
        game = new Phaser.Game(config);
        score = 0;
        lives = 4;
        rotation = "";
    }
    if(end){
        updateLeaderBoard("breakout", score);
    }
}
//End of Breakout Code

//Start of Circle Click Game Code
const circleClick = '<div id="game-container"><div id="content-box"><h1>Click the circles</h1></div><div class="HUD"><div id="score">0</div><div id="timer">30 <small>sec(s)</small></div><div id="playbox" onclick="playCircleGame(); this.style.display = ' + "'none'" + ';document.getElementById(' + "'content-box'" + ').style.display = ' + "'none'" + ';"><a href="#" class="play">Play!</a></div></div><div id="circle-click-container"><div id="circle-click"></div></div></div>';
window.Game = new CircleGame();

var clicked = false;

function CircleGame() {
    this.score = 0;
    this.timer = 30;
    this.duration = 0;
    this.initialCircleDuration = 1250; //1.5 seconds
    this.scrX = 800;
    this.scrY = 600;
}

function playCircleGame() {
    window.Game = new CircleGame();
    updateScore();
    updateTimer();
    nextCircle();
    var loop = setInterval(function() {
        if(!isGameOver()) {
            Game.timer--;
            Game.duration++;
            updateTimer();
        } else {
            clearInterval(loop);
            document.getElementById('playbox').innerHTML = "<a href=\"#\" class=\"play\">Play Again?</a>";
            document.getElementById('playbox').style.display = "block";
            updateLeaderBoard("circle", Game.score);
        }
    }, 1000);
}

function updateTimer() {
    var timerbox = document.getElementById('timer');
    timerbox.innerHTML = Game.timer + " <small>s</small>";
    if(Game.timer <= 10)
        timerbox.style.color = "#993300";
    else if(Game.timer <= 20)
        timerbox.style.color = "#ffd700";
    else
        timerbox.style.color = "#00aa00"
}

function updateScore() {
    document.getElementById('score').innerHTML = "score: " + Game.score;
}

function randBtwn(min,max) {
    return Math.floor(Math.random() * max) + min;
}

function addScore(val) {
    Game.score+=val;
    var scorebox = document.getElementById('score');
    updateScore();
}

function addTime(val) {
    Game.timer+=val;
    var timerbox = document.getElementById('timer');
    updateTimer();
    timerbox.style.background = "#00aa00";
    setTimeout(function() {timerbox.style.background="#ccc";},100);
}

function isGameOver() {
    return Game.timer <= 0;
}

function nextCircle() {
    genScoreCircle();
}

function genScoreCircle() {
    var circle = genCircle(true);
    circle.style.background = "#3F7CAC";
    var gameContainer = document.getElementById("circle-click").getBoundingClientRect();
    var score = [50,45,40,35,30,25,20,15,10,5][parseInt(circle.style.width)-1];
    circle.innerHTML = score;
    circle.setAttribute('onclick',"if(!isGameOver()) {clicked = true;addScore("+score+");document.getElementById('circle-click').removeChild(this); nextCircle();}");
    document.getElementById("circle-click").appendChild(circle);
    circle.style.top = randBtwn(0, Game.scrY - 160) + "px";
    circle.style.left = randBtwn(0, Game.scrX - 160) +"px";
}

function genCircle(duplicate) {
    var circle = document.createElement("div");
    circle.style.width = randBtwn(1,10) + 'em';
    circle.style.height = circle.style.width;
    var diameter = parseInt(circle.style.width);
    circle.style.lineHeight = diameter + "em";
    circle.setAttribute('class','circle');
        setTimeout(function() {
            if(clicked == false){
                document.getElementById("circle-click").removeChild(circle); 
                if(!isGameOver() && duplicate) 
                    nextCircle();
            }
            else{
                clicked = false;
            }
        }, Game.initialCircleDuration - ((8*Game.duration > 1000) ? 1000:(8*Game.duration)));
    return circle;
}
//End of Circle Click Game Code

//Function to display the selected game
function showGame(num){
    const main = document.getElementById('main');
    main.innerHTML = "";
    if (num == 1)
    {
        main.innerHTML += ticTicToe;
        TicTacToe();
    }
    else if(num == 2){
        main.innerHTML += circleClick;
        displayLeaderboard("circle");
    }
    else if(num == 3){
        main.innerHTML += dinoGame;
        DinoGame();
        displayLeaderboard("dino");
    }
    else if(num == 4){
        main.innerHTML += breakout;
        Breakout();
        displayLeaderboard("breakout");
    }
    else if (num == 5){
        main.innerHTML += flappyBird;
        startGame();
        displayLeaderboard("flappybird");
    }
}

//Code to compare score (Descending)
function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
}

function updateLeaderBoard(game, score){
    let username = sessionStorage.getItem('currentuser');
    if(username == null){
        return
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://gamemoo-3814.restdb.io/rest/leaderboard",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
    }
      
    $.ajax(settings).done(function (response) {
        var check = false;
        for (var i = 0; i < response.length; i++) {
            if(response[i].name == username && response[i].game == game){
                check = true;
                if(response[i].score >= score){
                    return;
                }
                var objectID = response[i]._id;
                var jsondata = {"game": game,"name": username,"score": score};                
                var settings2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://gamemoo-3814.restdb.io/rest/leaderboard/" + objectID,
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
                }

                $.ajax(settings2).done(function (response2) {
                    leaderboard.innerHTML = "";
                    displayLeaderboard(game);
                });
            }
        }
        if(check == false){
            var jsondata = {"game": game,"name": username,"score": score};             
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://gamemoo-3814.restdb.io/rest/leaderboard",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
            }

            $.ajax(settings).done(function (response) {
                leaderboard.innerHTML = "";
                displayLeaderboard(game);
            });
        }
      });
}

//Function to display leaderboard
function displayLeaderboard(game){
    const leaderboard = '<h2>Leaderboard</h2><table id="table"><thead><th style="background-color: #95AFBA;">Rank</th><th style="background-color: #b7d5e2;">Name</th><th style="background-color: #95AFBA;">Score</th></thead><tbody></tbody></table>';
    document.getElementById("leaderboard-container").innerHTML += leaderboard; 
    document.getElementsByTagName("body").innerHTML += leaderboard;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://gamemoo-3814.restdb.io/rest/leaderboard",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
  
    $.ajax(settings).done(function (response) {
        response.sort(compare);
        console.log(response);

        let content = "";
        var rank = 1;
        for (var i = 0; i < response.length; i++) {
            if(response[i].game == game){
                content = `${content}<tr><td>${rank}</td>
                <td>${response[i].name}</td>
                <td>${response[i].score}</td></tr>`;
                rank++;
            }
        }

        //Update HTML content
        $("#table tbody").html(content);
    });
}

