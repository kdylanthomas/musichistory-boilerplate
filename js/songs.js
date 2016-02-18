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
			`<div>
				<h2>${currSong.title}</h2>
				<h3>${currSong.artist}</h3>
				<h4>${currSong.album}</h4>
				<h4>${currSong.genre}</h4>
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
