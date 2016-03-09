"use strict";

$('#add-music').on('click', showAddView);
$('#view-music').on('click', showFilterView);

function revealNav () {
	$('.nav-bar').removeClass('hidden');
}

function hideNav () {
	$('.nav-bar').addClass('hidden');
}

function showAddView () {
	$('#playlist-view').addClass('hidden');
	$('#login-view').addClass('hidden');
	$('#form').removeClass('hidden');
	$('#form').addClass('visible');
}

function showFilterView () {
	$('#logout').show();
	$('#form').addClass('hidden');
	$('#login-view').addClass('hidden');
	$('#playlist-view').removeClass('hidden');
	$('#playlist-view').addClass('visible');
}

function showLoginView () {
	$('#logout').hide();
	$('#form').addClass('hidden');
	$('#playlist-view').addClass('hidden');
	$('#login-view').removeClass('hidden');
	$('#login-view').addClass('visible');
	// clear user inputs
	$('#username').val('');
	$('#password').val('');
}