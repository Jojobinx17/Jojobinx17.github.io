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

function restart() {
	startGame();
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}



