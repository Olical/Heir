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

	describe('heir.isArray', function() {
		it('returns true for array literals', function() {
			expect(heir.isArray(['a', 'b', 'c'])).toBe(true);
		});

		it('returns true for array objects', function() {
			expect(heir.isArray(new Array())).toBe(true);
		});

		it('return false for primitives', function() {
			expect(heir.isArray(1)).toBe(false);
			expect(heir.isArray(1.01)).toBe(false);
			expect(heir.isArray('a')).toBe(false);
			expect(heir.isArray(true)).toBe(false);
			expect(heir.isArray(false)).toBe(false);
		});

		it('returns false for objects', function() {
			expect(heir.isArray({})).toBe(false);
		});

		it('returns false for array-like objects', function() {
			var args = (function() {
				return arguments;
			})(1, 2, 3);

			expect(heir.isArray(args)).toBe(false);
		});

		it('returns false for functions', function() {
			expect(heir.isArray(function(){})).toBe(false);
		})
	});

	describe('heir.isArray', function() {

		it('returns true for functions', function() {
			expect(heir.isFunction(function(){})).toBe(true);
		});

		it('return false for primitives', function() {
			expect(heir.isFunction(1)).toBe(false);
			expect(heir.isFunction(1.01)).toBe(false);
			expect(heir.isFunction('a')).toBe(false);
			expect(heir.isFunction(true)).toBe(false);
			expect(heir.isFunction(false)).toBe(false);
		});

		it('returns false for arrays', function() {
			expect(heir.isFunction(['a', 'b', 'c'])).toBe(false);
			expect(heir.isFunction(new Array())).toBe(false);
		});

		it('returns false for objects', function() {
			expect(heir.isFunction({})).toBe(false);
		});

		it('returns false for array-like objects', function() {
			var args = (function() {
				return arguments;
			})(1, 2, 3);

			expect(heir.isFunction(args)).toBe(false);
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

		it('works with objects as the child', function() {
			var Base = function() {};
			Base.prototype.foo = function() {
				return '!foo!';
			};

			var sub = {};

			heir.inherit(Base, sub);

			expect(sub.foo()).toEqual('!foo!');
		});
	});

	// Run Jasmine
	jasmineEnv.execute();
}.call(this));