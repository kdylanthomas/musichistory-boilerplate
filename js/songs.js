"use strict";
let songs;
let artistArray = [];
// XHR for songs-1.json
$.ajax({
	url:'songs-1.json'
}).done(sendToOutput);

function sendToOutput(songData) {
	songs = songData.songs;
	// build artist array for single delete functionality later
	$(songs).each((i, song) => {
		artistArray.push(song.artist);
	});
	console.log("artist array", artistArray);
	createUserSelects(songs);
	outputSongs(songs);
}

// function that dynamically adds artists, albums to dropdowns
function createUserSelects(songs) {
	$(songs).each((i, currSong) => {
		// if you can't find an option el with the artistID on it, make a new option el
		if (!$("#artist-dropdown").find("#"+currSong.artist_id).length) {
			$("#artist-dropdown").append(`<option id="${currSong.artist_id}" value="${currSong.artist}">${currSong.artist}</option>`);
		}
		if (!$("#album-dropdown").find("#"+currSong.album_id).length) {
			$("#album-dropdown").append(`<option id=${currSong.album_id} value="${currSong.album}">${currSong.album}</option>`);
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
	// console.log("length", $('#right-side #more-songs').length);
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
		artistArray.push(newSong.artist);
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

// delete & more songs button functionality (event bubbling on right side)
$('#right-side').on('click', function(e) {
	// delete single song button--seems to work, confused about line 107
	if ($(e.target).hasClass('delete-single')) {
		// need to remove artist and album from options,
		// but only if it isn't still needed for another song (in progress)
		let artist = $(e.target).parent().find('.list-artist').html();
		console.log("artist next to delete button", artist);
		let options = $('#artist-dropdown').children('option');
		console.log("options", options);
		// for each option,
		$(options).each((i, option) => {
			// remove artist from option dropdown only if one instance of artist is on song list
			// check if option matches an artist that was on delete button
			if ($(option).html() === artist) {
				// then, make sure the artist doesn't exist multiple times in the array
				let sortedArtists = $(artistArray).sort();
				console.log("wat", sortedArtists);
				for (let i = 0; i < sortedArtists.length; i++) {
					if (sortedArtists[i] === sortedArtists[i+1] && sortedArtists[i] === artist) {
						// remove one instance of the artist from the array
						sortedArtists.splice(i, 1);
						// update artistArray to reflect removed instance of artist
						artistArray = sortedArtists;
						// console.log("sorted", sortedArtists);
						// console.log("new artist array", artistArray);
						// remove song div, but return instead of removing option element
						$(e.target).parent().remove();
						return;
					} else if (sortedArtists[i] === artist) {
						// remove artist from sorted array
						sortedArtists.splice(i, 1);
						// update artistArray
						artistArray = sortedArtists;
					}
				};
				console.log("artist array", artistArray);
				$(option).remove();
			};
		});
		$(e.target).parent().remove();
	}

	// see more songs button (maybe give this its own function...)
	if (e.target.id === "more-songs") {
		console.log('more songs');
		$.ajax({
			url:'songs-2.json'
		}).done(sendToOutput);
	}
});

// filter button functionality
$('#filter').on('click', function() {
	console.log("selected artist", $('#artist-dropdown :selected').val());
	console.log("selected album", $('#album-dropdown :selected').val());
	// not sure what this is doing...looks like it checks if the genre you checked matches the artist/album (bool)
	console.log("selected checkboxes", $('input:checkbox').prop('checked'));
})