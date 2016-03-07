$('#add-song').on('click', function() {
	addSong();
	$('#song').val('');
	$('#artist').val('');
	$('#album').val('');
	$('#success-msg').html(`<p>Successfully added song</p>`);
})