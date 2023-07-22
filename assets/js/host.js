let playersConnected = 0;
let roomID = "";
const date = new Date();

const chatMessages = [""];
let myUsername = "server-host";

// create the peer object
var hostID = location.hash.substring(1);

if(hostID != '') {
	peer = new Peer(hostID);
} else {
	peer = new Peer();
}

peer.on('error', function(err) {
	document.getElementById("roomid").innerHTML = "ERROR - " + err.type + ". see console for details.";
	
	document.getElementById("idtext").innerHTML = '';
	document.getElementById("players").innerHTML = '';
	document.getElementById("destroybtnerr").style = '';
	document.getElementById("destroybtn").style = 'display: none';
	
	console.log(err);
	if(err.type == "invalid-id") console.log("ID must start and end with an alphanumeric character (lower or upper case character or a digit). In the middle of the ID spaces, dashes (-) and underscores (_) are allowed.");
});

// on the peer object being created...
peer.on('open', function(id) {
	document.getElementById("idtext").innerHTML = 'room id: ';
	document.getElementById("roomid").innerHTML = id;

	document.getElementById("copybtn").style = '';
	document.getElementById("openclosebtn").style = '';
	document.getElementById("hidebtn").style = '';

	document.getElementById("copybtn").innerHTML = 'copy id';

	roomID = id;
	updatePlayerText();
});

// on a connection being established...
peer.on('connection', function(tempconn) {
	
	window.conn = tempconn;
	
	// open the chat window
	document.getElementById("chat").style = '';

	conn.on('data', function(data) {

		console.log('Received data:', data);

		if(data[0].type == 'chat') {
			chatMessages[chatMessages.length - 1] = data[0].username + ': ' + data[0].text;
			document.getElementById('chatlog').innerHTML = "<p class=\"chat-message\">" + chatMessages[chatMessages.length - 1] + "</p>" + document.getElementById('chatlog').innerHTML;					chatMessages.length = chatMessages.length + 1;
			document.getElementById("chattitle").innerHTML = "- chat -";

			var dataToSend = [
				{type: "chat", username: data[0].username, text: data[0].text },
			];
			conn.send(dataToSend);
			console.log('sent data:', dataToSend);
		}
	});

	conn.on('open', function() {
		console.log('Connection established with ' + conn.peer);
		document.getElementById("waiting").innerHTML = '';
		printLog('connection established with ' + conn.peer);

		var dataToSend = [
			 { type: "establish" },
		];
		conn.send(dataToSend);

		playersConnected++;
		updatePlayerText();
	});

	conn.on('close', function() {
		printLog(conn.peer + ' has disconnected.');
		playersConnected--;
		updatePlayerText();
	});

});


function destroyRoom() {
	
	if(window.peer) {
		
		document.getElementById("idtext").innerHTML = 'closing room...';
		
		peer.destroy();
		delete peer;
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
		}, 200);
	}
}

function sendChat() {
	var text = document.getElementById("chatbox").value;

	if (text != '' && text.replace(/\s+/g, '') != '') {

		chatMessages[chatMessages.length - 1] = myUsername + ': ' + text;

		document.getElementById('chatlog').innerHTML = "<p class=\"chat-message\">" + chatMessages[chatMessages.length - 1] + "</p>" + document.getElementById('chatlog').innerHTML;

		chatMessages.length = chatMessages.length + 1;
		document.getElementById("chattitle").innerHTML = "- chat -";

		var dataToSend = [
			{type: "chat", username: myUsername, text: text },
		];

		conn.send(dataToSend);
		console.log('sent data:', dataToSend);

		document.getElementById("sendbtn").innerHTML = "sent!";
		document.getElementById("chatbox").value = "";

		setTimeout(function() {
			document.getElementById("sendbtn").innerHTML = "send";
		}, 1000);
	}
}

function toggleLog() {
	var datalog = document.getElementById("log"); 
	if(datalog.style.display == 'none') {
		document.getElementById("waiting").style.display = 'block';
		datalog.style.display = 'block';
	} else {
		document.getElementById("waiting").style.display = 'none';
		datalog.style.display = 'none';
	}
}

function showChangeName() {
	document.getElementById("savenamebtn").style = "";
	document.getElementById("namebox").style = "";
	document.getElementById("namebox").select();
	
	document.getElementById("chatbox").style = "display: none";
	document.getElementById("sendbtn").style = "display: none";
	document.getElementById("changenamebtn").style = "display: none";
	document.getElementById("currentname").style = "display: none";
}

function saveChangeName() {
	
	myUsername = document.getElementById("namebox").value;
	document.getElementById("currentname").innerHTML = "current name: " + myUsername;
	
	document.getElementById("savenamebtn").style = "display: none";
	document.getElementById("namebox").style = "display: none";
	
	document.getElementById("chatbox").style = "";
	document.getElementById("sendbtn").style = "";
	document.getElementById("changenamebtn").style = "";
	document.getElementById("currentname").style = "";
	
	document.getElementById("chatbox").select();
	
}

function copyRoomId() {
	var copyText = document.getElementById("roomid");
	navigator.clipboard.writeText(copyText.innerHTML);
	document.getElementById("copybtn").innerHTML = 'copied!';
	
	setTimeout(function() {
		document.getElementById("copybtn").innerHTML = "copy id";
	}, 1000);
}

function showCloseGUI() {
	document.getElementById("copybtn").style = 'display: none;';
	document.getElementById("hidebtn").style = 'display: none;';
	document.getElementById("openclosebtn").style = 'display: none;';
	
	document.getElementById("cancelclosebtn").style = '';
	document.getElementById("destroybtn").style = '';
	
	document.getElementById("closemsg").innerHTML = 'are you sure? this will disconnect all players.';
}

function hideCloseGUI() {
	document.getElementById("copybtn").style = '';
	document.getElementById("hidebtn").style = '';
	document.getElementById("openclosebtn").style = '';
	
	document.getElementById("cancelclosebtn").style = 'display: none;';
	document.getElementById("destroybtn").style = 'display: none;';
	document.getElementById("closemsg").innerHTML = '';
	
}

function devtools() {
	if(document.getElementById("devtools").style.display == 'none') {
		document.getElementById("devtools").style = '';
	} else {
		document.getElementById("devtools").style = 'display: none';
	}
}

function updatePlayerText() {
	if(playersConnected == 1) {
		document.getElementById("players").innerHTML = " || " + playersConnected + " player connected.";
	} else {
		document.getElementById("players").innerHTML = " || " + playersConnected + " players connected.";
	}
}

function printLog(text) {
	var logElement = document.getElementById("log");
	logElement.innerHTML += date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds() + " - " + text + "<br />";
}