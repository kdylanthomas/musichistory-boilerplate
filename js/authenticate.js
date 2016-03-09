'use strict';

const firebaseRef = new Firebase('https://blistering-inferno-4535.firebaseio.com/');

let newUser;
let newPassword;
let existingUser;
let existingPassword;

$('#register').on('click', function () {
	newUser = $('#username').val();
	newPassword = $('#password').val();
	createUser(newUser, newPassword);
})

$('#login').on('click', function () {
	existingUser = $('#username').val();
	existingPassword = $('#password').val();
	loginUser(existingUser, existingPassword);
})

$('#logout').on('click', function () {
	firebaseRef.unauth();
})

function createUser(user, pass) {
	firebaseRef.createUser({
	  email    : user,
	  password : pass
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);
	    loginUser(user, pass);
	  }
	});
}

function loginUser(user, pass) {
	firebaseRef.authWithPassword({
	  email    : user,
	  password : pass
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	},
  	{
 	 remember: "sessionOnly"
	});
}

// use onAuth to manage views
firebaseRef.onAuth((authData) => {
	console.log(authData);
  	if (authData) {
   		showFilterView();
   		revealNav();
  	} else {
   		showLoginView();
   		hideNav();
  	}
});

