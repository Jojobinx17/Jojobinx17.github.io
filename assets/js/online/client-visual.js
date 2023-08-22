
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
	
	var oldUsername = myUsername;
	var newUsername = document.getElementById("namebox").value; 
		
	myUsername = newUsername;
	myUsername = myUsername.substring(0, 25);

	document.getElementById("currentname").innerHTML = "current name: " + myUsername;

	document.getElementById("savenamebtn").style = "display: none";
	document.getElementById("namebox").style = "display: none";

	document.getElementById("chatbox").style = "";
	document.getElementById("sendbtn").style = "";
	document.getElementById("changenamebtn").style = "";
	document.getElementById("currentname").style = "";

	setCookie("username", myUsername, 7);
	document.getElementById("chatbox").select();

	if(oldUsername != newUsername) {
		
		var dataToSend = [ { type: "namechange", username: oldUsername, new: myUsername } ];
		conn.send(dataToSend);
		console.log('sent data:', dataToSend);
	}
}

function hideHeaderbar() {
	document.getElementById("header").style.display = 'none';
}

function showHeaderbar() {
	document.getElementById("header").style.display = '';
}


