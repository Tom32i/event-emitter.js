/**
 * Event Emitter
 */
function EventEmitter ()
{
    this._events = {};
}

/**
 * Emit a new event
 *
 * @param {String} type
 * @param {Object} data
 */
EventEmitter.prototype.emit = function(name, data)
{
    if (typeof(this._events[name]) === 'undefined') {
        return;
    }

    var callbacks = this._events[name],
        length = callbacks.length,
        event = {type: name, detail: data};

    for (var i = 0; i < length; i++) {
        callbacks[i](event);
    }
};

/**
 * Add a listener
 *
 * @param {String} name
 * @param {Function} callback
 */
EventEmitter.prototype.addEventListener = function(name, callback)
{
    if (typeof(this._events[name]) === 'undefined') {
        this._events[name] = [];
    }

    if (this._events[name].indexOf(callback) < 0) {
        this._events[name].push(callback);
    }
};

/**
 * Remove a listener
 *
 * @param {String} name
 * @param {Function} callback
 */
EventEmitter.prototype.removeEventListener = function(name, callback)
{
    if (typeof(this._events[name]) === 'undefined') {
        return;
    }

    var callbacks = this._events[name],
        index = callbacks.indexOf(callback);

    if (index >= 0) {
        callbacks.splice(index, 1);
    }

    if (!callbacks.length) {
        delete this._events[name];
    }
};

/**
 * On alias
 */
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;

/**
 * Off alias
 */
EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;
