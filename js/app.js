var app = angular.module('jdApp', ['ngRoute', 'ui.bootstrap']);

app.controller('HomeCtrl', function($scope){
	$scope.title = 'Johannes Dahlgren';	
	$scope.lorem = 'Lorem ipsum dolor sit amet, \
		consectetur adipiscing elit. Aliquam enim felis, \
		imperdiet vitae accumsan quis, laoreet quis velit. \
		Vestibulum ac.';
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

app.controller('ProjectsCtrl', function($scope, Json){
	$scope.projectsTitle = 'Projects here';
	Json.getJson('data/projects.json').success(function(data){
		$scope.projects = data;
	});
	$scope.orderProp = 'id';
	$scope.filterTag;
	
});

app.controller('ProjectDetailCtrl', function($scope, $routeParams, Json){
	$scope.id = $routeParams.id;
	Json.getJson('data/projects.json').success(function(data){
		for (var i = 0; i < data.length; i++) {
			$scope.lookup[data[i].id] = data[i];
		}
		$scope.project = $scope.lookup[$scope.id];
	});
	$scope.lookup = {};	
	
	$scope.project = $scope.lookup[$scope.id];
	$scope.test = function(){
		if($scope.project === undefined){
			return true;
		}
		return false;
	}
	
});

app.controller('CvCtrl', function($scope, $http, Json){
	$scope.cvTitle = 'CV here';	
	Json.getJson('data/cv.json').success(function(data){
		$scope.cv = data;
	});
	$scope.orderProp = '-date';
});

app.controller('ContactCtrl', function($scope, $http, Json){
	$scope.contactTitle = 'Contact me:';
	Json.getJson('data/contact.json').success(function(data){
		$scope.socialMedia = data;
	});
	$scope.orderProp = 'id';
	
	$scope.open = function(url){
		if(url.indexOf('mailto') === 0){
			window.location.href = url;
		}else{
			window.open(url);
		}
	}
});

app.controller('HeaderCtrl', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
		//return viewLocation === $location.path();
		return viewLocation === '/'+$location.path().split('/')[1];
    };
});

app.controller('CarouselCtrl', function($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 800 + slides.length;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/400',
      text: ['such','wow','dat','much'][slides.length % 4] + ' ' +
        ['meow', 'rawr', 'doge', 'nice', 'very'][slides.length % 5]
    });
  };
  for (var i=0; i<10; i++) {
    $scope.addSlide();
  }
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
		when('/projects/:id',{
			templateUrl: 'views/details.html',
			controller: 'ProjectDetailCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);