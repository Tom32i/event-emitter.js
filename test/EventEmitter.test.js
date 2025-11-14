import { describe, test, expect } from 'vitest';
import EventEmitter from 'tom32i-event-emitter.js';

describe('EventEmitter', () => {
    class Foo extends EventEmitter {
        bar(detail) {
            this.emit('bar', detail);
        }

        baz(detail) {
            this.emit('baz', detail);
        }
    }

    test('on/off', () => {
        let barCalls = 0;
        let bazCalls = 0;

        const foo = new Foo();

        function onBar(event) {
            expect(event.type).toBe('bar');
            barCalls++;
        }

        function onBaz(event) {
            expect(event.type).toBe('baz');
            bazCalls++;
        }

        foo.on('bar', onBar);
        foo.on('baz', onBaz);

        expect(barCalls).toBe(0);
        expect(bazCalls).toBe(0);

        foo.bar();

        expect(barCalls).toBe(1);
        expect(bazCalls).toBe(0);

        foo.baz();
        foo.bar();

        expect(barCalls).toBe(2);
        expect(bazCalls).toBe(1);

        foo.off('baz', onBaz);

        foo.baz();

        expect(bazCalls).toBe(1);
    });

    test('addEventListener/removeEventListener', () => {
        let barCalls = 0;
        let bazCalls = 0;

        const foo = new Foo();

        function onBar(event) {
            expect(event.type).toBe('bar');
            barCalls++;
        }

        function onBaz(event) {
            expect(event.type).toBe('baz');
            bazCalls++;
        }

        foo.addEventListener('bar', onBar);
        foo.addEventListener('baz', onBaz);

        expect(barCalls).toBe(0);
        expect(bazCalls).toBe(0);

        foo.bar();

        expect(barCalls).toBe(1);
        expect(bazCalls).toBe(0);

        foo.baz();
        foo.bar();

        expect(barCalls).toBe(2);
        expect(bazCalls).toBe(1);

        foo.removeEventListener('baz', onBaz);

        foo.baz();

        expect(bazCalls).toBe(1);
    });

    test('removeAllEventListeners', () => {
        let barCalls = 0;

        const foo = new Foo();

        function onBar(event) {
            expect(event.type).toBe('bar');
            barCalls++;
        }

        foo.addEventListener('bar', onBar);

        expect(barCalls).toBe(0);

        foo.bar();

        expect(barCalls).toBe(1);

        foo.removeAllEventListeners();

        foo.bar();

        expect(barCalls).toBe(1);
    });

    test('details', () => {
        const foo = new Foo();
        const payload = { foo: 'bar' };

        function onBar(event) {
            expect(event.type).toBe('bar');
            expect(event.detail).toBe(payload);
        }

        function onBaz(event) {
            expect(event.type).toBe('baz');
            expect(event.detail).toBe(32);
        }


        foo.on('bar', onBar);

        foo.bar(payload);
        foo.baz(32);
    });
});
