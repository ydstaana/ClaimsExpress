angular.module('LoginCtrl', [])

.controller('loginController',function($scope, $location,$http, Login){
	//get all claims after loading page
	userInput = {}
	$scope.text = "ADAD"
	$scope.login = function(){
		userInput.username = $scope.username
		userInput.password = $scope.password
				
		Login.verifyUser(userInput).success(function(data) {
			$location.path('/claims');
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

