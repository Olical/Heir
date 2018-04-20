# Heir [![npm](https://img.shields.io/npm/v/heir.svg)](https://www.npmjs.com/package/heir)

Helper functions for prototypical inheritance in JavaScript.

Use the source code and JSDoc comments as documentation, here's a quick example to overview the API though.

```javascript
const heir = require('heir')

// Create the base class.
function Base() {}

// Add a method.
Base.prototype.foo = function () {
  return 'Base#foo'
}

// Create a sub class which inherits from base.
function Sub() {}
heir.inherit(Sub, Base)

// Mix in some functionality enhancing objects.
heir.mixin(Sub, events)
heir.mixin(Sub, pooling)

// Change the original method.
Sub.prototype.foo = function () {
  return [
    'Sub#foo',
    Sub._super.foo.call(this)
  ].join(', ')
}

// Create an instance of Sub and call it's method.
const s = new Sub()
s.foo() // Returns "Sub#foo, Base#foo"
```

## Unlicense

This project is given to you under the [unlicense][], as documented in the `UNLICENSE` file in this directory. Enjoy.

[unlicense]: http://unlicense.org/
