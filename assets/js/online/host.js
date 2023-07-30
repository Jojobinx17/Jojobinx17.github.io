let playersConnected = 0;
const date = new Date();

const chatMessages = [""];
let myUsername = "server-host";

const players = ["server-host"];

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
	document.getElementById("chat").style = 'display: none';
	document.getElementById("openclosebtn").style = 'display: none';
	document.getElementById("hidebtn").style = 'display: none';
	document.getElementById("copybtn").style = 'display: none';
	
	console.log(err);
	if(err.type == "invalid-id") document.getElementById("roomid").innerHTML += "<br />ID must start and end with an alphanumeric character (lower or upper case character or a digit).<br style='line-height: .5'/>In the middle of the ID spaces, dashes (-) and underscores (_) are allowed.";
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
		console.log(conn.peer + ' has disconnected.');
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
		}, 100);
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

function printLog(text) {
	var logElement = document.getElementById("log");
	logElement.innerHTML += date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds() + " - " + text + "<br />";
}