/**
 * Heir v1.0.1 - http://git.io/F87mKg
 * Oliver Caldwell
 * MIT license
 */

(function () {
	/*global define,module*/
	'use strict';

	var heir = {
		/**
		 * Causes your desired class to inherit from a source class. This uses
		 * prototypical inheritance so you can override methods without ruining
		 * the parent class.
		 *
		 * This will alter the actual destination class though, it does not
		 * create a new class.
		 *
		 * @param {Function} destination The target class for the inheritance.
		 * @param {Function} source Class to inherit from.
		 */
		inherit: function inherit(destination, source) {
			destination.prototype = heir.createObject(source.prototype);
			destination.prototype.constructor = destination;
		},

		/**
		 * Creates a new object with the source object nestled within its
		 * prototype chain.
		 *
		 * @param {Object} source Method to insert into the new object's prototype.
		 * @return {Object} An empty object with the source object in it's prototype chain.
		 */
		createObject: function createObject(source) {
			var Host = function () {};
			Host.prototype = source;
			return new Host();
		}
	};

	if (typeof define === 'function' && define.amd) {
		define(heir);
	}
	else if (typeof module === 'object' && module.exports) {
		module.exports = heir;
	}
	else {
		this.heir = heir;
	}
}.call(this));