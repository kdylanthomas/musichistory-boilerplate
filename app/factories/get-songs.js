'use strict';

app.factory("get-songs", function(authenticate, $q, $http) {

    let getSongList = () => {
        return $q(function(resolve, reject) {
            let user = authenticate.getUser();
            console.log(user);
            let uid = user.uid;
            // only gets songs for a logged in user
            // a@a.com / 123
            $http.get(`https://blistering-inferno-4535.firebaseio.com/songs/.json?orderBy="uid"&equalTo="${uid}"`)
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