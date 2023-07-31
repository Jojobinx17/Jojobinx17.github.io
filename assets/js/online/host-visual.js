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