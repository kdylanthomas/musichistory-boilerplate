// page visibility

var addMusic = document.getElementById("add-music");
var playlistView = document.getElementById("playlist-view");
var form = document.getElementById("form");

addMusic.addEventListener("click", function(event) {
	event.preventDefault();
	playlistView.classList.add("hidden");
	form.classList.remove("hidden");
	form.classList.add("visible");
});
