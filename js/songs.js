"use strict";

let songs = [];
let artistArray = [];

let selectedArtist;
let selectedAlbum;
// XHR for songs-1.json
$.ajax({
	url:'https://blistering-inferno-4535.firebaseio.com/songs/.json',
	method: 'GET'
}).done(manageSongData);

function manageSongData(songList) {
	console.log(songList);
	for (let song in songList) {
		let currentSong = songList[song];
		currentSong.id = song;
		songs.push(currentSong);
	}
	console.log(songs);
	sendToOutput(songs);
}

function sendToOutput(songs) {
	console.log(songs);
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
			`<div class="song-list" id=${currSong.id}>
				<h5>${currSong.title}</h5>
				<span class="list-artist">${currSong.artist}</span> -
				<span class="list-album">${currSong.album}</span> -
				<span>${currSong.genre}</span>
				<button class="delete-single">Delete</button>
			</div>`
		);
	});
	// if more songs button does not exist, create it and append it
	// if (!$('#right-side').has('#more-songs').length) {
	// 	$('#right-side').append(`<div id="more-button"><button id="more-songs">See More</button></div>`);
	// } else {
	// 	// if button already exists, move it to the end of the div
	// 	$('#more-button').appendTo('#right-side');
	// 	// disable button if songs-2.json has loaded
	// 	$('#more-songs').attr('disabled', 'disabled');
	// }
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
		$.ajax({
			url: 'https://blistering-inferno-4535.firebaseio.com/songs/.json',
			data: JSON.stringify(newSong),
			method: 'POST'
		}).done(() => {
			$('#song').val('');
			$('#artist').val('');
			$('#album').val('');
			$('#success-msg').html(`<p>Successfully added song</p>`);
		});
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
		let id = $(e.target).parent().attr('id');
		let options = $('#artist-dropdown').children('option');
		$.ajax({
			url: `https://blistering-inferno-4535.firebaseio.com/songs/${id}.json`,
			method: 'DELETE'
		}).done(() => {
			console.log('song deleted');
		})
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
	// if (e.target.id === "more-songs") {
	// 	console.log('more songs');
	// 	$.ajax({
	// 		url:'songs-2.json'
	// 	}).done(function (songList) {
	// 		let songs = songList.songs;
	// 		sendToOutput(songs);
	// 	});
	// }
});

$('#artist-dropdown').on('change', function () {
	selectedArtist = $('#artist-dropdown :selected').val();
	console.log(selectedArtist);
	if (selectedArtist !== 'blank-artist') {
		$('#album-dropdown').prop('disabled', 'true');
	} else {
		$('#album-dropdown').removeAttr('disabled');
	}
});

$('#album-dropdown').on('change', function () {
	selectedAlbum = $('#album-dropdown :selected').val();
	if (selectedAlbum !== 'blank-album') {
		$('#artist-dropdown').prop('disabled', 'true');
	} else {
		$('#artist-dropdown').removeAttr('disabled');
	}
});

// filter button functionality
$('#filter').on('click', function() {
	if (selectedArtist !== 'blank-artist') {
		$('.list-artist').each((i, currArtist) => {
			console.log(selectedArtist);
			if ($(currArtist).html() !== selectedArtist) {
				$(currArtist).parent().hide();
			} else {
				$(currArtist).parent().show();
			}
		});
	} else if (selectedAlbum !== 'blank-album') {
	 	$('.list-album').each((i, currAlbum) => {
			if ($(currAlbum).html() !== selectedAlbum && selectedAlbum !== 'blank-album') {
				$(currAlbum).parent().hide();
			} else {
				$(currAlbum).parent().show();
			}
		});
	}
	// not sure what this is doing...looks like it checks if the genre you checked matches the artist/album (bool)
	console.log("selected checkboxes", $('input:checkbox').prop('checked'));
})