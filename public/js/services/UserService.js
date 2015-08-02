angular.module("myApp")
	.constant("APP_URL", "http://localhost:3000/")
	.service("UserService", function($http, APP_URL){
		return{
			getRandomUser: function(){
				return $http.get(APP_URL+"random-user");
			}
		};
		
	});