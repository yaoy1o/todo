
 

require(['angular','domReady!','PhoneListCtrl','SelectedTestController','angular-route'],function(angular,doc){
		var app=angular.module("myapp",['ngRoute']);
		app.controller('PhoneListCtrl',PhoneListCtrl);
		app.controller('SelectedTestController',SelectedTestController);


		app. 
  
		config(['$routeProvider', function($routeProvider) { 
		  
		$routeProvider
		.when('/test1', { 
		  
		controller: 'PhoneListCtrl', 
		   
		templateUrl: '/angularTestPart1.html' 
		  
		}) 

		.when('/test2', { 
  
		controller: 'SelectedTestController', 
		  
		templateUrl: '/angularTestPart2.html' 
		  
		}) 
		  
		.otherwise({redirectTo: '/test1'}); 
		  
		}]); 


		 angular.bootstrap(doc,['myapp']);
});