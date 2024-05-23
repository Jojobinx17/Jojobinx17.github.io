let playersConnected = 1;
const date = new Date();
let currentGame = -1;
let role = -1;

const chatMessages = [ ];
let myUsername = 'server-host';

const players = [ 'server-host', '', '', '', '', ''];
const usernames = [ 'server-host', '', '', '', '', ''];
const roles = [ 1, 1, 1, 1, 1, 1 ];

const pings = [ true, true, true, true, true, true ];

// create the peer object
var hostID = location.hash.substring(1);

if(hostID != '') {
	peer = new Peer(hostID);
} else {
	peer = new Peer();
}

peer.on('error', function(err) {
	
	setTimeout(function() {
			document.getElementById("roomid").innerHTML = "ERROR - " + err.type + ". see console for details.";
	
			document.getElementById("idtext").innerHTML = '';
			document.getElementById("players").innerHTML = '';
			document.getElementById("destroybtnerr").style = '';
			document.getElementById("main").style = 'display: none';
			document.getElementById("openclosebtn").style = 'display: none';
			document.getElementById("hidebtn").style = 'display: none';
			document.getElementById("copybtn").style = 'display: none';

			console.log(err);
			if(err.type == "invalid-id") document.getElementById("roomid").innerHTML += "<br />ID must start and end with an alphanumeric character (lower or upper case character or a digit).<br style='line-height: .5'/>In the middle of the ID spaces, dashes (-) and underscores (_) are allowed.";
		
	}, 100);
	

});

// on the peer object being created...
peer.on('open', function(id) {
	document.getElementById("idtext").innerHTML = 'room id: ';
	document.getElementById("roomid").innerHTML = id;

	document.getElementById("copybtn").style = '';
	document.getElementById("openclosebtn").style = '';
	document.getElementById("hidebtn").style = '';
	
	document.getElementById("main").style = '';

	document.getElementById("copybtn").innerHTML = 'copy id';

	roomID = id;
	updatePlayerText();
});

// on a connection being established...
peer.on('connection', function(conn) {
	
	console.log('player has joined. configuring connection object...');
	
	// open the chat window
	document.getElementById("chat").style = '';
	
	// check if a spot exists
	var playerID = -1;
	for(var i = 0; i < players.length; i++) {
		if(players[i] == "") {
			playerID = i;
			players[i] = conn.peer;
			break;
		}
	}
	
	// what happens when a player joins
	conn.on('open', function() {
		console.log('Connection established with ' + conn.peer);
		document.getElementById("waiting").innerHTML = '';
		printLog('connection established with ' + conn.peer);
		
		if(playerID != -1) {
			
			// if a spot exists
			playersConnected++;
			
			var dataToSend = [
				 { type: "establish", players: playersConnected },
			];
		
			updatePlayerText();
			sendData(0, [{type: "playercount", number: playersConnected}]);

		} else {
			
			// if no spot exists
			var dataToSend = [
				{ type: "error", message: "server-full" },
			];
		}
		
		conn.send(dataToSend);
	});
	
	// what happens when data is received
	conn.on('data', function(data) {
		
		if(data[0].type != 'ping' && data[0].type != 'serverping') console.log('Received data:', data);

		if(data[0].type == 'chat') {
			chatMessages[chatMessages.length - 1] = data[0].username + ': ' + data[0].text;
			document.getElementById('chatlog').innerHTML = "<p class=\"chat-message\">" + chatMessages[chatMessages.length - 1] + "</p>" + document.getElementById('chatlog').innerHTML;
			chatMessages.length = chatMessages.length + 1;
			
			var dataToSend = [
				{type: "chat", username: data[0].username, text: data[0].text },
			];
			sendData(0, dataToSend);
		}
		
		if(data[0].type == 'establish') {
			console.log('received data from client:', data[0].username);
			usernames[peerToPlayerID(conn.peer)] = data[0].username;
			updateUsernameVisuals();
		}
		
		if(data[0].type == 'namechange') {
			console.log('received data from client:', data[0].username);
			console.log(data[0].username, 'has changed their name to', data[0].new);
			usernames[peerToPlayerID(conn.peer)] = data[0].new;
			updateUsernameVisuals();
		}
		
		if(data[0].type == 'ping') {
			var dataToSend = [ { type: "ping" } ];
			conn.send(dataToSend);
		}
		
		if(data[0].type == 'serverping') {
			pings[peerToPlayerID(data[0].peerID)] = true;
		}
		
		if(data[0].type == 'gamereq') {
			var pid = peerToPlayerID(conn.peer);
			console.log('player', pid, 'has sent a game request with an id of', data[0].game);
			addToGameReqs(conn.peer, data[0].game);
		}
	});
	
	// what happens when the client disconnects
	conn.on('close', function() {
		if(peerToPlayerID(conn.peer) != -1) {
			
			printLog(conn.peer + ' has disconnected.');
			console.log(conn.peer + ' has disconnected.');
			
			playersConnected--;
			updatePlayerText();
			sendData(0, [{type: "playercount", number: playersConnected}]);
			
			usernames[peerToPlayerID(conn.peer)] = "";
			players[peerToPlayerID(conn.peer)] = "";
			updateUsernameVisuals();
			
		} else {
			console.log('disconnect by non-player');
		}
	});
	
	// assign that player to their global conn object
	if(playerID != -1) {
		
		console.log('sending player info...');
		
		console.log('creating connection object for id of ' + playerID);
			
		if(playerID == 1) {
			window.conn1 = conn;
		}
		
		if(playerID == 2) {
			window.conn2 = conn;
		}
		
		if(playerID == 3) {
			window.conn3 = conn;
		}
		
		if(playerID == 4) {
			window.conn4 = conn;
		}
		
		if(playerID == 5) {
			window.conn5 = conn;
		}
		
	} else {
		console.log("failed - server full. sending error message...");
	}

});


