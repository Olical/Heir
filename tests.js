const heir = require('.')
const test = require('tape')

test('inherit causes a class to inherit a method', (t) => {
  t.plan(4)

  const Source = function () {}
  Source.prototype.foo = function () {}

  const Destination = function () {}
  heir.inherit(Destination, Source)
  Destination.prototype.bar = function () {}

  const result = new Destination()

  t.equal(Destination.prototype.hasOwnProperty('foo'), false)
  t.equal(Destination.prototype.hasOwnProperty('bar'), true)
  t.ok(result.foo)
  t.ok(result.bar)
})

test('inherit can have methods overridden', (t) => {
  t.plan(2)

  const Source = function () {}
  Source.prototype.foo = () => {
    return 'Source#foo'
  }

  const Destination = function () {}
  heir.inherit(Destination, Source)
  Destination.prototype.foo = function () {
    return [
      'Destination#foo',
      Source.prototype.foo.call(this)
    ].join(', ')
  }

  const source = new Source()
  const destination = new Destination()

  t.equal(source.foo(), 'Source#foo')
  t.equal(destination.foo(), 'Destination#foo, Source#foo')
})

test('inherit is correct in the eyes of instanceof', (t) => {
  t.plan(4)

  const Source = function () {}
  const Destination = function () {}
  heir.inherit(Destination, Source)

  const source = new Source()
  const destination = new Destination()

  t.ok(source instanceof Source)
  t.notOk(source instanceof Destination)

  t.ok(destination instanceof Source)
  t.ok(destination instanceof Destination)
})

test('inherit has a reference to the parent in Destination._super', (t) => {
  t.plan(1)

  const Source = function () {}
  const Destination = function () {}
  heir.inherit(Destination, Source)

  t.equal(Destination._super, Source.prototype)
})

test('inherit can have the addition of this._super disabled', (t) => {
  t.plan(1)

  const Source = function () {}
  const Destination = function () {}
  heir.inherit(Destination, Source, false)

  const result = new Destination()

  t.equal(result._super, undefined)
})

test('mixin can mix methods into a class', (t) => {
  t.plan(4)

  const source = {
    foo: function () {},
    bar: function () {}
  }
  const Destination = function () {}
  heir.mixin(Destination, source)
  const result = new Destination()

  t.ok(result.foo)
  t.ok(result.bar)
  t.ok(Destination.prototype.hasOwnProperty('foo'))
  t.ok(Destination.prototype.hasOwnProperty('bar'))
})
