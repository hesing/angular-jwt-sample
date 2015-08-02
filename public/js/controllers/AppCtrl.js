angular.module("myApp")
	.controller("AppCtrl", function($rootScope, Auth, $state){
		var vm = this;

		Auth.getUser().then(function(res){
			vm.currentUser = res.data; 
		}, function(res){
			vm.error = res.data;
		});

		vm.login = function(){
			Auth.login(vm.username, vm.password).success(function(res){
				vm.currentUser = res.user; 
				$rootScope.$broadcast("loggedIn");
			});
		};

		vm.logout = function(){
			Auth.logout();
			vm.currentUser = null;
		};
	});