angular.module('productList')
    .controller('ProductListController',
        ['$http', function ProductListController($http) {
            var self = this;

            self.sortOrder = 'name';

            $http.get('components/product-list/products.json')
                .then(function(response) {
                    // self.products = response.data;
                    self.products = response.data.slice(0, 5);
                })
                .catch(function(response) {
                    console.log(response);
                });
        }]
    );