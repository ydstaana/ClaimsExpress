angular.module('ClaimsExpress', [])

.controller('mainController',function($scope, $http){
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
		console.log($scope.claim);
		$http.post('/api/addClaim', $scope.claim.name + $scope.claim.license)
			.success(function(data) {
				$scope.formData = {}; //reset
				$scope.claims = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

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