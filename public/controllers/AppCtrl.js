angular.module("AppCtrl", [])

    .controller("AppCtrller", function($scope, $location, Claims) {

        /**
         * Global Variables and Functions
         */
        $scope.allClaims = [];

        // booleans for Functions
        $scope.bIsAdding = false;
        $scope.bIsUpdating = false;

        // overall global disease object
        $scope.claim = {};

        // data initialization
        $scope.initializeData = function() {
            Claims.getAllClaims().then(function(results) {
                $scope.getAllClaims = results;
            });
        };

        $scope.save = function() {

            if($scope.bIsAdding) {
                Claims.addClaim($scope.claim).then(function(result) {
                    console.log("successfully added");
                });
            };

            // if($scope.bIsUpdating) {
            //     Claims.updateDisease($scope.disease._id, $scope.disease).then(function(result) {
            //         console.log("successfully updated");
            //     });
            // };

            $scope.resetEverything();
            $scope.initializeData();
        };

        // $scope.delete = function() {
        //     Diseases.deleteDisease($scope.disease._id).then(function(result) {
        //         console.log("deleted!");
        //         $scope.initializeData();
        //     });
        // };

        // function for resetting values
        $scope.resetEverything = function() {
            console.log("restting everything");
            $scope.bIsAdding = false;
            $scope.bIsUpdating = false;

            $scope.claim = {
                "_id"           : "",
                "name"          : "",
                "email"          : "",
                "number"   : ""
            };
        };

        /**
         * adding, update functions
         */
        $scope.toggleAdd = function() {
            // make sure to reset data

            $scope.resetEverything();

            $scope.claim = {
                "_id"           : "",
                "name"          : "",
                "email"          : "",
                "number"   : ""
            };

            $scope.bIsAdding = true;
        };

        // $scope.toggleUpdate = function(disease) {
        //     $scope.resetEverything();

        //     // copying data
        //     $scope.disease = {
        //         "_id"           : disease._id,
        //         "name"          : disease.name,
        //         "description"   : disease.description
        //     };

        //     $scope.bIsUpdating = true;
        // };

    //     $scope.toggleDelete = function(disease) {
    //         $scope.disease._id = disease._id;
    //     };

    //     // navigator
    //     $scope.pathToNavigator = function() {
    //        $location.path('/navigator');
    //     };
 
    // });


// var myApp = angular.module('myApp', []);
// myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
//     console.log("Hello World from controller")

//     $http.get('/contactlist').then(function(response){
//         console.log("i got the data requested")
//         $scope.contactlist= response.data;
//     })
//     // $scope.post('/contactlist').then(function(response){
//     //     console.log("added data")
//     //     $scope.contactlist= response.data;
//     // })
//     $scope.addContact = function () {
//         console.log($scope.contact)
//         $http.post('/contactlist', $scope.contact).then(function(response){
//             console.log(response);
//         });

//     };
// }]);

    })


// from page goes to controller to 
