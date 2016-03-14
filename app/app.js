'use strict';

const app = angular.module("MusicHistory", ['ngRoute', 'angular.filter', 'firebase']);

let isAuth = (authenticate) => new Promise((resolve, reject) => {
  if(authenticate.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/songs', {
        templateUrl: 'partials/song-view.html',
        controller: 'SongViewCtrl',
        resolve: { isAuth }
      }).
      when('/songs/new', {
      	templateUrl: 'partials/add-song.html',
      	controller: 'AddSongCtrl',
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);