event-emitter.js
================

Minimalist JS Event Emitter system

## Install:

    npm install --save tom32i-event-emitter.js

or

    bower install --save tom32i-event-emitter.js

## Usage:

Make your prototype extend the EventEmitter:

``` javascript
/**
 * Player
 */
function Player()
{
    // Call parent constructor:
    EventEmitter.call(this);

    this.alive = true;
}

// Extends EventEmitter:
Player.prototype = Object.create(EventEmitter.prototype);
Player.prototype.constructor = Player;
```

Emitting events:

``` javascript
/**
 * Player die
 */
Player.prototype.die = function ()
{
    this.alive = false;

    // Emitting an event:
    this.emit('die', {player: this, foo: 'bar'});
}
```

Listening for events:

``` javascript
var player = new Player();

function onDie (event) {
    var foo    = event.detail.foo,
        player = event.detail.player;
    // ...
}

// Adding a listener
player.on('die', onDie);  // "on" is an alias of "addEventListener"

// Removing a listener
player.off('die', onDie); // "off" is an alias of "removeEventListener"
```
