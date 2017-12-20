// const Claim = require(__dirname + '/../app/model/ClaimSchema');

// console.log(Claim);

angular.module('ClaimService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Claims', function($http) {
        return {
            get : function() {
                return $http.get('/api/getAllClaims');
            },
            create : function(claimData) {
                return $http.post('/api/addClaim', claimData);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    });