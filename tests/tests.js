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
		it('causes a class to inherit a method', function () {
			var Source = function () {};
			Source.prototype.foo = function () {};

			var Destination = function () {};
			heir.inherit(Destination, Source);
			Destination.prototype.bar = function() {};

			var result = new Destination();

			expect(Destination.prototype.hasOwnProperty('foo')).toBe(false);
			expect(Destination.prototype.hasOwnProperty('bar')).toBe(true);
			expect(result.foo).toBeDefined();
			expect(result.bar).toBeDefined();
		});

		it('can have methods overridden', function () {
			var Source = function () {};
			Source.prototype.foo = function () {
				return 'Source#foo';
			};

			var Destination = function () {};
			heir.inherit(Destination, Source);
			Destination.prototype.foo = function() {
				return [
					'Destination#foo',
					Source.prototype.foo.call(this)
				].join(', ');
			};

			var source = new Source();
			var destination = new Destination();

			expect(source.foo()).toBe('Source#foo');
			expect(destination.foo()).toBe('Destination#foo, Source#foo');
		});
	});

	describe('heir.mixin', function () {
		it('can mix methods into a class', function () {
			var source = {
				foo: function () {},
				bar: function () {}
			};
			var Destination = function () {};
			heir.mixin(Destination, source);
			var result = new Destination();

			expect(result.foo).toBeDefined();
			expect(result.bar).toBeDefined();
			expect(Destination.prototype.hasOwnProperty('foo')).toBe(true);
			expect(Destination.prototype.hasOwnProperty('bar')).toBe(true);
		});
	});

	jasmineEnv.execute();
}.call(this));