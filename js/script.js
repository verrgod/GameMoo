const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click',function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})


//Check page name
var path = window.location.pathname;
var page = path.split("/").pop();
if(page == "index.html"){
    const modal = document.getElementById('email-modal');
    const openBtn = document.querySelector('.main-btn');
    const closeBtn = document.querySelector('.close-btn');

    //Click event
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    })

    window.addEventListener('click', (e) => {
        if (e.target === modal){
            modal.style.display = 'none';
        }
    })
}

const ticTicToe = '<div class="game-container"><h1>Tic Tac Toe</h1><div class="game--container"><div data-cell-index="0" class="cell"></div><div data-cell-index="1" class="cell"></div><div data-cell-index="2" class="cell"></div><div data-cell-index="3" class="cell"></div><div data-cell-index="4" class="cell"></div><div data-cell-index="5" class="cell"></div><div data-cell-index="6" class="cell"></div><div data-cell-index="7" class="cell"></div><div data-cell-index="8" class="cell"></div></div><h2 class="game--status"></h2><button class="game--restart">Restart Game</button></div>'

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

function showGame(num){
    const main = document.getElementById('main');
    main.innerHTML = "";
    if (num == 1)
    {
        main.innerHTML += ticTicToe;
        TicTacToe();
    }
}
