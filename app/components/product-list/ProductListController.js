angular.module('productList')
    .controller('ProductListController',
        ['Product', function ProductListController(Product) {
            var self = this;

            self.sortOrder = 'name';

            self.products = Product.query();
        }]
    );