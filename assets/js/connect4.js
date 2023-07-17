// define local varibes

let playermove = 0; // 0:red 1:yellow
let playerwon = -1;
let draw = false;
let highlightedsquare = -1;

const gameboard = [ -1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, 
					-1, -1, -1, -1, -1, -1, -1, ];


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
	document.getElementById("s" + sqareid).classList.add("gamesquarehover");
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

function move(i = 42) {
	
	document.getElementById("message").innerHTML = "";
	
	var pos = getEmptyPos(i);
	
	// place the tile thingy
	if(pos != -1) {
		
		if(highlightedsquare != -1) {
			document.getElementById("s" + highlightedsquare).classList.remove("gamesquarehover");	
			document.getElementById("s" + highlightedsquare).classList.add("gamesquare");
		}
		
		if(pos > 6) updateHighlight(pos - 7);
		
		if(playermove == 0) {
			document.getElementById("s" + pos).innerHTML = "&#x1f534;";
			document.getElementById("info").innerHTML = "click a column to place your move.<br />(yellow to play)"
			playermove = 1;
		} else {
			document.getElementById("s" + pos).innerHTML = "&#x1f7e1;";
			document.getElementById("info").innerHTML = "click a column to place your move.<br />(red to play)"
			playermove = 0;
		}
		
	// (TODO) check for win/draw 
		
	} else {
		document.getElementById("message").innerHTML = "you can't move there! <a href='javascript:startGame();'>reset</a>?";
	}

}