function destroyRoom() {
	
	if(window.peer1) {
		
		document.getElementById("idtext").innerHTML = 'closing room...';
		
		if(window.peer1){
			peer1.destroy();
			delete peer1;
		}
		
		if(window.peer2){
			peer2.destroy();
			delete peer2;
		}
		
		if(window.peer3){
			peer3.destroy();
			delete peer3;
		}
		
		if(window.peer4){
			peer4.destroy();
			delete peer4;
		}
		
		if(window.peer5){
			peer5.destroy();
			delete peer5;
		}
	}
		
	selected = false;

	document.getElementById("roomid").innerHTML = '';

	document.getElementById("destroybtn").style = 'display: none;';
	document.getElementById("hidebtn").style = 'display: none;';
	document.getElementById("cancelclosebtn").style = 'display: none;';

	document.getElementById("closemsg").innerHTML = '';
	document.getElementById("waiting").innerHTML = '';
	document.getElementById("log").innerHTML = '';

	document.getElementById("copybtn").style = 'display: none;';
	document.getElementById("copybtn").innerHTML = 'copy id';

	setTimeout(function() {
		window.location.href = "../online/";
	}, 100);
}

function sendChat() {
	var text = document.getElementById("chatbox").value;

	if (text != '' && text.replace(/\s+/g, '') != '') {

		chatMessages[chatMessages.length - 1] = myUsername + ': ' + text;

		document.getElementById('chatlog').innerHTML = "<p class=\"chat-message\">" + chatMessages[chatMessages.length - 1] + "</p>" + document.getElementById('chatlog').innerHTML;

		chatMessages.length = chatMessages.length + 1;

		var dataToSend = [
			{type: "chat", username: myUsername, text: text },
		];

		sendData(0, dataToSend);

		document.getElementById("sendbtn").innerHTML = "sent!";
		document.getElementById("chatbox").value = "";

		setTimeout(function() {
			document.getElementById("sendbtn").innerHTML = "send";
		}, 1000);
	}
}

function sendData(playerID, data) { 
	
	// 0 for all players, 1-5 for everyone else
	
	// for debugging:
	// console.log('sending data to player id', playerID, ':', data);
	
	if(playersConnected > 1) {
	
		var str = 'sending to peer';

		if(playerID == 1 || (playerID == 0 && typeof conn1 !== "undefined")) {
			str += ' 1,';
			conn1.send(data);
		}

		if(playerID == 2 || (playerID == 0 && typeof conn2 !== "undefined")) {
			str += ' 2,';
			conn2.send(data);
		}

		if(playerID == 3 || (playerID == 0 && typeof conn3 !== "undefined")) {
			str += ' 3,';
			conn3.send(data);
		}

		if(playerID == 4 || (playerID == 0 && typeof conn4 !== "undefined")) {
			str += ' 4,';
			conn4.send(data);
		}

		if(playerID == 5 || (playerID == 0 && typeof conn5 !== "undefined")) {
			str += ' 5,';
			conn5.send(data);
		}
		
		if(str.length != 15) {
			str = str.substring(0, str.length - 1);
			console.log(str + '... sent data:', data);			
		} else {
			console.log('no data was sent.');
		}

	}

}

function peerToPlayerID(peerID) {
	for(var i = 0; i < players.length; i++) {
		if(players[i] == peerID) return i;
	}
	return -1;
}

function peerToUsername(peerID) {
	var playerID = peerToPlayerID(peerID);
	if(playerID != -1) return usernames[playerID]; 
	return '';
}

function usernameToPlayerID(u) {
	for(var i=0; i < usernames.length; i++) {
		if(usernames[i] == u) {
			return i + 1;
		}
		return -1;
	}
}

