// XHR for songs-1.json
$.ajax({
	url:'songs-1.json'
}).done(sendToOutput);

function sendToOutput(songData) {
	var songs = songData.songs;
	outputSongs(songs);
}

// output to DOM for loaded & manually added songs
function outputSongs(songs) {
	$(songs).each(function(i, currSong) {
		$('#right-side').append(
			`<div class="song-list">
				<h5>${currSong.title}</h5>
				<span>${currSong.artist}</span> -
				<span>${currSong.album}</span> -
				<span>${currSong.genre}</span>
			</div>`
		);
	})
}

// button functionality
$('#add-song').on('click', function() {
	var newSong = {
		"title": $('#song').val(),
		"artist": $('#artist').val(),
		"album": $('#album').val(),
		"genre": $('#genre :selected').text()
	}
	console.log(newSong);
	if (newSong.title && newSong.artist && newSong.album) {
		outputSongs(newSong);
	} else {
		alert("You missed a field! Try again.");
	}
});
