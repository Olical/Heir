(function () {
	/*global expect,heir,jasmine,describe,it*/
	'use strict';

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	describe('heir.createObject', function () {
		it('returns a new empty object when passed one', function () {
			var source = {};
			var result = heir.createObject(source);

			expect(result).toEqual({});
			expect(result).not.toBe(source);
		});

		it('inserts the source object into the prototype', function () {
			var source = {
				foo: true
			};
			var result = heir.createObject(source);

			expect(result).toEqual(source);
			expect(result).not.toBe(source);
			expect(result.hasOwnProperty('foo')).toBe(false);
			expect(result.foo).toBe(true);
		});
	});

	describe('heir.inherit', function () {
	});

	jasmineEnv.execute();
}.call(this));