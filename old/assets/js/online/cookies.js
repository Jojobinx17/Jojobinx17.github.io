// JavaScript Document

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

function getTime() { // Returns a string with the current formatted 12-hour time.
	
	var currentTime = new Date();
	var currentHour = currentTime.getHours();
	var currentMinute = currentTime.getMinutes();

	var period = (currentHour < 12) ? "AM" : "PM";
	currentHour = (currentHour % 12) || 12; // Map 0 to 12

	if (currentHour < 10) {
	  currentHour = "0" + currentHour;
	}
	
	if (currentMinute < 10) {
	  currentMinute = "0" + currentMinute;
	}
	
	return currentHour + ":" + currentMinute;
}