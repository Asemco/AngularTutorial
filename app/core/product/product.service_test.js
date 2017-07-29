describe('Product', function() {
   var productsData = [
       {name: "Super Silver Haze", price: 12},
       {name: "KK Bubba", price: 6}
   ];

   // Add a custom equality tester before each test.  Required with $resource as Jasmine doesn't know what's up.
   beforeEach(function() {
       jasmine.addCustomEqualityTester(angular.equals);
   });

   beforeEach(module('core.product'));

    beforeEach(inject(function(_$httpBackend_, _Product_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('products/products.json').respond(productsData);
        Product = _Product_;
    }));

   // Verify that there are no outstanding expectations or requests after each test.
   afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
   });

   it('Should fetch the product\'s data from `/products/products.json`', function() {

       var products = Product.query();

       expect(products).toEqual([]);
       $httpBackend.flush();

       expect(products).toEqual(productsData);
   });

});