"use strict";

// page visibility

// function switchView () {
	$('#add-music').on('click', function () {
		$('#playlist-view').addClass('hidden');
		$('#form').removeClass('hidden');
		$('#form').addClass('visible');
	});

	$('#view-music').on('click', function() {
		$('#form').addClass('hidden');
		$('#playlist-view').removeClass('hidden');
		$('#playlist-view').addClass('visible');
	});
// }

// module.exports = switchView;