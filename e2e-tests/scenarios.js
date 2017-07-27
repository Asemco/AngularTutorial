'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('myApp', function() {

  describe('productList', function() {
    var browserPath = "http://projects/DefaultAngular/app/";
    var indexHtml = "index.html";
    var hashPrefix = "!";
    beforeEach(function() {
      browser.get(indexHtml);
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
      ]);

    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('super silver');

      element.all(by.css('.products li a')).first().click();
      expect(browser.getCurrentUrl()).toBe(browserPath + indexHtml + hashPrefix + '#%2Fproducts%2FSuper%20Silver%20Haze')
    });

  });

  // it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
  //   browser.get('index.html');
  //   expect(browser.getLocationAbsUrl()).toMatch("/view1");
  // });


  // describe('view2', function() {
  //
  //   beforeEach(function() {
  //     browser.get('index.html#!/view2');
  //   });
  //
  //
  //   it('should render view2 when user navigates to /view2', function() {
  //     expect(element.all(by.css('[ng-view] p')).first().getText()).
  //       toMatch(/partial for view 2/);
  //   });
  //
  // });

});
