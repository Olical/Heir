/**
 * Heir v0.0.0 - http://git.io/F87mKg
 * Oliver Caldwell
 * MIT license
 */

;(function() {
    // JSHint config - http://www.jshint.com/
    /*jshint laxcomma:true*/

    // Place the script into strict mode
    'use strict';

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

    // Expose the function by placing it in the Function prototype
    Function.prototype.inherit = inherit;
}());