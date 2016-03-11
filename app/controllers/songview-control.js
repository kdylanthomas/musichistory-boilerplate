app.controller("SongViewCtrl", [
  "$scope",
  "get-songs",
  "delete-song",

    function ($scope, getSongs, deleteSong) {
        getSongs().then(
            function (songArray) {
                convertObjectToArray(songArray);
            },
            function (error) {
                console.log("nope sorry");
            }
        );

        function convertObjectToArray (obj) {
            var newArray = [];
            for (var key in obj) {
                obj[key].id = key;
                newArray.push(obj[key]);
            }
            $scope.songs = newArray;
        }

        $scope.clickDelete = function (e) {
            var id = e.target.id;
            deleteSong(id)
                .then(function () {
                    return getSongs()
                }).then(function (songArray) {
                    convertObjectToArray(songArray);
                });
        };

        $scope.filterArtists = function (song) {
            $scope.selectedArtist = song.artist;
            $scope.selectedAlbum = "";
            console.log($scope.selectedArtist);
            return $scope.selectedArtist;
        }

        $scope.filterAlbums = function (song) {
            $scope.selectedAlbum = song.album;
            $scope.selectedArtist = "";
            return $scope.selectedAlbum;
        }
    }]
);