'use strict';

app.factory("delete-song", ($q, $http) => {

    let deleteSong = (id) => {
        return $q(function(resolve, reject) {
            $http.delete(`https://blistering-inferno-4535.firebaseio.com/songs/${id}.json`)
            .success(
                (song) => resolve(song),
                (error) => reject(error)
            );
        });
    }

    return deleteSong;

});