'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
    .config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/products', {
                template: '<product-list></product-list>'
            })
            .when('/products/:productId', {
                template: '<product-detail></product-detail>'
            })
            .otherwise('/products');
    }
]);