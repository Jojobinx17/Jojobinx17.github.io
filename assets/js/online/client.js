
// create the peer object
peer = new Peer();
let roomID = location.hash.substring(1);
pingReceived = true;

let myUsername = "unnamed-user";
const chatMessages = [""];
const usernames = [ 'server-host', '', '', '', '', ''];
let playersConnected = 0;

let failPings = false;

// error handling
peer.on('error', function(err) { 
	console.log(err);
	document.getElementById("errors").innerHTML = err.type + ". see console for details.";
	document.getElementById("disconnectbtnerr").style = "";
	document.getElementById("success").style = 'display: none;';
	document.getElementById("disconnectbtn").style = "display: none;";
	document.getElementById("chat").style = "display: none;";
});

// on the creation of the peer object...
peer.on('open', function(id) {

	//show the id to the user and make a connection object
	console.log('your peer id: ' + id);
	
	console.log('connecting to ' + roomID + "...");
	document.getElementById("success").innerHTML = 'connecting...';
	conn = peer.connect(roomID);
	
	// on an open connection...
	conn.on('open', function() {
		
		console.log("connection object:", conn);
		//console.log(conn);
		
		// prep to receive data
		conn.on('data', function(data) {
			
			if(data[0].type != 'ping' && data[0].type != 'serverping') {
				console.log('Received data: ', data);
				console.log('type', data[0].type);
			} else {
				console.log('Received data: ', data);
				console.log('type', data[0].type);			
			}
			
			if(data[0].type == 'chat') {
				console.log("chat message received.");
				chatMessages[chatMessages.length - 1] = data[0].username + ': ' + data[0].text;
				document.getElementById('chatlog').innerHTML = "<p class=\"chat-message\">" + chatMessages[chatMessages.length - 1] + "</p>" + document.getElementById('chatlog').innerHTML;
				chatMessages.length = chatMessages.length + 1;
				document.getElementById("chattitle").innerHTML = "- chat -";
			}

			if(data[0].type == 'establish') {
				document.getElementById("success").innerHTML = "connected to " + roomID + ".";
				document.getElementById("chat").style = "";
				console.log("connected to " + conn.peer + ".");
				
				document.getElementById("playersconnected").innerHTML = data[0].players + " players connected.";
				
				// tell the server my username
				var dataToSend = [
					{ type: "establish", username: myUsername },
				];
				conn.send(dataToSend);
			}
			
			if(data[0].type == 'error') {
				window.location.href = "error.html#" + data[0].message; 
			}
			
			if(data[0].type == 'playercount') {
				document.getElementById("playersconnected").innerHTML = data[0].number + " players connected.";
			}
			
			if(data[0].type == 'ping') {
				pingReceived = true;
			}
			
			if(data[0].type == 'serverping') {
				if(failPings == false) conn.send([{ type: "serverping", peerID: peer.id}] );
			}
			
			if(data[0].type == 'disconnect') {
				if(data[0].reason == 'server-ping-failed') window.location.href = "error.html#disconnect-server-ping"; 
			}
		});
		
		conn.on('error', function(err) { 
			console.log(err);
		});

	});
});

function sendChat() {
	var text = document.getElementById("chatbox").value;
	
	if (text != '' && text.replace(/\s+/g, '') != '') {
		
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


function clientDisconnect() {
	if(window.conn) conn.close();
	
	if(window.peer) {
		peer.destroy();
		delete peer;
	}
	
	window.location.href = "index.html";
}

setInterval(function() {
	if(pingReceived == true) {	
		var dataToSend = [ { type: "ping" } ];
		conn.send(dataToSend);
		pingReceived = false;
	} else {
		window.location.href = "error.html#connection"; 
	}
}, 5000);


