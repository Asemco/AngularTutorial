describe('myApp', function() {
    var productsData = [
        {name: "Super Silver Haze", price: 12},
        {name: "KK Bubba", price: 6}
    ];
   beforeEach(module('productList'));

    // Add a custom equality tester before each test.  Required with $resource as Jasmine doesn't know what's up.
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });

   describe('ProductListController', function() {

       var $httpBackend, ctrl;

       beforeEach(inject(function($componentController, _$httpBackend_) {
           $httpBackend = _$httpBackend_;
           $httpBackend.expectGET('products/products.json').respond(productsData);
           ctrl = $componentController('productList');
       }));

       it('Should create a `products` model with multiple products fetched with `$http`', inject(function($componentController) {

           expect(ctrl.products).toEqual([]);
           $httpBackend.flush();
           expect(ctrl.products).toEqual(productsData);
       }));

       it('Should set a default value for the `sortOrder` model', function() {
          expect(ctrl.sortOrder).toBe('name');
       });

   });

});