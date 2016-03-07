"use strict";
let songs;
let songArray = [];
let artistArray = [];

// XHR for songs-1.json
$.ajax({
	url:'songs-1.json'
}).done(sendToOutput);





// add button functionality
// activate on add-song button click

function addSong () {
	let newSong = {
		"title": $('#song').val(),
		"artist": $('#artist').val(),
		"album": $('#album').val(),
		"genre": $('#genre :selected').text(),
	};
	if (newSong.title && newSong.artist && newSong.album) {
		songArray.push(newSong);
		artistArray.push(newSong.artist);
		createUserSelects(newSong);
		outputSongs(newSong);
	} else {
		alert("You missed a field! Try again.");
	}
}


