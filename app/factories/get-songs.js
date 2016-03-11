app.factory("get-songs", function($q, $http) {

    function getSongList() {
        return $q(function(resolve, reject) {
            $http.get('https://blistering-inferno-4535.firebaseio.com/songs/.json')
            .success(
                function(songsObject) {
                    for (var song in songsObject) {
                        var currentSong = songsObject[song];
                        currentSong.id = song;
                    }
                    resolve(songsObject);
                },function(error) {
                    reject(error);
                }
            );
        });
    }

    return getSongList;

});