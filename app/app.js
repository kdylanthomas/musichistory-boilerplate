var app = angular.module("MusicHistory", ['ngRoute', 'angular.filter']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/song-view.html',
        controller: 'SongViewCtrl'
      }).
      when('/songs/new', {
      	templateUrl: 'partials/add-song.html',
      	controller: 'AddSongCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);