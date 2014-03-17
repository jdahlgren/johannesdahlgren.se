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
		$scope.cv = data[0];
	});
	$scope.orderProp = '-date';
	$scope.test = function(){
		console.log($scope.cv);
	}
	
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
  var slides = $scope.slides = [{image:'data/braelleranus.png'},
								{image:'data/paperpilot.png'},
								{image:'data/ballista.png'},
								{image:'data/facerecognition.jpg'}];
  //var slides = $scope.slides = [];
  /*$scope.addSlide = function() {
    var newWidth = 800 + slides.length;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/400',
      text: ['such','wow','dat','much'][slides.length % 4] + ' ' +
        ['meow', 'rawr', 'doge', 'nice', 'very'][slides.length % 5]
    });
  };
  for (var i=0; i<10; i++) {
    $scope.addSlide();
  }*/
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