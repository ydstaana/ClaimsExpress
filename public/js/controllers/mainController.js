angular.module('ClaimsExpress', [])

.controller('mainController',function($scope, $http, Claims){
	//get all claims after loading page
	$scope.formData = {};
	$http.get('/api/getAllClaims')
		.success(function(data) {
			$scope.claims = data;	// claims in angular html file
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})

	//function to add claims
	$scope.createClaim = function(){
			
				 //reset
				Claims.create($scope.claim).success(function(data) {
				$scope.claim = {};
				$scope.claims = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

	// $scope.createTodo = function() {

    //         // validate the formData to make sure that something is there
    //         // if form is empty, nothing will happen
    //         // people can't just hold enter to keep adding the same to-do anymore
    //         if (!$.isEmptyObject($scope.formData)) {

    //             // call the create function from our service (returns a promise object)
    //             Todos.create($scope.formData)

    //                 // if successful creation, call our get function to get all the new todos
    //                 .success(function(data) {
    //                     $scope.formData = {}; // clear the form so our user is ready to enter another
    //                     $scope.todos = data; // assign our new list of todos
    //                 });
    //         }
    //     };

	$scope.deleteClaim = function(id){
		$http.delete('/api/removeClaim/' + id)
			.success(function(data) {
				$scope.claims = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
})

// angular.module('todoController', [])

//     .controller('mainController', function($scope, $http) {
//         $scope.formData = {};

//         // when landing on the page, get all todos and show them
//         $http.get('/api/todos')
//                 .success(function(data) {
//                         $scope.todos = data;
//                 })
//                 .error(function(data) {
//                         console.log('Error: ' + data);
//                 });

//         // when submitting the add form, send the text to the node API
//         $scope.createTodo = function() {
//                 $http.post('/api/todos', $scope.formData)
//                         .success(function(data) {
//                                 $scope.formData = {}; // clear the form so our user is ready to enter another
//                                 $scope.todos = data;
//                         })
//                         .error(function(data) {
//                                 console.log('Error: ' + data);
//                         });
//         };

//         // delete a todo after checking it
//         $scope.deleteTodo = function(id) {
//                 $http.delete('/api/todos/' + id)
//                         .success(function(data) {
//                                 $scope.todos = data;
//                         })
//                         .error(function(data) {
//                                 console.log('Error: ' + data);
//                         });
//         };

//     });