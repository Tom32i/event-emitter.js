tom32i-event-emitter.js
=======================

Minimalist JS Event Emitter system

## Install:

    npm install --save tom32i-event-emitter.js

### Import

HTML:

```html
<script src="tom32i-event-emitter.js"></script>
```

ES6:

```javascript
import EventEmitter from 'tom32i-event-emitter';
```

Node:

```javascript
const EventEmitter = require('tom32i-event-emitter');
```

### Usage

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
        this.emit('die', { player: this, foo: 'bar' });
    }
}
```

Listening for events:

```javascript
var player = new Player();

function onDie(event) {
    const { type, detail } = event;
    const { foo, player } = detail;
    // ...
}

// Adding a listener
player.on('die', onDie);  // "on" is an alias of "addEventListener"

// Removing a listener
player.off('die', onDie); // "off" is an alias of "removeEventListener"
```

# Contribute

Clone the repository:

    git clone git@github.com:Tom32i/event-emiter.js.git

Install dev dependencies:

    npm install

Build dist:

    npm build
