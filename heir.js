/**
 * Heir v1.0.1 - http://git.io/F87mKg
 * Oliver Caldwell
 * MIT license
 */

(function () {
	/*global define,module*/
	'use strict';

	/**
	 * Get a shortcut for toString
	 * @type {Function}
	 */
	var toString = Object.prototype.toString;

	/**
	 * Works out if a variable is a true object (created with {} etc) and not an array or anything else that usually shows up as an object.
	 *
	 * @param {Mixed} chk The variable to check to see if it is an object. It must be a pure object, not even a prototype.
	 * @return {Boolean} True if it is a true object, false if it is anything else.
	 */
	function isObject(chk) {
		return (chk && toString.call(chk) === '[object Object]') === true;
	}

	/**
	 * Works out if an object is an array
	 *
	 * @param {Mixed} chk The variable to check to see if it is an array
	 * @return {Boolean} True if it is a true array, false if it is anything else
	 */
	function isArray(chk) {
		return !!(chk && toString.call(chk) === '[object Array]');
	}

	/**
	 * Works out if a variable is a function or not
	 *
	 * @param {Mixed} chk The variable to check to see if it is a function
	 * @return {Boolean} True if it is a function, false if it is anything else
	 */
	function isFunction(chk) {
		return typeof chk === 'function';
	}

	/**
	 * Recursively merges two objects. Object `a` will be overridden by the values in object `b`.
	 * Please run the values through a cloning function first, this function does not try to clone them for you.
	 * The base object will be edited directly, please be careful!
	 *
	 * @param {Object} a The base object to merge into.
	 * @param {Object} b The object to merge down into object `a`.
	 * @return {Object} This is object `a` but merged with `b`.
	 */
	function merge(a, b) {
		// Loop over all values in b. If they are not found in a then set them
		// If both values are objects then recursively merge them
		for (var key in b) {
			// Make sure the value is not in __proto__ or something like that
			if (b.hasOwnProperty(key)) {
				// If they are both objects then merge recursively
				if (isObject(a[key]) && isObject(b[key])) {
					merge(a[key], b[key]);
				}

				// Otherwise just replace the base value
				else {
					a[key] = b[key];
				}
			}
		}

		// Return the merged object
		return a;
	}

	/**
	 * Returns a recursive clone of the passed object.
	 * So when you edit the original the clone will not change.
	 * Used in prototypical inheritance.
	 * It will not clone arrays.
	 *
	 * @param {Object} orig The original object to clone.
	 * @return {Object} The cloned version of orig that can be edited without changing the original.
	 */
	function clone(orig) {
		// Initialise variables
		var cl = {};
		var key;

		// Loop over all values in the object
		// If the value is an object then clone recursively
		// Otherwise just copy the value
		for (key in orig) {
			if (orig.hasOwnProperty(key)) {
				cl[key] = isObject(orig[key]) ? clone(orig[key]) : orig[key];
			}
		}

		// Return the clone
		return cl;
	}

	/**
	 * Inherits other functions prototype objects into the current function.
	 *
	 * @param {Function|Function[]} parent A function which should have it's prototype cloned and placed into the current functions prototype. If you pass an array of functions they will all be inherited from.
	 * @param {Function} [forceFn] Optional function to use as the current function which is inheriting the other prototypes. It will default to `this`.
	 * @return {Function} The current function to allow chaining.
	 */
	function inherit(parent, forceFn) {
		// Initialise variables
		var fn = forceFn || this;
		var i;

		// If the parent variable is not a function then it must be an array
		// So we have to loop over it and inherit each of them
		// Remember to pass the current function instance!
		if (typeof parent !== 'function') {
			i = parent.length;
			while (i--) {
				inherit(parent[i], fn);
			}
		}
		else {
			// It is not an array, it is a plain function
			// Merge it's prototype into this one
			merge(fn.prototype, clone(parent.prototype));
		}

		// Return the current function to allow chaining
		return fn;
	}

	// Expose the inherit function by placing it in the Function prototype
	Function.prototype.inherit = inherit;

	// Create a nice little namespace to expose
	var ns = {
		isObject: isObject,
		merge: merge,
		clone: clone,
		inherit: inherit
	};

	// And expose everything else either via AMD or a global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return ns;
		});
	}
	else if (typeof module === 'object' && module.exports) {
		module.exports = ns;
	}
	else {
		this.heir = ns;
	}
}.call(this));