app.factory("delete-song", function($q, $http) {

    function deleteSong (id) {
        return $q(function(resolve, reject) {
            $http.delete(`https://blistering-inferno-4535.firebaseio.com/songs/${id}.json`)
            .success(function(song) {
                console.log("song deleted");
                resolve(song);
                },function(error) {
                    reject(error);
                }
            );
        });
    }

    return deleteSong;

});