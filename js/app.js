var app = angular.module('jdApp', ['ngRoute', 'ui.bootstrap']);

app.directive('project', function(){
	return{
		replace: true,
		templateUrl: 'directives/project.html'
	}
});

app.factory('Json', function($http){
	return {
		getJson: function(url){
			return $http({
				url:url,
				method: 'GET'		
			});
		}
	}
});

app.controller('HomeCtrl', function($scope, Json){
	$scope.title = 'Johannes Dahlgren';	
	Json.getJson('data/about.json').success(function(data){
		$scope.about = data;
	});
});

app.controller('ProjectsCtrl', function($scope, Json){
	$scope.projectsTitle = 'My projects:';
	Json.getJson('data/projects.json').success(function(data){
		$scope.projects = data;
	});
	$scope.orderProp = '-date';
	$scope.filterTag;
	$scope.test = function(){
		console.log($scope.projects);
	}
});

app.controller('CvCtrl', function($scope, $http, Json){
	$scope.cvTitle = 'CV here';	
	Json.getJson('data/cv.json').success(function(data){
		$scope.cv = data[0];
	});
	$scope.orderProp = '-date';
	$scope.test = function(){
		console.log($scope.cv);
	}
	
});

app.controller('HeaderCtrl', function($scope, $location){
	$scope.isActive = function (viewLocation) {
		return viewLocation === '/'+$location.path().split('/')[1];
    };
});

app.controller('CarouselCtrl', function($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [{image:'data/braelleranus.png'},
								{image:'data/paperpilot.png'},
								{image:'data/ballista.png'},
								{image:'data/facerecognition.jpg'}];
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
		when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);
