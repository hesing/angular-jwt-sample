angular.module("myApp")
	.factory("Auth", function($http, $q, APP_URL, AuthToken){

		return{
			login: function(username, password){
				return $http.post(APP_URL+"login", {username: username, password: password}).success(function(res){
					AuthToken.setToken(res.token);
					return res;
				});	
			},
			logout: function(){
				AuthToken.setToken();
			},
			getUser: function(){
				if(AuthToken.getToken()){
					return $http.get(APP_URL+"me");
				} else {
					return $q.reject({data: "client has no auth token"});
				}
			}
		};
	})
	.factory("AuthToken", function($window){
		var store = $window.localStorage;

		return{
			setToken: function(token){
				if(token){
					store.setItem("token", token);
				} else {
					store.removeItem("token");
				}
			},
			getToken: function(){
				return store.getItem("token");
			}
		};
	})
	.factory("AuthInterceptor", function(AuthToken){
		return{
			request: function(config){
				var token = AuthToken.getToken();
				if(token){
					config.headers['Authorization'] = "Bearer "+AuthToken.getToken();
				}
				
				return config;
			}
		};
	})
