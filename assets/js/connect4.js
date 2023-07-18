// define local varibes

let playermove = 0; // 0:red 1:yellow
let playerwon = -1;
let draw = false;
let highlightedsquare = -1;
let test = 0;

const gameboard = [ -1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, ];

const wins = [  
	
	// horizintal
	[0 ,1 ,2 ,3 ],  [1 ,2 ,3 ,4 ],  [2 ,3 ,4 ,5 ],  [3 ,4 ,5 ,6 ],
	[7 ,8 ,9 ,10],  [8 ,9 ,10,11],  [9 ,10,11,12],  [10,11,12,13],
	[14,15,16,17],  [15,16,17,18],  [16,17,18,19],  [17,18,19,20],
	[21,22,23,24],  [22,23,24,25],  [23,24,25,26],  [24,25,26,27],
	[28,29,30,31],  [29,30,31,32],  [30,31,32,33],  [31,32,33,34],
	[35,36,37,38],  [36,37,38,39],  [37,38,39,40],  [38,39,40,41], 
	
	// vertical
	[0 ,7 ,14,21],  [7 ,14,21,28],  [14,21,28,35],
	[1 ,8 ,15,22],  [8 ,15,22,29],  [15,22,29,36],
	[2 ,9 ,16,23],  [9 ,16,23,30],  [16,23,30,37],
	[3 ,10,17,24],  [10,17,24,31],  [17,24,31,38],
	[4 ,11,18,25],  [11,18,25,32],  [18,25,32,39],
	[5 ,12,19,26],  [12,19,26,33],  [19,26,33,40],
	[6 ,13,20,27],  [13,20,27,34],  [20,27,34,41],
	
	//diagonal down
	[0 ,8 ,16,24],  [7 ,15,23,31], [14,22,30,38],
	[1 ,9 ,17,25],  [8 ,16,24,32], [15,23,31,39],
	[2 ,10,18,26],  [9 ,17,25,33], [16,24,32,40],
	[3 ,11,19,27],  [10,18,26,34], [17,25,33,41],
	
	//diagonal up
	[21,15,9 ,3 ],  [28,22,16,10], [35,29,23,17],
	[22,16,10,4 ],  [29,23,17,11], [36,30,24,18],
	[23,17,11,5 ],  [30,24,18,12], [37,31,25,19],
	[24,18,12,6 ],  [31,25,19,13], [38,32,26,20],

	];


function updateHighlight(sqareid) {
	
	if(highlightedsquare != -1) {
		document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");	
		document.getElementById("s" + highlightedsquare).classList.add("gamesquare");
	}

	var col = highlightedsquare - 7;
	while(col >= 0) {
		document.getElementById("s" + col).classList.remove("gamesquarehoverlight");
		document.getElementById("s" + col).classList.add("gamesquare");
		col -= 7;
	}

	document.getElementById("s" + sqareid).classList.remove("gamesquare");
	
	if(playerwon == -1) document.getElementById("s" + sqareid).classList.add("gamesquarehover");
	if(playerwon != -1) document.getElementById("s" + sqareid).classList.add("gamesquarehoverlight");
	highlightedsquare = sqareid;
	
	col = highlightedsquare - 7;
	while(col >= 0) {
		document.getElementById("s" + col).classList.remove("gamesquare");
		document.getElementById("s" + col).classList.add("gamesquarehoverlight");
		col -= 7;
	}
		
}

