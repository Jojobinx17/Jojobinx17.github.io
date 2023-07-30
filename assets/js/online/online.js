// JavaScript Document

function showCreateGUI() {
		
	document.getElementById("createbtn").classList.remove("main-button-selected");
	document.getElementById("createbtn").classList.add("main-button");

	document.getElementById("joinbtn").classList.add("main-button-selected");
	document.getElementById("joinbtn").classList.remove("main-button");
	document.getElementById("joinbtn").disabled = true;

	document.getElementById("create").style = '';
	document.getElementById("createid").value = '';
	
	document.getElementById("createid").addEventListener('input', function() {
		document.getElementById("warning").style = '';
	})
	
	document.getElementById("createid").select();

}

function hideCreateGUI() {
		
	document.getElementById("joinbtn").classList.remove("main-button-selected");
	document.getElementById("joinbtn").classList.add("main-button");
	
	document.getElementById("createid").value = '';
	document.getElementById("warning").style = 'display: none';

	document.getElementById("create").style = 'display: none;';
	document.getElementById("joinbtn").disabled = false;

}

function goToHostRoom() {
	var roomID = document.getElementById("createid").value;
	
	if(roomID != '') {
		window.location.href = "host.html#" + roomID;
	} else {
		window.location.href = "host.html";
	}
	
}

function showJoinGUI() {

	document.getElementById("idform").style = '';
	document.getElementById("usernameform").style = 'display: none';

	document.getElementById("join").style = '';
	
	document.getElementById("createbtn").classList.add("main-button-selected");
	document.getElementById("createbtn").classList.remove("main-button");
	document.getElementById("createbtn").disabled = true;

	document.getElementById("joinbtn").classList.remove("main-button-selected");
	document.getElementById("joinbtn").classList.add("main-button");
	
	document.getElementById("joinid").select();

}

function showJoinNameGUI() {
	document.getElementById("idform").style = 'display: none';
	document.getElementById("usernameform").style = '';
	
	console.log(getCookie('username'));
	document.getElementById("joinusername").value = getCookie('username');

	
	document.getElementById("joinusername").select();
}

function hideJoinNameGUI() {
	document.getElementById("idform").style = '';
	document.getElementById("usernameform").style = 'display: none';
	document.getElementById("joinerror").innerHTML = "";	
	document.getElementById("joinid").select();
}


function hideJoinGUI() {
	document.getElementById("join").style = 'display: none';
	
	document.getElementById("idform").style = '';
	document.getElementById("usernameform").style = 'display: none';
	document.getElementById("joinerror").innerHTML = "";
	
	document.getElementById("createbtn").classList.remove("main-button-selected");
	document.getElementById("createbtn").classList.add("main-button");
	document.getElementById("createbtn").disabled = false;
}

function goToPeerRoom() {
	var roomID = document.getElementById("joinid").value;
	roomID = roomID.substring(0, 50);
	var username = document.getElementById("joinusername").value;
	username = username.substring(0, 25);
	setCookie("username", username, 7);
	
	if(username.replaceAll(' ', '').replaceAll('	', '') != '') {
		setCookie()
		window.location.href = "client.html#" + roomID;
	} else {
		document.getElementById("joinerror").innerHTML = "invalid username!";
		document.getElementById("joinusername").select();
	}
}

