var app = angular.module('jdApp', ['ngRoute']);

app.controller('HomeCtrl', function($scope){
	$scope.title = 'Johannes Dahlgren';	
	$scope.lorem = 'Lorem ipsum dolor sit amet, \
		consectetur adipiscing elit. Aliquam enim felis, \
		imperdiet vitae accumsan quis, laoreet quis velit. \
		Vestibulum ac.';
});

app.controller('ProjectsCtrl', function($scope){
	$scope.projectsTitle = 'Projects here';	
});
app.controller('CvCtrl', function($scope){
	$scope.cvTitle = 'CV here';
});
app.controller('ContactCtrl', function($scope){
	$scope.contactTitle = 'Contact here';
});

app.controller('HeaderCtrl', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});



app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/projects', {
			templateUrl: 'views/projects.html',
			controller: 'ProjectsCtrl'
		}).
		when('/cv', {
			templateUrl: 'views/cv.html',
			controller: 'CvCtrl'
		}).
		when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactCtrl'
		}).
		when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);