# Heir

This is a small script that adds the ability to inherit other functions prototype objects into your own. It makes prototypical inheritance easy and robust.

Due to there not being any documentation yet, you may want to read my JSDoc comments in the source. They will tell you everything you need to know. Here is a quick example to get you going anyway.

```javascript
// Create the base class
var Base = function(){};

// Add a method
Base.prototype.foo = function() {
	retrun '!foo!';
};

// Create a sub class which inherits from base
var Sub = function(){}.inherit(Base);

// Create an instance of Sub and call it's method
var s = new Sub();
s.foo(); // Returns "!foo!"
```

## Cloning

You can clone the repository with your generic clone commands as a standalone repository or submodule.

```bash
# Full repository
git clone git://github.com/Wolfy87/Heir.git

# Or submodule
git submodule add git://github.com/Wolfy87/Heir.git assets/js/Heir
```

If you wish to run the tests you will also need to fetch the required submodules. You can do that with the following command.

```bash
git submodule update --init
```

## Testing

Tests are performed using Jasmine in the following browsers via [BrowserStack](http://www.browserstack.com/).

 * Firefox
 * Chrome
 * Opera
 * Safari
 * IE6+

When testing in the more modern browsers, not Internet Explorer basically, I run it through the very early versions, some midrange versions and the very latest ones too. I don't just do the latest version.

Heir will always be tested and working perfectly in all of them before a release. I will not release anything I think is riddled with bugs. However, if you do spot one, please [submit it as an issue](https://github.com/Wolfy87/Heir/issues) and I will get right on it.

## License (MIT)

Copyright (c) 2012 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.