'use strict';

app.factory("authenticate", function($q, $http) {

	let firebaseRef = new Firebase('https://blistering-inferno-4535.firebaseio.com/');

	let currentUserData = null;

	let Authenticate = {};

	Authenticate.isAuthenticated = () => {
		let authData = firebaseRef.getAuth();
		if (!authData) {
			return false;
		} else {
			currentUserData = authData;
			return true;
		}
	}

	Authenticate.getUser = () => {
		return currentUserData;
	}

	Authenticate.createUser = (user, pass) => {
		return $q((resolve, reject) => {
			return firebaseRef.createUser({
			  email    : user,
			  password : pass
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    return resolve(userData);
			  }
			});
		});
	}

	Authenticate.loginUser = (user, pass) => {
		return $q(function(resolve, reject) {
			firebaseRef.authWithPassword({
			  email    : user,
			  password : pass
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    return resolve(authData);
			  }
			},
		  	{
		 	 remember: "sessionOnly"
			});
		});
	}

	Authenticate.logoutUser = () => firebaseRef.unauth()

	Authenticate.storeUser = (authData) => {
		let stringifiedUser = JSON.stringify({ uid: authData.uid });
		console.log('adding ' + stringifiedUser + ' to database');
		return $q((resolve, reject) => {
			$http.post(`https://blistering-inferno-4535.firebaseio.com/users.json`, stringifiedUser)
			.then(
				data => resolve(data),
				error => reject(error)
			);
		});
	}

	return Authenticate;
});