var app = angular.module('jdApp', ['ngRoute', 'ui.bootstrap']);

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
	$scope.contactTitle = 'Contact me:';
	$scope.socialMedia = {
		twitter: {
			name: 'Twitter',
			link: 'https://twitter.com/J_Dahlgren',
			logo: 'data/twitter.png'
		},
		linkedIn: {
			name: 'LinkedIn',
			link: 'http://se.linkedin.com/pub/johannes-dahlgren/64/a88/9a2',
			logo: 'data/linkedIn.png'
		},
		mail: {
			name: 'Mail',
			link: 'mailto:johannes.dahlgren@gmail.com',
			logo: 'data/mail.png'
		},		
	};
});

app.controller('HeaderCtrl', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

app.controller('CarouselCtrl', function($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 800 + slides.length;
    slides.push({
      image: 'http://lorempixel.com//' + newWidth + '/400',
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
		otherwise({
			redirectTo: '/'
		});
}]);