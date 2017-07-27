angular.module('productList')
    .component('productList', {
       templateUrl: 'components/product-list/product-list.template.html',
       controller: 'ProductListController',
        bindings: {name: '@'}
    });