function startGame() {
	
	playermove = 0;
	playerwon = -1;
	draw = false;
	
	document.getElementById("info").innerHTML = "click a column to place your move.<br />(red to play)";
	document.getElementById("message").innerHTML = "";

	for(var i = 0; i < 42; i++) {
		
		gameboard[i] = -1;
		var square = document.getElementById("s" + i);
		square.innerHTML = "";
		
		square.addEventListener('mouseenter', function(i) {
			
			var num = Number(i.target.id.substring(1));

			for(var off = 0; off < 7; off++) {
				if((num - off) % 7 == 0) break;
			}

			var empty = getEmptyPos(off);
			
			if(highlightedsquare != -1) {
				document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");	
				document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehoverlight");
				document.getElementById("s" + highlightedsquare).classList.add("gamesquare");
			}
		
			if (empty != -1) updateHighlight(empty);
		});
		
		square.addEventListener('mouseleave', function(i) {

			var num = Number(i.target.id.substring(1));
			
			for(var off = 0; off < 7; off++) {
				if((num - off) % 7 == 0) break;
			}
			
			if((off == 0 || off == 6 || num > 34 || num < 7) && highlightedsquare != -1) {
				document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");	
				document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehoverlight");	
				document.getElementById("s" + highlightedsquare).classList.add("gamesquare");
			}

			var col = highlightedsquare - 7;
			while(col >= 0) {
				document.getElementById("s" + col).classList.remove("gamesquarehoverlight");
				document.getElementById("s" + col).classList.add("gamesquare");
				col -= 7;
			}
		});
	}	
}


function getEmptyPos(i = 42) {
	var found = false;
	while(found == false && i < 42) {
		if(document.getElementById("s" + i).innerHTML != "") {
			i -= 7;  
			found = true;
		} else if(i >= 35) {
			found = true;
		} else {
			i += 7;
		}
	}
	if(i < 0) found = false;
	
	if(found == true) {
		return i;
	} else {
		return -1;
	}
}

function checkWin() {
	for(let [a, b, c, d] of wins) {
		if(gameboard[a] != -1 && gameboard[a] == gameboard[b] && gameboard[a] == gameboard[c] && gameboard[a] == gameboard[d]) {
			playerwon = gameboard[a];
		}
	}
	
	if(playerwon == -1) {
		var foundblank = false
		for(var i = 0; i < gameboard.length; i++) {
			if(gameboard[i] == -1) foundblank = true;
		}
		if(foundblank == false) draw = true;
	}
}


function move(i = 42) {
	
	document.getElementById("message").innerHTML = "";
	
	if(playerwon != -1) {
		if (playerwon == 0) document.getElementById("message").innerHTML = "red wins! <a href='javascript:restart();'>play again</a>?";
		if (playerwon == 1) document.getElementById("message").innerHTML = "yellow wins! <a href='javascript:restart();'>play again</a>?";
	} 

	if(draw == true) {
		document.getElementById("message").innerHTML = "it's a draw! <a href='javascript:restart();'>play again</a>?";
	}
	
	var pos = getEmptyPos(i);
	
	// place the tile thingy
	if(pos != -1 && playerwon == -1 && draw == false) {
		
		if(highlightedsquare != -1) {
			document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");	
			document.getElementById("s" + highlightedsquare).classList.add("gamesquare");
		}
		
		if(pos > 6) updateHighlight(pos - 7);
		
		if(playermove == 0) {
			gameboard[pos] = 0;
			document.getElementById("s" + pos).innerHTML = "&#x1f534;";
			document.getElementById("info").innerHTML = "click a column to place your move.<br />(yellow to play)"
			playermove = 1;
		} else {
			gameboard[pos] = 1;
			document.getElementById("s" + pos).innerHTML = "&#x1f7e1;";
			document.getElementById("info").innerHTML = "click a column to place your move.<br />(red to play)"
			playermove = 0;
		}
		
		checkWin();
		
		if(playerwon != -1) {
			if (playerwon == 0) document.getElementById("message").innerHTML = "red wins! <a href='javascript:restart();'>play again</a>?";
			if (playerwon == 1) document.getElementById("message").innerHTML = "yellow wins! <a href='javascript:restart();'>play again</a>?";
			if(highlightedsquare > 6) document.getElementById("s" + highlightedsquare).classList.add("gamesquarehoverlight");
			if(highlightedsquare > 6) document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");
		} 
		
		if(draw == true) {
			document.getElementById("message").innerHTML = "it's a draw! <a href='javascript:restart();'>play again</a>?";
			if(highlightedsquare > 6) document.getElementById("s" + highlightedsquare).classList.add("gamesquarehoverlight");
			if(highlightedsquare > 6) document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");
		}
		
	} else if(playerwon == -1 && draw == false) {
		document.getElementById("message").innerHTML = "you can't move there!";
	}

}

function clearBoard() {
	startGame();
}

function restart() {
	startGame();
}



