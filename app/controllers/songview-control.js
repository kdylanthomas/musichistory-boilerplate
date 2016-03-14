'use strict';

app.controller("SongViewCtrl", [
  "$scope",
  "get-songs",
  "delete-song",
  "authenticate",

    function ($scope, getSongs, deleteSong, authenticate) {
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
            return $scope.selectedArtist;
        }

        $scope.filterAlbums = (song) => {
            $scope.selectedAlbum = song.album;
            $scope.selectedArtist = "";
            return $scope.selectedAlbum;
        }

        $scope.logout = () => authenticate.logoutUser();

        $scope.unfilter = () => {
            console.log('unfiltering');
            $scope.selectedArtist = "";
            $scope.selectedAlbum = "";
        }

    }]
);