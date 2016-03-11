app.factory("add-song", function($q, $http) {

    function addSong (songData) {
        return $q(function(resolve, reject) {
        	$http.post('https://blistering-inferno-4535.firebaseio.com/songs/.json', songData)
        		.success(function (song) {
           	 		console.log(`successfully added ${songData}`);
                	resolve(song);
                },function(error) {
                    reject(error);
                }
            );
        });
    }

    return addSong;

});