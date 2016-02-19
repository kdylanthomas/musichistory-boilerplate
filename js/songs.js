"use strict";
// XHR for songs-1.json
$.ajax({
	url:'songs-1.json'
}).done(sendToOutput);

function sendToOutput(songData) {
	let songs = songData.songs;
	outputSongs(songs);
}

// output to DOM for loaded & manually added songs
function outputSongs(songs) {
	$(songs).each((i, currSong) => {
		$('#right-side').append(
			`<div class="song-list">
				<h5>${currSong.title}</h5>
				<span>${currSong.artist}</span> -
				<span>${currSong.album}</span> -
				<span>${currSong.genre}</span>
				<button class="delete-single">Delete</button>
			</div>`
		);
	});
	// WAT
	// console.log("true?", $('#right-side').has('#more-songs'));
	// console.log("true?", $('#right-side').has('#more-songs').length);
	// console.log("false", !$('#right-side').has('#more-songs'));
	// console.log("true?", !$('#right-side').has('#more-songs').length);

	// if more songs button does not exist, create it and append it
	if (!$('#right-side').has('#more-songs').length) {
		$('#right-side').append(`<div id="more-button"><button id="more-songs">See More</button></div>`);
	} else {
		// if button already exists, move it to the end of the div
		$('#more-button').appendTo('#right-side');
		// disable button if songs-2.json has loaded
		$('#more-songs').attr('disabled', 'disabled');
	}
}

// add button functionality
$('#add-song').on('click', function() {
	let newSong = {
		"title": $('#song').val(),
		"artist": $('#artist').val(),
		"album": $('#album').val(),
		"genre": $('#genre :selected').text()
	};
	console.log(newSong);
	if (newSong.title && newSong.artist && newSong.album) {
		outputSongs(newSong);
		$('#song').val('');
		$('#artist').val('');
		$('#album').val('');
		$('#success-msg').html(`<p>Successfully added song</p>`);
	} else {
		alert("You missed a field! Try again.");
	}
});

$('.textbox-input').on('keyup', function() {
	$('#success-msg').html('');
})

// delete & more songs button functionality (event bubbling)
$('#right-side').on('click', function(e) {
	if ($(e.target).hasClass('delete-single')) {
		$(e.target).parent().remove();
	}
	if (e.target.id === "more-songs") {
		console.log('more songs');
		$.ajax({
			url:'songs-2.json'
		}).done(sendToOutput);
	}
});

