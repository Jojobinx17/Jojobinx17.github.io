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
		
	document.getElementById("createbtn").classList.add("main-button-selected");
	document.getElementById("createbtn").classList.remove("main-button");
	document.getElementById("createbtn").disabled = true;

	document.getElementById("joinbtn").classList.remove("main-button-selected");
	document.getElementById("joinbtn").classList.add("main-button");

	document.getElementById("join").style = '';
	document.getElementById("joinid").value = '';


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

