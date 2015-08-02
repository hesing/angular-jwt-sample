angular.module("myApp")
	.config(function($stateProvider, $urlRouterProvider, $httpProvider){
		$urlRouterProvider.otherwise("/");

		$stateProvider.state("home", {
			url: "/",
			templateUrl: "views/home.html",
			controller: "HomeCtrl as home"
		})
		.state("about", {
			url: "/about",
			templateUrl: "views/about.html"
		});

		$httpProvider.interceptors.push("AuthInterceptor");
	})
	.controller("HomeCtrl", function($scope, UserService){
		var vm = this;

		vm.getRandomUser = function(){
			UserService.getRandomUser().success(function(res){
				vm.user = res;
			});
		};

		$scope.$on("loggedIn", function(event){
			vm.getRandomUser();
		});

		// $scope.$watch("app.currentUser", function(newUser){
		// 	vm.getRandomUser();
		// });

		// vm.getRandomUser();

	});