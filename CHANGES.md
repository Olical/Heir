## v4.0.0

 * Cleaned up the project to match how JavaScript projects are usually structured these days.
 * Fixed some documentation.
 * Moved away from bower.
 * Simplified as much as possible.
 * Removed all the AMD stuff, just use webpack or whatever, `module.exports` and `require` is good enough and can be compiled out.
 * Use `const` over `var`, if you really need something to target an old browser etc use a transpiler or v3.0.0.
 * Deleted a LOT of code because YAGNI.

## v3.0.0

The concept of `_super` now works better, but in a completely different way. Thanks to @[vejersele][] in issue #9.

[vejersele]: https://github.com/vejersele

## v2.0.0

The `inherit` method used to work by cloning and merging multiple prototypes into one. This meant things like `instanceof` didn't work and you could get into some weird scenarios [caused by multiple inheritance][mi].

The new `inherit` uses the built in prototypical inheritance to provide a much cleaner outcome, as shown in [this post about prototypical inheritance][pi]. The major change is that you can't inherit from multiple classes any more.

If you still need to have multiple things shared between classes to avoid duplication, you can now use the `mixin` method to merge objects into your inheritance hierarchies where required.

[mi]: http://stackoverflow.com/questions/225929/what-is-the-exact-problem-with-multiple-inheritance
[pi]: http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/

## v1.0.0

Initial release.
