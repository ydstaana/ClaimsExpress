angular.module('LoginService', [])
    .factory('Login', function($http) {
        return {
            verifyUser : function(loginData){
                return $http.post('/api/findUser/', loginData);
            },
            create : function(userData) {
                return $http.post('/api/addClaim', claimData);
            }
        }
    });