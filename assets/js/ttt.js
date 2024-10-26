
let board = Array(9).fill(0);
let move = 0;
let won = false;

function tttMove(event) {
    const cid = event.target.id.split('-')[1];
    if (board[cid] == 0 && !won) {
        board[cid] = move + 1;
        event.target.innerHTML = move === 0 ? 'x' : 'o';
        move = 1 - move;
        if (!checkWin()) {
            const symbol = move === 0 ? 'x' : 'o';
            document.getElementById('ttt-message').innerHTML = '(' + symbol + ' to play)';
        }
    }
}

function checkWin() {
    const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, b, c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            onWin(board[a] - 1);
            return true;
        }
    }
    if (board.every(cell => cell !== 0)) {
        onDraw();
        return true;
    }
    return false;
}

function onWin(move) {
    const symbol = move === 0 ? 'x' : 'o';
    document.getElementById('ttt-message').innerHTML = '(' + symbol + ' has won. <a href="#" onclick="javascript:resetBoard()">reset</a>)';
    won = true;
}

function onDraw() {
    document.getElementById('ttt-message').innerHTML = '(draw. <a href="#" onclick="javascript:resetBoard()">reset</a>)';
    won = true;
}

function resetBoard() {
    document.getElementById('ttt-message').innerHTML = "click a square to begin.";
    for (var i = 0; i < 9; i++) {
        document.getElementById("ttt-" + i).innerHTML = '';
    }
    board.fill(0);
    move = 0;
    won = false;
}

document.addEventListener('DOMContentLoaded', function() {
    for (var i = 0; i < 9; i++) {
        document.getElementById("ttt-" + i).addEventListener('click', tttMove);
    }
});