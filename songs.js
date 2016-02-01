var songs = [];
var mainContent = document.getElementById("right-side");

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
// Each student must add one song to the beginning and the end of the array.
songs[0] = "Dance Yrself Clean > by LCD Soundsystem on the album This Is Happening";
songs[songs.length] = "A Fine Way To Die > by Griz on the album Say It Loud";

console.log("songs", songs);

for (var i = 0; i < songs.length; i++) {
	var currentSong = songs[i];
	// Loop over the array and remove any words or characters that obviously don't belong
	// find and replace the > character in each item with a - character
	currentSong = currentSong.replace(/[*@(!]/g, "").replace(/by/g, "").replace(/>/g, "-").replace(/on the album/g, "-");  
	// Must add each string to the DOM in index.html in the main content area.
	mainContent.innerHTML += "<h2>" + currentSong + "</h2>";
}

// button functionality 

var addButton = document.getElementById("add-song");

addButton.addEventListener("click", function(event) {
	var songInput = document.getElementById("song").value;
	console.log(songInput);
	var artistInput = document.getElementById("artist").value;
	var albumInput = document.getElementById("album").value;
	var contentToAdd = songInput + " - " + artistInput + " - " + albumInput;
	if (songInput !== "" && artistInput !== "" && albumInput !== "") {
		mainContent.innerHTML += `<h2>${contentToAdd}</h2>`;
	}
	else {
		alert("You missed a field! Try again.");
	}
});

