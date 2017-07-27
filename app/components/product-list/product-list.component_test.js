describe('myApp', function() {
   beforeEach(module('productList'));

   describe('ProductListController', function() {

       var $httpBackend, ctrl;

       beforeEach(inject(function($componentController, _$httpBackend_) {
           $httpBackend = _$httpBackend_;
           // $httpBackend.expectGET('components/product-list/products.json').respond([PRODUCTSHERE]);
           ctrl = $componentController('productList');
       }));

       it('should create a `products` model with multiple products fetched with `$http`', inject(function($componentController) {
           expect(ctrl.products).toBeUndefined();

           $httpBackend.flush();
           expect(ctrl.products.length).toBeGreaterThan(0);
       }));

       it('should set a default value for the `sortOrder` model', function() {
          expect(ctrl.sortOrder).toBe('name');
       });

   });

});