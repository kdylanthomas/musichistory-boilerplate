'use strict';

app.factory("add-song", ($q, $http) => {

    let addSong = (songData) => {
        return $q(function(resolve, reject) {
        	$http.post('https://blistering-inferno-4535.firebaseio.com/songs/.json', songData)
        		.success(
                    (song) => resolve(song),
                    (error) => reject(error)
                );
        });
    }

    return addSong;

});