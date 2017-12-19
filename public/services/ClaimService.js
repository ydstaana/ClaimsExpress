angular.module("ClaimService", [])

    .factory("Claims", ["$http", function($http) {

        // console.log("Diseases Services js file");

        return {

            getAllClaims        : function() {
                return $http.get('/api/getAllClaims').then(function(results) {
                    return results.data;
                });
            }, 

            // getDisease              : function(diseaseID) {
            //     return $http.get('/api/getDisease/' + diseaseID).then(function(result) {
            //         return result.data;
            //     });
            // },

            addClaim              : function(newClaim) {
                return $http.post('/api/addClaim',  newClaim).then(function(result) {
                    return result.data;
                });
            },

            // updateDisease           : function(diseaseID, updatedDisease) {
            //     return $http.put('/api/updateDisease/' +  diseaseID, updatedDisease).then(function(result) {
            //         return result.data;
            //     });
            // },

            // deleteDisease           : function(diseaseID) {
            //     return $http.delete('/api/deleteDisease/' + diseaseID).then(function(result) {
            //         return result.data;
            //     });
            // },

        };

    }]);