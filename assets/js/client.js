
// create the peer object
peer = new Peer();
let roomID = location.hash.substring(1);

let myUsername = "unnamed-user";
const chatMessages = [""];

// error handling
peer.on('error', function(err) { 
	console.log(err);
	document.getElementById("errors").innerHTML = "ERROR - " + err.type + ". see console for details.";
	document.getElementById("disconnectbtnerr").style = "";
	document.getElementById("success").style = 'display: none;';
	document.getElementById("disconnectbtn").style = "display: none;";
});

// on the creation of the peer object...
peer.on('open', function(id) {

	//show the id to the user and make a connection object
	console.log('your peer id: ' + id)
	document.getElementById("success").innerHTML = 'connecting...';
	conn = peer.connect(roomID);
	
	// on an open connection...
	conn.on('open', function() {
		
		console.log(conn);
		
		// prep to receive data
		conn.on('data', function(data) {
			console.log('Received data: ', data);
			console.log('type', data[0].type);
			
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
			}

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
	
	setCookie("username", myUsername, 7);
	document.getElementById("chatbox").select();
}

function clientDisconnect() {
	if(window.conn) conn.close();
	
	if(window.peer) {
		peer.destroy();
		delete peer;
	}
	
	window.location.href = "index.html";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
