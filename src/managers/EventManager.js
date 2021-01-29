const { resolve } = require('path'),
    { readdirSync } = require('fs'),
    Manager = require('./Manager'),
    Event = require('../structures/Event');

module.exports = class EventManager extends Manager {
    constructor(client) {
        super(client);
        this.client = client;
        this.Event = Event;

        this.events = [];
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

            this.events.push(event);
            delete require.cache[eventPath];
            this.client.on(event.name, event.handle.bind({ client: this.client, name: event.name }));
            i++;
        }
        return i;
    }

    unregister() {
        this.client.removeAllListeners();
        while (this.events.length) this.events.pop();
    }

    reload() {
        this.unregister();
        return this.register();
    }
}
