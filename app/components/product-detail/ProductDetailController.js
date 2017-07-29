angular.module('productDetail')
    .controller('ProductDetailController',
        ['Product', '$routeParams', function ProductDetailController(Product, $routeParams) {
            var self = this;

            self.setImage = function setImage(imageUrl) {
              self.mainImageUrl = imageUrl;
            };

            self.productId = $routeParams.productId.toString().replace(" ", "-");

            self.product = Product.get({productId: self.productId}, function(product) {
                self.setImage(self.product.image);
            });
        }]
    );