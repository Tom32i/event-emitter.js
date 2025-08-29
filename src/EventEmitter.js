/**
 * Event
 */
class Event {
    constructor(type, detail) {
        this.type = type;
        this.detail = detail;
    }
}

/**
 * Event Emitter
 */
export default class EventEmitter {
    #events = new Map();

    constructor() {
        // Binding
        this.addEventListener = this.addEventListener.bind(this);
        this.removeEventListener = this.removeEventListener.bind(this);

        // Aliases
        this.on = this.addEventListener;
        this.off = this.removeEventListener;
    }

    /**
     * Emit a new event
     *
     * @param {String} name
     * @param {Object} data
     */
    emit(name, data) {
        if (!this.#events.has(name)) {
            return;
        }

        const callbacks = this.#events.get(name);
        const event = new Event(name, data);
        const { length } = callbacks;

        for (let i = 0; i < length; i++) {
            callbacks[i](event);
        }
    }

    /**
     * Add a listener
     *
     * @param {String} name
     * @param {Function} callback
     */
    addEventListener(name, callback) {
        const callbacks = this.#getCallbacks(name);

        if (callbacks.indexOf(callback) < 0) {
            callbacks.push(callback);
        }
    }

    /**
     * Remove a listener
     *
     * @param {String} name
     * @param {Function} callback
     */
    removeEventListener(name, callback) {
        if (!this.#events.has(name)) {
            return;
        }

        const callbacks = this.#events.get(name);
        const index = callbacks.indexOf(callback);

        if (index >= 0) {
            callbacks.splice(index, 1);
        }
    }

    #getCallbacks(name) {
        if (this.#events.has(name)) {
            return this.#events.get(name);
        }

        const callbacks = [];

        this.#events.set(name, callbacks);

        return callbacks;
    }
}
