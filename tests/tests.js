(function () {
	/*global expect,heir,jasmine,describe,it*/
	'use strict';

	// Set up the Jasmine environment
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	// Configure the tests
	describe('heir.isObject', function() {
		it('returns true on objects', function() {
			expect(heir.isObject({})).toBe(true);
			var test = {};
			expect(heir.isObject(test)).toBe(true);
		});

		it('returns false on a regex', function() {
			expect(heir.isObject(/reg[ex]/i)).toBe(false);
			var test = /reg[ex]/i;
			expect(heir.isObject(test)).toBe(false);
		});

		it('returns false on arrays', function() {
			expect(heir.isObject([])).toBe(false);
			var test = [];
			expect(heir.isObject(test)).toBe(false);
		});

		it('returns false on null', function() {
			expect(heir.isObject(null)).toBe(false);
			var test = null;
			expect(heir.isObject(test)).toBe(false);
		});

		it('returns false on numbers', function() {
			expect(heir.isObject(50)).toBe(false);
			var test = 50;
			expect(heir.isObject(test)).toBe(false);
		});

		it('returns false on strings', function() {
			expect(heir.isObject('foo')).toBe(false);
			var test = 'foo';
			expect(heir.isObject(test)).toBe(false);
		});

		it('returns false on booleans', function() {
			expect(heir.isObject(true)).toBe(false);
			var test = true;
			expect(heir.isObject(test)).toBe(false);
		});
	});

	describe('heir.merge', function() {
		it('copies in values that did not exist', function() {
			var chk = heir.merge({foo:true}, {bar: true});
			expect(chk).toEqual({foo:true, bar:true});
		});

		it('copies in values that did exist', function() {
			var chk = heir.merge({foo:true, bar:true}, {foo:false});
			expect(chk).toEqual({foo:false, bar:true});
		});

		it('merges objects recursively', function() {
			var chk = heir.merge({
				nest: {
					foo: true,
					bar: true
				}
			}, {
				nest: {
					bar: false
				}
			});

			expect(chk).toEqual({
				nest: {
					foo: true,
					bar: false
				}
			});
		});
	});

	describe('heir.clone', function() {
		it('clones objects', function() {
			var orig = {
				foo: true,
				bar: false
			};

			var cl = heir.clone(orig);

			cl.bar = true;

			expect(orig).toEqual({
				foo: true,
				bar: false
			});

			expect(cl).toEqual({
				foo: true,
				bar: true
			});
		});

		it('clones objects recursively', function() {
			var orig = {
				foo: true,
				bar: false,
				baz: {
					one: 100,
					two: 300
				}
			};

			var cl = heir.clone(orig);

			cl.bar = true;
			cl.baz.two = 200;
			cl.baz.three = 300;

			expect(orig).toEqual({
				foo: true,
				bar: false,
				baz: {
					one: 100,
					two: 300
				}
			});

			expect(cl).toEqual({
				foo: true,
				bar: true,
				baz: {
					one: 100,
					two: 200,
					three: 300
				}
			});
		});
	});

	describe('heir.inherit', function() {
		it('inherits a class', function() {
			var Base = function(){};
			Base.prototype.foo = function() {
				return '!foo!';
			};

			var Base2 = function(){};
			Base2.prototype.baz = function() {
				return '!baz!';
			};

			var Sub = function(){}.inherit(Base);
			Sub.prototype.bar = function() {
				return '!bar!';
			};
			Sub.inherit(Base2);

			var b = new Base();
			var b2 = new Base2();
			var s = new Sub();

			expect(b.bar).not.toBeDefined();
			expect(b2.bar).not.toBeDefined();
			expect(b.foo()).toEqual('!foo!');
			expect(b2.baz()).toEqual('!baz!');
			expect(s.foo()).toEqual('!foo!');
			expect(s.bar()).toEqual('!bar!');
			expect(s.baz()).toEqual('!baz!');
		});

		it('inherits multiple classes', function() {
			var Base = function(){};
			Base.prototype.foo = function() {
				return '!foo!';
			};

			var Base2 = function(){};
			Base2.prototype.baz = function() {
				return '!baz!';
			};

			var Sub = function(){}.inherit([Base, Base2]);
			Sub.prototype.bar = function() {
				return '!bar!';
			};

			var b = new Base();
			var b2 = new Base2();
			var s = new Sub();

			expect(b.bar).not.toBeDefined();
			expect(b2.bar).not.toBeDefined();
			expect(b.foo()).toEqual('!foo!');
			expect(b2.baz()).toEqual('!baz!');
			expect(s.foo()).toEqual('!foo!');
			expect(s.bar()).toEqual('!bar!');
			expect(s.baz()).toEqual('!baz!');
		});

		it('does not have to be called through the prototype', function() {
			var Base = function(){};
			Base.prototype.foo = function() {
				return '!foo!';
			};

			var Base2 = function(){};
			Base2.prototype.baz = function() {
				return '!baz!';
			};

			var Sub = function(){};
			heir.inherit([Base, Base2], Sub);
			Sub.prototype.bar = function() {
				return '!bar!';
			};

			var b = new Base();
			var b2 = new Base2();
			var s = new Sub();

			expect(b.bar).not.toBeDefined();
			expect(b2.bar).not.toBeDefined();
			expect(b.foo()).toEqual('!foo!');
			expect(b2.baz()).toEqual('!baz!');
			expect(s.foo()).toEqual('!foo!');
			expect(s.bar()).toEqual('!bar!');
			expect(s.baz()).toEqual('!baz!');
		});
	});

	// Run Jasmine
	jasmineEnv.execute();
}.call(this));