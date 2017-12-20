var mainModule =  angular.module('ClaimsExpress', []);

function mainController($scope, $http){
	//get all claims after loading page
	$http.get('/api/getAllClaims')
		.success(function(data) {
			$scope.claims = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})

	//function to add claims
	$scope.createClaim = function(){
		$http.post('/api/addClaim', $scope.formData)
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
}