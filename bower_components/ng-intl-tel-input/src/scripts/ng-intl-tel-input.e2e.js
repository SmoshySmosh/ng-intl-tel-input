var page = Object.create({}, {
    phone: {
        get: function() {
            return $('#tel');
        },
        set: function(number) {
            this.phone.sendKeys(number);
        }
    },
    phoneDefaultCountry: {
        get: function() {
            return $('#tel-dc');
        },
        set: function(number) {
            this.phoneDefaultCountry.sendKeys(number);
        }
    }
});

describe('ng-intl-tel-input directive', function () {
    beforeEach(function () {
        browser.get('/');
    });

    it('should properly format a phone number', function () {
        browser.waitForAngular();
        page.phone = '18002255288';
        expect(page.phone.getAttribute('value')).toBe('(800) 225-5288');
    });

    it('should set default country to data-default-country', function () {
        page.phoneDefaultCountry = '07400123456';
        expect(page.phoneDefaultCountry.getAttribute('value')).toBe('07400 123456');
    });
});
