'use strict';

app.controller("AddSongCtrl", [
    "$scope",
    "authenticate",
    "add-song",
    "get-songs",

    function ($scope, authenticate, addSong, getSongs) {

        $scope.newSong = {
            title: "",
            artist: "",
            album: "",
            uid: ""
        };

        $scope.storeUserInputs = () => {
            if ($scope.newSong.title && $scope.newSong.artist && $scope.newSong.album) {
                let user = authenticate.getUser();
                $scope.newSong.uid = user.uid;
                let songData = JSON.stringify($scope.newSong);
                addSong(songData)
                .then(
                    () => getSongs
                )}
        }

        $scope.logout = () => authenticate.logoutUser()

    }]
);
