var app = angular.module('orderingSystem', ['ui.router', 'templates', 'ngCookies'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('orders', {
                url: '/orders',
                templateUrl: 'views/orders/_orders.html',
                controller: 'baseCtrl',
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/_home.html',
                controller: 'homeCtrl',
            });

        $urlRouterProvider.otherwise('home');
    });

