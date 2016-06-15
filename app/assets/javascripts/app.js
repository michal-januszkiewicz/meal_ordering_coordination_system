var app = angular.module('orderingSystem', ['ui.router', 'templates'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('orders', {
                url: '/orders',
                templateUrl: 'views/orders/_orders.html',
                controller: 'baseCtrl',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/_login.html',
                controller: 'loginCtrl',
            });

        $urlRouterProvider.otherwise('orders');
    });

