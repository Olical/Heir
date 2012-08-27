/**
 * Heir v0.0.0 - http://git.io/F87mKg
 * Oliver Caldwell
 * MIT license
 */

;(function(exports) {
    // JSHint config - http://www.jshint.com/
    /*jshint laxcomma:true*/
    /*global define:true*/

    // Place the script into strict mode
    'use strict';

    /**
     * Works out the real type of a variable.
     *
     * @param {Mixed} item The variable to get the type of.
     * @return {String} The type of the variable you passed.
     */
    function type(item) {
        // Get the base type using the native method
        var itemType = typeof item;

        // If native says it is an object, it probably isn't
        // Let's work out what it actually is
        if(itemType === 'object') {
            // First check if truthy
            if(item) {
                // Check if it is an array
                // This may seem dirty but it also picks up array like objects
                // So things like NodeLists will count as arrays
                if(typeof item.length === 'number') {
                    return 'array';
                }
            }
            else {
                // It is a falsy object, therefore it is null
                return 'null';
            }
        }

        // Return the native type
        // This happens if nothing above matched and returned
        return itemType;
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
        for(var key in b) {
            // Make sure the value is not in __proto__ or something like that
            if(b.hasOwnProperty(key)) {
                // If they are both objects then merge recursively
                if(type(a[key]) === 'object' && type(b[key]) === 'object') {
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
     * Returns a recursive clone of the passed object or array.
     * So when you edit the original the clone will not change.
     * Used in prototypical inheritance.
     *
     * @param {Array|Object} orig The original array or object to clone.
     * @return {Array|Object} The cloned version of orig that can be edited without changing the original.
     */
    function clone(orig) {

    }

    /**
     * Inherits other functions prototype objects into the current function.
     *
     * @param {Function|Function[]} parent A function which should have it's prototype cloned and placed into the current functions prototype. If you pass an array of functions they will all be inherited from.
     * @param {Function} [fn] Optional function to use as the current function which is inheriting the other prototypes. It will default to `this`.
     * @return {Function} The current function to allow chaining.
     */
    function inherit(parent, fn) {
        // Set fn to this if it was not passed
        if(!fn) {
            fn = this;
        }

        // Return the current function to allow chaining
        return fn;
    }

    // Expose the inherit function by placing it in the Function prototype
    Function.prototype.inherit = inherit;

    // Create a nice little namespace to expose
    var ns = {
        type: type,
        merge: merge,
        clone: clone,
        inherit: inherit
    };

    // And expose everything else either via AMD or a global object
    if(typeof define === 'function' && define.amd) {
        define(function() {
            return ns;
        });
    }
    else {
        exports.ns = ns;
    }
}(this));