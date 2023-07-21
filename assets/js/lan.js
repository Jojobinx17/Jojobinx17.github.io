// JavaScript Document

function createRoom() {
	
	document.getElementById("roomid").innerHTML = 'generating...';
	var peer = new Peer();

	peer.on('open', function(id) {
		document.getElementById("idtext").innerHTML = 'room id: ';
		document.getElementById("roomid").innerHTML = id;
		document.getElementById("copybtn").style = '';
		document.getElementById("copybtn").innerHTML = 'copy';
	});

}

function copyRoomId() {
	var copyText = document.getElementById("roomid");
	navigator.clipboard.writeText(copyText.innerHTML);
	document.getElementById("copybtn").innerHTML = 'copied!';
}