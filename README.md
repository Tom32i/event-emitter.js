tom32i-event-emitter.js
=======================

Minimalist JS Event Emitter system

## Install:

    npm install tom32i-event-emitter.js

### Import

HTML:

```html
<script src="tom32i-event-emitter.js"></script>
```

ES modules:

```javascript
import EventEmitter from 'tom32i-event-emitter.js';
```

CommonJs modules:

```javascript
const EventEmitter = require('tom32i-event-emitter.js');
```

### Usage

Make your prototype extend the EventEmitter.

Emit event with the `emit` method.

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

Listening for events with `on` / `off`:

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

### Launch the dev server

    make start

Go to http://localhost:8080

### Code quality

Linting:

    make lint

Run tests:

    make test
