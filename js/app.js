/* global angular,window */
var imobDbApp = angular.module('imobDbApp', ['angular-gestures', 'ngRoute', 'ngResource', 'loginDbControllers','imoveisDbControllers', 'imoveisDbFilters', 'imoveisDbServices', 'calcController', 'calendarDbControllers', 'imoveisDbDirectives']);

var appServices = angular.module('imoveisDbServices', []);
var appControllers = angular.module('imoveisDbControllers', []);
var appDirectives = angular.module('imoveisDbDirectives', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";


imobDbApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

imobDbApp.config(['$routeProvider', '$locationProvider', 'hammerDefaultOptsProvider',
	function($routeProvider , $locationProvider, hammerDefaultOptsProvider)
	{			
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'HomeCtrl',
				access: { requiredLogin: true }
			}).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'AdminUserCtrl',
        css: 'css/login.css',
        access: { requiredLogin: false }
      }).
      when('/logout', {
          templateUrl: 'partials/logout.html',
          controller: 'AdminUserCtrl',
          access: { requiredLogin: true }
      }).
			when('/cadastro/clientes', { 
				templateUrl: 'partials/listViewClientes.html',
				controller: 'ClientesCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/clientes/:type', {  
				templateUrl: 'partials/formNewClientes.html',
				controller: 'ClientesEditCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/clientes/:type/:id', { 
				templateUrl: 'partials/formNewClientes.html',
				controller: 'ClientesEditCtrl',	
				access: { requiredLogin: true }
			}).
			when('/cadastro/imoveis', { 
				templateUrl: 'partials/listViewImoveis.html',
				controller: 'ImoveisCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/imoveis/:type', {  
				templateUrl: 'partials/formNewImoveis.html',
				controller: 'ImoveisEditCtrl',
				access: { requiredLogin: true }	
			}).
			when('/cadastro/imoveis/:type/:id', {
				templateUrl: 'partials/formNewImoveis.html',
				controller: 'ImoveisEditCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/contratos', { 
				templateUrl: 'partials/listViewContratos.html',
				controller: 'ContratosCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/contratos/:type', {  
				templateUrl: 'partials/formNewContratos.html',
				controller: 'ContratosEditCtrl',
				access: { requiredLogin: true }			
			}).
			when('/cadastro/contratos/:type/:id', {
				templateUrl: 'partials/formNewContratos.html',
				controller: 'ContratosEditCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/eventos', { 
				templateUrl: 'partials/listViewEventos.html',
				controller: 'EventosCtrl',
				access: { requiredLogin: true }
			}).
			when('/cadastro/eventos/:type', {  
				templateUrl: 'partials/formNewEventos.html',
				controller: 'EventosEditCtrl',
				access: { requiredLogin: true }	
			}).
			when('/cadastro/eventos/:type/:id', {
				templateUrl: 'partials/formNewEventos.html',
				controller: 'EventosEditCtrl',
				access: { requiredLogin: true }
			}).						
			when('/unsupported', {
				templateUrl: 'partials/unsupported.html'
			}).
			when('/dashboard', {  
				templateUrl: 'partials/home.html',
				controller: 'ClientesCtrl',
				access: { requiredLogin: true }
			}).
			when('/calendario', {  
				templateUrl: 'partials/calendario.html',
				controller: 'CalendarCtrl',
				css: 'css/calendar.css',
				access: { requiredLogin: true }
			}).
			when('/calculadoras/emprestimo', {  
				templateUrl: 'partials/calculadoraEmprestimo.html',
				controller: 'calculadoraCtrl',
				access: { requiredLogin: false }
			}).
			otherwise({
				redirectTo: '/login'
			});
			
		$locationProvider.html5Mode(true).hashPrefix('!');
		hammerDefaultOptsProvider.set({
        recognizers: [[Hammer.Tap, {time: 100}]]
    });		
	
		//$controllerProvider.register('HomeCtrl', function($scope)
		//{
		    
		//});
	
	}
]);

imobDbApp.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            $location.path("/login").replace();
        }
    });
});
