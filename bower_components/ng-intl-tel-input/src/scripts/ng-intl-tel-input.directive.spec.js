(function () {
    'use strict';

    describe('Directive: ng-intl-tel-input', function () {
        var $scope, $compile, formElement, parsedDocument, element;

        beforeEach(module('ss.ngIntlTelInput'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $scope   = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        describe('Test with text fields', function () {
            beforeEach(function () {
                var formElement = angular.element([
                    '<form name="form">',
                    '<label for="tel">Telephone</label>',
                    '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));

                $scope.model = {
                    tel: ''
                };

                parsedDocument = $compile(formElement)($scope);

                element = parsedDocument.find('input').eq(0);
            });

            it('should apply the intl-tel-input jquery plugin to text fields', function () {
                expect(parsedDocument.find('.intl-tel-input').length).toEqual(1);
            });

            it('should apply the intl-tel-input jquery plugin to tel fields', function () {
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" type="tel" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                expect(parsedDocument.find('.intl-tel-input').length).toEqual(1);
            });

            it('should apply the intl-tel-input jquery plugin to text and tel fields', function () {
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" type="password" name="tel" ng-intl-tel-input />',
                    '<input ng-model="model.tel" type="email" name="tel" ng-intl-tel-input />',
                    '<input ng-model="model.tel" type="number" name="tel" ng-intl-tel-input />',
                    '<input ng-model="model.tel" type="date" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                expect(parsedDocument.find('.intl-tel-input').length).toEqual(0);
            });

            it('should set the field as invalid with bad input', function () {
                $scope.model.tel = '07400 123456';
                $scope.$digest();
                expect($scope.form.tel.$error.ngIntlTelInput).toBeDefined();
                expect($scope.form.tel.$valid).toBe(false);
            });

            it('should set the field as invalid with input longer than > 0', function () {
                element.val('1').trigger('input');
                $scope.$digest();
                expect($scope.form.tel.$error.ngIntlTelInput).toBeDefined();
                expect($scope.form.tel.$valid).toBe(false);
            });

            it('should set the field as valid with good input', function () {
                element.val('2013128425').trigger('input');
                $scope.$digest();
                expect($scope.form.tel.$error.ngIntlTelInput).toBeUndefined();
                expect($scope.form.tel.$valid).toBe(true);
            });

            it('should set the field as valid with empty input', function () {
                element.val('').trigger('input');
                $scope.$digest();
                expect($scope.form.tel.$error.ngIntlTelInput).toBeUndefined();
                expect($scope.form.tel.$valid).toBe(true);
            });

            it('should set the model value to the full phone number with dial code', function () {
                element.val('2103128425').trigger('input');
                $scope.$digest();
                expect($scope.model.tel).toEqual('+12103128425');
            });

            it('should set the model value to the full phone number and be valid', function () {
                element.val('+12103128425').trigger('input');
                $scope.$digest();
                expect($scope.model.tel).toEqual('+12103128425');
            });

            it('should not set the model value when invalid', function () {
                element.val('07400 123456').trigger('input');
                $scope.$digest();
                expect($scope.model.tel).toBeUndefined();
            });

            it('should set the default country', function () {
                $scope.options = {
                    initialCountry: 'af'
                };
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input',
                    ' ng-intl-tel-input-options="options" />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                element = parsedDocument.find('input').eq(0);
                expect(element.intlTelInput('getSelectedCountryData').iso2).toEqual('af');
            });

            it('should set the country when model value is present', function () {
                $scope.model.tel = '447400123456';
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                element = parsedDocument.find('input').eq(0);
                expect(element.intlTelInput('getSelectedCountryData').iso2).toEqual('gb');
            });

            it('should set the country when model value is present with plus sign', function () {
                $scope.model.tel = '+447400123456';
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                element = parsedDocument.find('input').eq(0);
                expect(element.intlTelInput('getSelectedCountryData').iso2).toEqual('gb');
            });

            it('should apply the intl-tel-input without a type declaration', function () {
                formElement = angular.element([
                    '<form name="form">',
                    '<input ng-model="model.tel" name="tel" ng-intl-tel-input />',
                    '</form>'
                ].join(''));
                parsedDocument = $compile(formElement)($scope);
                $scope.$digest();
                expect(parsedDocument.find('.intl-tel-input').length).toEqual(1);
            });
        });
    });
})();
