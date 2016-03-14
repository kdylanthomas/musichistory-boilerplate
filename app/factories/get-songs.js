'use strict';

app.factory("get-songs", function($q, $http) {

    let getSongList = () => {
        return $q(function(resolve, reject) {
            $http.get('https://blistering-inferno-4535.firebaseio.com/songs/.json')
            .success(
                (songsObject) => {
                    for (let song in songsObject) {
                        let currentSong = songsObject[song];
                        currentSong.id = song;
                    }
                    resolve(songsObject);
                }, (error) => reject(error)
            );
        });
    }

    return getSongList;

});