function peerToConnObject(peerID) {
	for(var i = 0; i < players.length; i++) {
		if(players[i] == peerID) {
			if(i == 0) return 0;
			if(i == 1) return conn1;
			if(i == 2) return conn2;
			if(i == 3) return conn3;
			if(i == 4) return conn4;
			if(i == 5) return conn5;
		}
	}
	return -1;
}









// --------------------------------------- GAMES --------------------------------



function gameIDToString(gameID) {
	if(gameID == 0) return 'tic-tac-toe';
	if(gameID == 1) return 'spam game';
	return '';
}

function addToGameReqs(peerid, game) {
	if(document.getElementById('gamechooseplayers').style.display == 'none') {
		var username = peerToUsername(peerid);
		var pid = peerToPlayerID(peerid);
		currentGame = game;

		document.getElementById('gamerequestheader').innerHTML = 'Game request from ' + username +  ' (PeerID ' + pid + '):';
		document.getElementById('requestedgame').innerHTML = gameIDToString(game);
		document.getElementById('gamereqests').style.display = 'block';
	}
}

function rejectGameRequest() {
	document.getElementById('gamereqests').style.display = 'none';
}

function acceptGameRequest() {
	document.getElementById('playerstochoose').innerHTML = '';
	for(var i=0; i<players.length; i++) {
		if(players[i] != '') {
			document.getElementById('playerstochoose').innerHTML += '<label class="checkbox-label"> <input type="checkbox" value="' + players[i] + '" id="p' + i + '">' + usernames[i] + '</label><br>'
		}
	}
	document.getElementById('gamechooseplayers').style.display = '';
	document.getElementById('gamereqests').style.display = 'none';
}

function startGame() {
	
	// 0 = tic-tac-toe
	// 1 = spam game
	
	var gamers = [];
	var spectators = [];
	var g = 0;
	var s = 0;
	
	for(var i=0; i<players.length; i++) {
		var e = document.getElementById('p' + i);
		if (e) {
			if(e.checked == true) {
				gamers[g] = e.value;
				g++;
			} else {
				spectators[s] = e.value;
				s++;
			}
		}
	}
	
	// prep the roles array
	
	for(i in players) {
		for(g in gamers) {
			if(gamers[g] == players[i]) roles[i] = 0;
		}
		for(s in spectators) {
			if(spectators[s] == players[i]) roles[i] = 1;
		}
	}
	
	console.log('starting game...', currentGame);
	console.log('players:', gamers);
	console.log('spectators:', spectators);

	if(currentGame == 0) {
		if(gamers.length == 2) {	
			
			// players
			var dataToSend = [ {type: "joingame", game: 0, role: 0 } ];
			for(i in gamers) {
				if(peerToPlayerID(gamers[i]) != 0) {
					sendData(peerToPlayerID(gamers[i]), dataToSend);
				} else {
					loadGame(0, 0);
				}
			}
			
			// spectators
			dataToSend = [ {type: "joingame", game: 0, role: 1 } ];
			for(i in spectators) {
				if(peerToPlayerID(spectators[i]) != 0) {
					sendData(peerToPlayerID(spectators[i]), dataToSend);
				} else {
					loadGame(0, 1);
				}
			}
		
			document.getElementById('chooseplayerserror').innerHTML = '';
			document.getElementById('gamechooseplayers').style.display = 'none';
		} else {
			document.getElementById('chooseplayerserror').innerHTML = 'please select exactly 2 players.';
		}
	}
}


function loadGame(game, role) {
	console.log("loading game id", game, 'with role', role);
	
	var roleStr = 'player';
	if(role == 1) roleStr = 'spectator';
	
	
	if(game == 0) { // tic-tac-toe
		document.getElementById('tic-tac-toe').style.display = '';
		document.getElementById('gametitle').innerHTML = 'tic-tac-toe';
		document.getElementById('gamerole').innerHTML = 'you are a ' + roleStr + '!';
	}
}

// pings
setInterval(function() {
	for(var i = 1; i < 6; i++) {
		if(pings[i] == true && players[i] != '') {
			
			var dataToSend = [ { type: "serverping" } ];
			var tempConn = peerToConnObject(players[i]);
			tempConn.send(dataToSend);
			pings[i] = false;
			
		} else if (players[i] != ''){
			
			console.log('client ' + i + '\'s ping failed.');
			var tempConn = peerToConnObject(players[i]);
			tempConn.send([{ type: 'disconnect', reason: 'server-ping-failed' }]);
			
			if(peerToPlayerID(tempConn.peer) != -1) {

				printLog(tempConn.peer + ' has disconnected.');
				console.log(tempConn.peer + ' has disconnected.');

				playersConnected--;
				updatePlayerText();
				sendData(0, [{type: "playercount", number: playersConnected}]);

				usernames[peerToPlayerID(tempConn.peer)] = "";
				players[peerToPlayerID(tempConn.peer)] = "";
				updateUsernameVisuals();
				
				// reset for the next person to join
				pings[i] = true;

			}
		}
	}
}, 5000);

