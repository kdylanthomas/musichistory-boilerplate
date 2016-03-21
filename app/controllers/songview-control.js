'use strict';

app.controller("SongViewCtrl", [
  "$scope",
  "get-songs",
  "delete-song",
  "authenticate",
  "search-spotify",
  "store-variables",

    function ($scope, getSongs, deleteSong, authenticate, Spotify, storeVars) {
        getSongs().then(
            (songArray) => convertObjectToArray(songArray),
            (error) => console.log("nope sorry")
        );

        let convertObjectToArray = (obj) => {
            let newArray = [];
            for (let key in obj) {
                obj[key].id = key;
                newArray.push(obj[key]);
            }
            $scope.songs = newArray;
        }

        $scope.clickDelete = (e) => {
            let id = e.target.id;
            deleteSong(id)
                .then(
                    () => getSongs(),
                    (error) => console.log('could not delete song')
                ).then(
                    (songArray) => convertObjectToArray(songArray),
                    (error) => console.log('could not get songs from Firebase')
                )
        };

        $scope.filterArtists = (song) => {
            $scope.selectedArtist = song.artist;
            $scope.selectedAlbum = "";
            $scope.selectedGenre = "";
            return $scope.selectedArtist;
        }

        $scope.filterAlbums = (song) => {
            $scope.selectedAlbum = song.album;
            $scope.selectedArtist = "";
            $scope.selectedGenre = "";
            return $scope.selectedAlbum;
        }

        $scope.selectedGenres = [];

        $scope.filterGenres = (song) => {
            $scope.selectedGenre = song.genre;
            $scope.selectedArtist = "";
            $scope.selectedAlbum = "";
            return $scope.selectedGenre;
        }

        $scope.logout = () => authenticate.logoutUser()

        $scope.unfilter = () => {
            $scope.selectedArtist = "";
            $scope.selectedAlbum = "";
            $scope.selectedGenre = "";
        }

        $scope.storeSearchParam = (variable) => {
            let searchParam = storeVars.setVariable(variable);
            console.log(searchParam);
        }
    }]
);