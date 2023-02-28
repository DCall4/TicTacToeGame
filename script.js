function initialize () {
    const startButton = document.createElement('button');
    const startDiv = document.querySelector('.reset');
    startButton.classList.add('start');
    startDiv.appendChild(startButton);
    startButton.textContent = 'Start';

    startButton.addEventListener('click', ticTacToe);
}  

function ticTacToe () {
        const startButton = document.querySelector('.start');
        startButton.remove();

     //initialize players and markers
        const playerX = 'X';
        const playerO = 'O';
        let currentPlayer = playerX;
        const container = document.querySelector('.container');
        let boardDiv = document.querySelector('.board');
        const turnDiv = document.querySelector('.turn');
        const resetDiv = document.querySelector('.reset');
        const reset = document.createElement('button');
        reset.classList.add('resetButton');
        reset.textContent = 'Reset';
        resetDiv.appendChild(reset);

    const gameBoard = () => {
        const board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

        //Set up gameboard
        turnDiv.textContent = 'Player ' + currentPlayer + "'s Turn";

        // Creates buttons for gameboard with unique data attributes
        const boardSetup = () => {
            board.forEach((cell, i) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add("cell");
                cellButton.dataset.cell = i;

                boardDiv.appendChild(cellButton);
                cellButton.addEventListener('click', (e) => {
                    if (board[i] == '') {
                        if (game.getWinner() !== null){
                            return;
                        };
                    board[i] = currentPlayer;
                    cellButton.textContent = currentPlayer;
                    console.log(board);
                    foo.switchPlayers();
                    } else {
                        return;
                    }
                })

            })
        };
        boardSetup();

        const winCombos = [
            [0, 1 , 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        // Find Winner
        let counter = 0;
        const getWinner = () => {
            let winner = null;
            winCombos.forEach(function(combo, index) {
                if (board[combo[0]] && board[combo[0]] === board[combo[1]] &&
                    board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
            });
            return winner ? winner : board.includes('') ? null : 'T';
        };
        //Reset Gameboard when Reset is clicked
        reset.addEventListener('click', (e) => {
            boardDiv.remove();
            boardDiv = document.createElement('div');
            boardDiv.classList.add('board');
            container.appendChild(boardDiv);
            boardSetup();
            board.forEach((cell, i) => {board[i] = ''})
            turnDiv.textContent = 'Player ' + currentPlayer + "'s Turn";
        })
        return {
            boardSetup,
            getWinner
        }
    };

    const PlayGame = () => {
        //Switch players when game is played
        const switchPlayers = () => {
            if (currentPlayer == playerX) {
                currentPlayer = playerO;
            } else if (currentPlayer == playerO) {
                currentPlayer = playerX
            }
            turnDiv.textContent = 'Player ' + currentPlayer + "'s Turn";
            winner = game.getWinner();
            if (winner !== null) {
                if (winner === 'T') {
                    turnDiv.textContent = 'Draw';
                } else {
                turnDiv.textContent = 'Congratulations ' + winner + ', You have Won!'
                }
            }

        };
        return {
            switchPlayers,
        };


    };

    let game = gameBoard();
    let foo = PlayGame();
    // foo.switchPlayers();
};
initialize();
