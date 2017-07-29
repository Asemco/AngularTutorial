describe('myApp', function() {
    var productsData = {name: "Super Silver Haze", price: 12};
   beforeEach(module('productDetail'));

    // Add a custom equality tester before each test.  Required with $resource as Jasmine doesn't know what's up.
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });

   describe('ProductDetailController', function() {

       var $httpBackend, ctrl;

       beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
           $httpBackend = _$httpBackend_;
           $httpBackend.expectGET('products/super-silver-haze.json').respond(productsData);
           $routeParams.productId = "super-silver-haze";
           ctrl = $componentController('productDetail');
       }));

       it('Should fetch the product\s details.', (function() {
           expect(ctrl.product).toEqual({});
            console.log(ctrl.product);
           $httpBackend.flush();
           expect(ctrl.product).toEqual(productsData);
       }));

   });

});