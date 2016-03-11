app.controller("AddSongCtrl", [
    "$scope",
    "add-song",
    "get-songs",

    function ($scope, addSong, getSongs) {

        $scope.newSong = {
            title: "",
            artist: "",
            album: ""
        };

        $scope.storeUserInputs = function () {
            if ($scope.newSong.title && $scope.newSong.artist && $scope.newSong.album) {
                var songData = JSON.stringify($scope.newSong);
                console.log(addSong);
                console.log(getSongs);
                addSong(songData)
                    .then(function () {
                        return getSongs;
                    });
            }
        }
    }]
);
