import EventEmitter from './dist/tom32i-event-emitter.js';

class Engine extends EventEmitter {
    constructor() {
        super();
        this.started = false;
    }

    start() {
        if (!this.started) {
            this.started = true;
            this.emit('status-change', {
                status: 'started',
                started: this.started
            });
        }
    }

    stop() {
        if (this.started) {
            this.started = false;
            this.emit('status-change', {
                status: 'stoped',
                started: this.started
            });
        }
    }
}

const engine = new Engine();

function onStatusChange(event) {
    const { type, detail } = event;
    console.log('[onStatusChange] event type "%s", details: %o', type, detail);
}

engine.addEventListener('status-change', onStatusChange);

engine.start();

setTimeout(() => engine.stop(), 1000);
