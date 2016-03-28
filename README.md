# Angular intl-tel-input Directive

AngularJS 1.4.x module implementing the popular [intl-tel-input jQuery Plugin](https://github.com/Bluefieldscom/intl-tel-input)

[![Circle CI](https://circleci.com/gh/SmoshySmosh/ng-intl-tel-input.svg?style=svg)](https://circleci.com/gh/SmoshySmosh/ng-intl-tel-input)

<a href="https://angularjs.org/">
    <img height="50"    src="https://d1xwtr0qwr70yv.cloudfront.net/assets/tech/angularjs-bb8c730bb5b75b4d49ed14cc6318eb6d.svg" alt="AngularJS">
</a>
<a href="http://gruntjs.com/">
    <img height="50" src="http://gruntjs.com/img/grunt-logo-no-wordmark.svg" alt="Grunt">
</a>
<a href="https://angular.github.io/protractor/">
    <img height="50" src="http://g00glen00b.be/wp-content/uploads/2015/10/protractor-logo1.png" alt="Protractor">
</a>
<a href="https://karma-runner.github.io/">
    <img height="50" src="https://worldvectorlogo.com/logos/karma.svg" alt="Karma">
</a>
<a href="http://jasmine.github.io/">
    <img height="50" src="https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Logo_jasmine.svg/1028px-Logo_jasmine.svg.png" alt="Jasmine">
</a>
<a href="http://jshint.com/">
    <img height="50" src="http://jshint.com/res/jshint-dark.png" alt="JSHint">
</a>
<a href="http://jscs.info/">
    <img height="50" src="https://worldvectorlogo.com/logos/jscs.svg" alt="JSCS">
</a>
## What it does

### Initialization

### Validation

Operates as a normal validator for a form input based on the selected country.

### Formatting

Assigns the final formatted telephone number to the ng-model binding.

## Demo

http://smoshysmosh.github.io/ng-intl-tel-input/

## Usage

### Installation

**With Bower**

`bower install smoshysmosh-ng-intl-tel-input --save`

**Manually**

`git clone https://github.com/smoshysmosh/ng-intl-tel-input.git`

### Provider setup and config

Inject `ngIntlTelInput` into your application module

```javascript
var myApp = angular.module('myApp', ['ss.ngIntlTelInput']);
```

### Directive usage

#### ng-intl-tel-input attribute

This attribute applies _intl-tel-input_ to a **text** field.

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input>
```

**Note**

* `type` is set to *text* or *tel*
* `ng-model` is specified (required)

#### ng-intl-tel-input-options attribute

This attribute allows you to configure run-time settings.

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input ng-intl-tel-input-options="{initialCountry: 'gb'}">
```
Configure defaults

> See: https://github.com/Bluefieldscom/intl-tel-input#options
