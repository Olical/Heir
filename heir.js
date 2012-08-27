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
     * Works out if a variable is a true object (created with {} etc) and not an array or anything else that usually shows up as an object.
     *
     * @param {Mixed} chk The variable to check to see if it is an object. It must be a pure object, not even a prototype.
     * @return {Boolean} True if it is a true object, false if it is anything else.
     */
    function isObject(chk) {
        return (chk && typeof chk === 'object' && Object.prototype.toString.call(chk) !== '[object Array]') === true;
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
                if(isObject(a[key]) && isObject(b[key])) {
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

    function clone() {

    }

    /**
     * Inherits other functions prototype objects into the current function.
     *
     * @param {Function|Function[]} parent A function which should have it's prototype cloned and placed into the current functions prototype. If you pass an array of functions they will all be inherited from.
     * @return {Function} The current function to allow chaining.
     */
    function inherit(parent) {
        // Return the current function to allow chaining
        return this;
    }

    // Expose the inherit function by placing it in the Function prototype
    Function.prototype.inherit = inherit;

    // Create a nice little namespace to expose
    var ns = {
        merge: merge,
        inherit: inherit,
        clone: clone,
        isObject: isObject
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