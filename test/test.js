const assert = require('assert');
const EventEmitter = require('../tom32i-event-emitter.js');

describe('EventEmitter', () => {
    class Foo extends EventEmitter {
        bar(detail) {
            this.emit('bar', detail);
        }

        baz(detail) {
            this.emit('baz', detail);
        }
    }

    it('on/off', function () {
        let barCalls = 0;
        let bazCalls = 0;

        const foo = new Foo();

        function onBar(event) {
            assert.equal(event.type, 'bar');
            barCalls++;
        }

        function onBaz(event) {
            assert.equal(event.type, 'baz');
            bazCalls++;
        }

        foo.on('bar', onBar);
        foo.on('baz', onBaz);

        assert.equal(barCalls, 0);
        assert.equal(bazCalls, 0);

        foo.bar();

        assert.equal(barCalls, 1);
        assert.equal(bazCalls, 0);

        foo.baz();
        foo.bar();

        assert.equal(barCalls, 2);
        assert.equal(bazCalls, 1);

        foo.off('baz', onBaz);

        foo.baz();

        assert.equal(bazCalls, 1);
    });

    it('addEventListener/removeEventListener', function () {
        let barCalls = 0;
        let bazCalls = 0;

        const foo = new Foo();

        function onBar(event) {
            assert.equal(event.type, 'bar');
            barCalls++;
        }

        function onBaz(event) {
            assert.equal(event.type, 'baz');
            bazCalls++;
        }

        foo.addEventListener('bar', onBar);
        foo.addEventListener('baz', onBaz);

        assert.equal(barCalls, 0);
        assert.equal(bazCalls, 0);

        foo.bar();

        assert.equal(barCalls, 1);
        assert.equal(bazCalls, 0);

        foo.baz();
        foo.bar();

        assert.equal(barCalls, 2);
        assert.equal(bazCalls, 1);

        foo.removeEventListener('baz', onBaz);

        foo.baz();

        assert.equal(bazCalls, 1);
    });

    it('details', function () {
        const foo = new Foo();

        function onBar(event) {
            assert.equal(event.detail.foo, 'bar');
        }

        foo.on('bar', onBar);

        foo.bar({ foo: 'bar' });
    });
});
