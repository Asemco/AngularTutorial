'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('myApp', function() {
    var browserPath = "http://projects/DefaultAngular/app/";
    var indexHtml = "index.html";
    var hashPrefix = "#!";

    // Testing the Default path.
    it('should automatically redirect to `index.html` to `index.html#!/products`', function() {
        browser.get('index.html');
        expect(browser.getCurrentUrl()).toBe(browserPath + indexHtml + hashPrefix + '/products')
    });

    // Testing for the Product List view
    describe('View: Product List', function() {
        beforeEach(function() {
            browser.get(indexHtml + hashPrefix + '/products');
        });

        it('should filter the product list as a user types into the search box', function() {
          var productList = element.all(by.repeater('product in $ctrl.products'));
          var query = element(by.model('$ctrl.query'));

          expect(productList.count()).toBeGreaterThan(0);

          query.sendKeys('Super');
          expect(productList.count()).toBe(1);

          query.clear();
          query.sendKeys('Blue');
          expect(productList.count()).toBe(0);

        });

        it('should be possible to control product order via the drop-down menu', function() {
          var queryField = element(by.model('$ctrl.query'));
          var orderSelect = element(by.model('$ctrl.sortOrder'));
          var nameOption = orderSelect.element(by.css('option[value="name"]'));
          var phoneNameColumn = element.all(by.repeater('product in $ctrl.products').column('product.name'));

          function getNames() {
            return phoneNameColumn.map(function(elem) {
              return elem.getText();
            });
          }

          queryField.sendKeys('super');

          expect(getNames()).toEqual(['Super Silver Haze']);

          queryField.clear();

          expect(getNames()).toEqual([
              'KK Bubba',
              'Kryptonite',
              'Rockstar OG',
              'Super Silver Haze'
          ])

        });

        it('should render phone specific links', function() {
          var query = element(by.model('$ctrl.query'));
          query.sendKeys('super silver');

          element.all(by.css('.products li a')).first().click();
          expect(browser.getCurrentUrl()).toBe(browserPath + indexHtml + hashPrefix + '/products/Super%20Silver%20Haze')
        });

    });

    // Testing the Product Details View
    describe('View: Product Details', function() {
        beforeEach(function() {
            browser.get(indexHtml + hashPrefix + '/products/Super%20Silver%20Haze');
        });

        it('Should display the Super Silver Haze\'s product details.', function() {
          expect(element(by.binding('$ctrl.productId')).getText()).toBe('Super Silver Haze');
        });

    });

});
