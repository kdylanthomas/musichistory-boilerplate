'use strict';

app.controller("AddSongCtrl", [
    "$scope",
    "add-song",
    "get-songs",
    "authenticate",

    function ($scope, addSong, getSongs, authenticate) {

        $scope.newSong = {
            title: "",
            artist: "",
            album: ""
        };

        $scope.storeUserInputs = () => {
            if ($scope.newSong.title && $scope.newSong.artist && $scope.newSong.album) {
                let songData = JSON.stringify($scope.newSong);
                addSong(songData)
                .then(
                    () => getSongs
                )}
        }

        $scope.logout = () => {
            authenticate.logoutUser();
        }
    }]
);
