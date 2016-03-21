'use strict';

app.controller("DetailCtrl", [
  	"$scope",
  	"store-variables",
  	"search-spotify",

  	function ($scope, storeVars, Spotify) {

  		$scope.topFive = [];

  		$scope.getSearchParam = () => {
  			let searchParam = storeVars.getVariable();
  			$scope.artist = searchParam;
  			console.log(searchParam);
  			$scope.createSearchTerms(searchParam);
  		}

        $scope.createSearchTerms = (artist) => {
            let searchTerms = `q=${artist.replace(/ /g, '+')}&type=artist`;
            console.log(searchTerms);
            $scope.findArtist(searchTerms);
        };

        $scope.findArtist = (searchTerms) => {
            Spotify.searchForArtist(searchTerms)
            .then(
                (artistData) => {
                    console.log('success');
                    console.log(artistData.artists.items[0].id);
                    return Spotify.grabTopFive(artistData.artists.items[0].id);
                },
                (error) => console.log(error)
            ).then(
                function (songs) {
                	let arr = [];
                    for (let i = 0; i < 5; i++) {
                    	arr.push(songs[i].name);
                    }
                    $scope.topFive = arr;
                    console.log($scope.topFive);
                },
                (error) => console.log(error)
            );
        }
  	}
  	]
)