var app = angular.module('MainRouteProvider', ['ngRoute','MainCtrl', 'ClaimService','LoginCtrl','LoginService']);

app.config(function($routeProvider) {
	$routeProvider

		//routes
		.when('/login', {
			templateUrl: '../views/login.html',
			controller : 'loginController'
		})
		.when('/claims', {
			templateUrl: '../views/table.html',
			controller : 'mainController'
		})
		
		
		
		
});