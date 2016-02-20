"use strict";
// XHR for songs-1.json
$.ajax({
	url:'songs-1.json'
}).done(sendToOutput);

function sendToOutput(songData) {
	let songs = songData.songs;
	createUserSelects(songs);
	outputSongs(songs);
}

// function that dynamically adds artists, albums to dropdowns
function createUserSelects(songs) {
	$(songs).each((i, currSong) => {
		// if you can't find an option el with the artistID on it, make a new option el
		if (!$("#artist-dropdown").find("#"+currSong.artist_id).length) {
			$("#artist-dropdown").append(`<option id=${currSong.artist_id} val=${currSong.artist_id}>${currSong.artist}</option>`);
		}
		if (!$("#album-dropdown").find("#"+currSong.album_id).length) {
			$("#album-dropdown").append(`<option id=${currSong.album_id} val=${currSong.album_id}>${currSong.album}</option>`);
		}
	});
}

// output to DOM for loaded & manually added songs
function outputSongs(songs) {
	$(songs).each((i, currSong) => {
		$('#right-side').append(
			`<div class="song-list">
				<h5>${currSong.title}</h5>
				<span class="list-artist">${currSong.artist}</span> -
				<span class="list-album">${currSong.album}</span> -
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
		"genre": $('#genre :selected').text(),
		"artist_id": $('#artist').val().substring(0,3),
		"album_id": $('#album').val().substring(0,3)
	};
	console.log(newSong);
	if (newSong.title && newSong.artist && newSong.album) {
		createUserSelects(newSong);
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
});

// delete & more songs button functionality (event bubbling)
$('#right-side').on('click', function(e) {
	if ($(e.target).hasClass('delete-single')) {
		// need to remove artist and album from options,
		// but only if it isn't still needed for another song (in progress)
		let artist = $(e.target).parent().find('.list-artist').html();
		// this if statement removes all options from dropdown...why?
		// if ($('#artist-dropdown').has('option').html(artist)) {
			console.log('artist', artist);
		// }
		$(e.target).parent().remove();

	}
	if (e.target.id === "more-songs") {
		console.log('more songs');
		$.ajax({
			url:'songs-2.json'
		}).done(sendToOutput);
	}
});

// filter button functionality
$('#filter').on('click', function() {
	console.log($('#artist-dropdown :selected').val());
	console.log($('#album-dropdown :selected').val());
	// not sure what this is doing
	console.log($('input:checkbox').prop('checked'));
})