var viewMusic = document.getElementById("view-music");
var playlistView = document.getElementById("playlist-view");
var form = document.getElementById("form");

viewMusic.addEventListener("click", function(event) {
	event.preventDefault();
	form.classList.add("hidden");
	playlistView.classList.remove("hidden");
	playlistView.classList.add("visible");
});