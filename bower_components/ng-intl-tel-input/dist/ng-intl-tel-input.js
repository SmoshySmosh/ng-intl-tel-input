/*
 * ng-intl-tel-input v1.0.0
 * Build Date: 2016-03-28
 * https://github.com/smoshysmosh/ng-intl-tel-input.git
 * Licensed under the MIT license
 */
(function () {
    'use strict';

    angular
        .module('ss.ngIntlTelInput', []);
})();

(function () {
    'use strict';

    angular
        .module('ss.ngIntlTelInput')
        .directive('ngIntlTelInput', TelInputDirective);

    TelInputDirective.$inject = ['$log'];

    function TelInputDirective ($log) {
        var directive = {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                ngIntlTelInputOptions: '=?'
            },
            link: link
        };

        return directive;

        function link ($scope, $element, $attrs, $ctrl) {
            // Warning for bad directive usage.
            if ((!!$attrs.type && ($attrs.type !== 'text' && $attrs.type !== 'tel')) ||
                $element[0].tagName !== 'INPUT') {
                $log.warn('ng-intl-tel-input can only be applied to a *text* or *tel* input');
                return;
            } else if (!window.intlTelInputUtils) {
                $log.warn('intlTelInputUtils is not defined');
                return;
            }

            // Initialize.
            $element.intlTelInput($scope.ngIntlTelInputOptions);

            //Validation.
            $ctrl.$validators.ngIntlTelInput = validator;

            // Set model value to valid, formatted version.
            $ctrl.$parsers.push(parser);

            // Set input value to model value and trigger evaluation.
            $ctrl.$formatters.push(formatter);

            function validator (value) {
                // if phone number is deleted / empty do not run phone number validation
                if (value || $element[0].value.length > 0) {
                    return $element.intlTelInput('isValidNumber');
                } else {
                    return true;
                }
            }

            function parser (value) {
                $element.val($element.intlTelInput('getNumber', 2));
                return $element.intlTelInput('getNumber');
            }

            function formatter (value) {
                if (value) {
                    if (value.charAt(0) !== '+') {
                        value = '+' + value;
                    }
                    $element.intlTelInput('setNumber', value);
                }
                return value;
            }
        }
    }
})();
