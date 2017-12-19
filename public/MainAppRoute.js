angular.module("MainAppRoute", [])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        
        $routeProvider
        
            // .when('/', {
            //     templateUrl : 'view/UserCtrl.html'
            // })

            // .when('/navigator', {
            //     templateUrl : 'views/Navigator.html',
            //     controller  : 'NavigationMngtController'
            // })

            // .when('/patientsearch', {//change to patientSearch again
            //     templateUrl : 'views/PatientSearch.html',
            //     controller  : 'PatientSearchController'
            // })
        
            // .when('/patientmngt', {//change to patientManager
            //     templateUrl : 'views/PatientMngt.html',
            //     controller  : "PatientMngtController"
            // })

            .when('/claimmngt', {
                templateUrl : 'view/Claim.html',
                controller  : 'AppCtrller'
            })

            // .when('/medicinemngt', {
            //     templateUrl : 'views/MedicineMngt.html',
            //     controller  : 'MedicineMngtController'
            // })

            // .when('/accountmngt', {
            //     templateUrl : 'views/AccountMngt.html',
            //     controller  : 'AccountMngtController'
            // })

            .otherwise('/')

        $locationProvider.html5Mode(true);

    }]);