angular.module('MainCtrl', [])

.controller('mainController',function($scope, $http, Claims){
	//get all claims after loading page
	$scope.formData = {};
	Claims.get()
		.success(function(data) {
			$scope.claims = data;
		})

	//function to add claims
	$scope.createClaim = function(){
			
				 //reset
				Claims.create($scope.claim).success(function(data) {
				$scope.claim = {};
				$scope.claims = data;
				console.log(data);

				Claims.get()
				.success(function(data) {
					$scope.claims = data;
				})
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

