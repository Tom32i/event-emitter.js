event-emitter.js
================

Minimalist JS Event Emitter system

## Install:

    npm install --save tom32i-event-emitter.js


### Import

HTML:

    <script src="tom32i-event-emitter.js"></script>

ES6:

    import EventEmitter from 'tom32-event-emitter.js';

Node:

    const EventEmitter = require('tom32-event-emitter.js');

### Use

Make your prototype extend the EventEmitter.
Emit event with `emit`.

``` javascript
/**
 * Player
 */
class Player extends EventEmitter {
    constructor() {
        super();

        this.alive = true;
    }

    /**
     * Emit and event on death
     */
    die() {
        this.alive = false;

        // Emitting an event:
        this.emit('die', {player: this, foo: 'bar'});
    }
}
```

Listening for events:

``` javascript
var player = new Player();

function onDie (event) {
    const type = event;
    const { foo, player } = event.detail;
    // ...
}

// Adding a listener
player.on('die', onDie);  // "on" is an alias of "addEventListener"

// Removing a listener
player.off('die', onDie); // "off" is an alias of "removeEventListener"
```
