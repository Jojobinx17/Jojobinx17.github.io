// JavaScript Document

function createRoom() { // SERVER SIDE
	
	if(!window.peer) {
		
		// create the peer object
		peer = new Peer();
		selected = true;
		
		// on the peer object being created...
		peer.on('open', function(id) {
			document.getElementById("idtext").innerHTML = 'room id: ';
			document.getElementById("roomid").innerHTML = id;

			document.getElementById("copybtn").style = '';
			document.getElementById("destroybtn").style = '';
			document.getElementById("copybtn").innerHTML = 'copy';
			
			document.getElementById("connectedplayers").style = '';
		});
		
		// on a connection being established...
		peer.on('connection', function(conn) { 
			
			conn.on('data', function(data) {
			  console.log('Received data: ', data);
			});
			
			conn.on('open', function() {
				console.log('Connection established with ' + conn.peer);
				document.getElementById("waiting").innerHTML = '';
				document.getElementById("log").innerHTML += 'Connection established with ' + conn.peer + '.<br />';
				conn.send(true);
			});
			
			conn.on('close', function() {
				document.getElementById("log").innerHTML += 'Peer ' + conn.peer + ' has disconnected.<br />';
			});
			
		});

	}
}

function connectToPeer() { // CLIENT SIDE
	
	// create the peer object
	peer = new Peer();
	
	// error handling
	peer.on('error', function(err) { 
		console.log(err);
		document.getElementById("errors").innerHTML = "ERROR - " + err.type + ". see console for details.";
	});
	
	// on the creation of the peer object...
	peer.on('open', function(id) {
		
		//show the id to the user and make a connection object
		document.getElementById("peerid").innerHTML = 'your peer id: ' + id;
		document.getElementById("disconnectbtn").style = '';
		var roomID = location.hash.substring(1);
		var conn = peer.connect(roomID);
		
		// on an open connection...
		conn.on('open', function() {
			
			// prep to receive data
			conn.on('data', function(data) {
				console.log('Received data: ', data);

				if(data == true) {
					document.getElementById("success").innerHTML = "connection success!<br />connected to " + conn.peer + ".";
				}

			});

			// send a test message
			conn.send('Hello, world!');
  		});
	});
}


// VISUAL / UTILITY FUNCTIONS

function destroyRoom() {
	
	if(selected == true && window.peer) {
		
		document.getElementById("idtext").innerHTML = 'destroying room...';
		
		peer.destroy();
		delete peer;
		selected = false;

		document.getElementById("roomid").innerHTML = '';
		
		document.getElementById("copybtn").style = 'display: none;';
		document.getElementById("destroybtn").style = 'display: none;';
		document.getElementById("copybtn").innerHTML = 'copy';
		
		document.getElementById("connectedplayers").style = 'display: none';
		
		setTimeout(function() {
			window.location.href = "../online/";
		}, 200);
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

function showJoinGUI() {
		
	document.getElementById("createbtn").classList.add("main-button-selected");
	document.getElementById("createbtn").classList.remove("main-button");
	document.getElementById("createbtn").disabled = true;

	document.getElementById("joinbtn").classList.remove("main-button-selected");
	document.getElementById("joinbtn").classList.add("main-button");

	document.getElementById("join").style = '';

}

function hideJoinGUI() {
		
	document.getElementById("createbtn").classList.remove("main-button-selected");
	document.getElementById("createbtn").classList.add("main-button");

	document.getElementById("join").style = 'display: none;';
	document.getElementById("createbtn").disabled = false;

}

function goToPeerRoom() {
	var roomID = document.getElementById("joinid").value;
	window.location.href = "client.html#" + roomID;
}

function copyRoomId() {
	var copyText = document.getElementById("roomid");
	navigator.clipboard.writeText(copyText.innerHTML);
	document.getElementById("copybtn").innerHTML = 'copied!';
}