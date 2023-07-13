// global vars
let playermove = 0; // 0:x 1:o
const game = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let playerwon = -1;
let draw = false;

// start the game
function startGame() {
	
	document.getElementById("startbtn").style.display = 'none';
	document.getElementById("game").style.display = 'block';
	
	playermove = 0; // 0:x 1:y
	playerwon = -1;
	draw = false;
	
	for(var i = 0; i < 9; i++) {
		game[i] = -1;
		document.getElementById("s" + i).innerHTML = " 		   ";
	}
	
	document.getElementById("message").innerHTML = "";
	document.getElementById("info").innerHTML = "click a box to place your move. (x to play)";

}

// called when a player moves
function move(pos = -1) {
	
	document.getElementById("message").innerHTML = "";
	
	if(pos != -1) {
		if(game[pos] == -1) {
			
			if(playermove == 0 && playerwon == -1) document.getElementById("s" + pos).innerHTML = " 	x	 ";
			if(playermove == 1 && playerwon == -1) document.getElementById("s" + pos).innerHTML = " 	o	 ";

			game[pos] = playermove;

			// win
			let combos =  [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
			for(let [a, b, c] of combos) {
				if(game[a] != -1 && game[a] == game[b] && game[a] == game[c]) {
					playerwon = game[a];
				}
			}
			
			// draw
			if (playerwon == -1 && game[0] != -1 && game[1] != -1 && game[2] != -1 && game[3] != -1 && game[4] != -1 && game[5] != -1 && game[6] != -1 && game[7] != -1 && game[8] != -1) {
				draw = true;
				document.getElementById("message").innerHTML = "it's a draw! <a href='javascript:startGame();'>play again</a>?";
			}
			
			if(playermove == 0) {
				playermove = 1;
			} else { 
				playermove = 0;
			}
			
			if(playermove == 0 && playerwon == -1) document.getElementById("info").innerHTML = "click a box to place your move. (x to play)";
			if(playermove == 1 && playerwon == -1) document.getElementById("info").innerHTML = "click a box to place your move. (o to play)";
				
		} else if (playerwon == -1 && draw == false) {
			document.getElementById("message").innerHTML = "you can't move there!";
		} else if (draw == true) {
			document.getElementById("message").innerHTML = "it's a draw! <a href='javascript:startGame();'>play again</a>?";
		}
		
		if (playerwon == 0) document.getElementById("message").innerHTML = "x wins! <a href='javascript:startGame();'>play again</a>?";
		if (playerwon == 1) document.getElementById("message").innerHTML = "o wins! <a href='javascript:startGame();'>play again</a>?";
	}
}
