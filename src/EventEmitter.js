/**
 * Event Emitter
 */
class EventEmitter {
    /**
     * Constructor
     */
    constructor() {
        this._events = {};

        // Aliases
        this.on = this.addEventListener;
        this.off = this.removeEventListener;
    }

    /**
     * Emit a new event
     *
     * @param {String} type
     * @param {...} arguments
     */
    emit(name) {
        if (!this._events.hasOwnProperty(name)) {
            return;
        }

        const callbacks = this._events[name];
        const args = Array.prototype.slice.call(arguments, 1);

        for (let length = callbacks.length, i = 0; i < length; i++) {
            this.handle(callbacks[i], args);
        }
    }

    /**
     * Call the given callback
     *
     * @param {Function} callback
     * @param {Array} args
     */
    handle(callback, args = []) {
        callback(...args);
    }

    /**
     * Add a listener
     *
     * @param {String} name
     * @param {Function} callback
     */
    addEventListener(name, callback) {
        if (!this._events.hasOwnProperty(name)) {
            this._events[name] = [];
        }

        if (this._events[name].indexOf(callback) < 0) {
            this._events[name].push(callback);
        }
    }

    /**
     * Remove a listener
     *
     * @param {String} name
     * @param {Function} callback
     */
    removeEventListener(name, callback) {
        if (!this._events.hasOwnProperty(name)) {
            return;
        }

        const callbacks = this._events[name];
        const index = callbacks.indexOf(callback);

        if (index >= 0) {
            callbacks.splice(index, 1);
        }

        if (callbacks.length === 0) {
            delete this._events[name];
        }
    }
}

export default EventEmitter;
