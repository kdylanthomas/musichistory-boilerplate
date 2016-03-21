'use strict';

app.factory("search-spotify", ($q, $http) => {
    let Spotify = {};

    Spotify.searchForArtist = (searchTerms) => {
        return $q(function(resolve, reject) {
        	$http.get(`https://api.spotify.com/v1/search?${searchTerms}`)
        		.success(
                    (artistData) => resolve(artistData),
                    (error) => reject(error)
                );
        });
    }

    Spotify.grabTopFive = (id) => {
        return $q(function(resolve, reject) {
            console.log(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`);
            $http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
                .success(
                    (json) => {
                        console.log(json.tracks);
                        resolve(json.tracks)
                    },
                    (error) => reject(error)
                );
        });
    }

    return Spotify;

});