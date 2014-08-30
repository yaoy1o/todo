require.config({
　　　　paths: {
　　　　　　"jquery": "/bower_components/jquery/dist/jquery.min",
　　　　　　"bootstrap": "/bower_components/bootstrap/dist/js/bootstrap.min",
		   "angular": "/bower_components/angularjs/angular.min",
		   "PhoneListCtrl":"/js/PhoneListCtrl",
		   "dashboard":"/js/dashboard",
		   "jquery.hotkeys":"/bootstrap-wysiwyg/external/jquery.hotkeys",
			"prettify":"/bootstrap-wysiwyg/external/google-code-prettify/prettify",
			"bootstrap-wysiwyg":"/bootstrap-wysiwyg/bootstrap-wysiwyg",
		   'domReady': '/bower_components/domready/domReady',
		   "angular-route":"/bower_components/angular-route/angular-route.min",
		   "angularTest":"/js/main",
		   "personadd":"/js/personadd",
		   "SelectedTestController":"/js/SelectedTestController"
　　　　}, 
 
	　shim: {

			  'bootstrap':{
			  		deps:['jquery']
			  },

			  'jquery.hotkeys':{
			  		deps:['jquery']
			  },


			  'bootstrap-wysiwyg':{
			  		deps:['jquery.hotkeys','prettify']
			  },


	　　　　　　'angular':{
	　　　　　　　　exports: 'angular'

	　　　　　　},

			  'angular-route':{
			  		deps:['angular'],
			  		exports:'angular-route'
			  },

			  'PhoneListCtrl':{
			  		deps:['dashboard']
			  }
	　　　　　 
	},
　　
	deps:['bootstrap']  
});
 