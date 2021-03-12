const { resolve } = require('path'),
    { readdirSync } = require('fs'),
    Manager = require('./Manager'),
    Event = require('../structures/Event');

module.exports = class EventManager extends Manager {
    constructor() {
        super();
        this.class = Event;

        this._ = [];
        this.eventDirectory = resolve(this.srcDirectory, 'events');
    }

    register() {
        let i = 0,
            directoryContent = readdirSync(this.eventDirectory);
        for (var fileName of directoryContent) {
            var eventPath = resolve(this.eventDirectory, fileName),
                Event = require(eventPath),
                event;

            try {
                event = new Event(eventPath);
            } catch (error) { continue };

            this._.push(event);
            delete require.cache[eventPath];
            client.on(event.name, event.handle.bind({ client: client, name: event.name }));
            i++;
        }
        return i;
    }

    unregister() {
        client.removeAllListeners();
        while (this._.length) this._.pop();
    }

    reload() {
        this.unregister();
        return this.register();
    }
}
