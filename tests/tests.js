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

    it('returns true on a regex', function() {
        expect(heir.isObject(/reg[ex]/i)).toBe(true);
        var test = /reg[ex]/i;
        expect(heir.isObject(test)).toBe(true);
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

// Run Jasmine
jasmineEnv.execute();