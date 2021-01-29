const { resolve } = require('path'),
    { readdirSync, readdir } = require('fs'),
    Manager = require('./Manager'),
    Command = require('../structures/Command');

module.exports = class CommandManager extends Manager {
    constructor(client) {
        super(client);
        this.client = client;
        this.Command = Command;

        this.commands = [];
        this.commandDirectory = resolve(this.srcDirectory, 'commands');
        this.categories = readdirSync(this.commandDirectory);
    }

    register() {
        let i = 0;
        for (var category of this.categories) {
            let categoryPath = resolve(this.commandDirectory, category),
                directoryContent = readdirSync(categoryPath);
            for (var fileName of directoryContent) {
                var commandPath = resolve(categoryPath, fileName),
                    Command = require(commandPath),
                    command;

                try {
                    command = new Command(commandPath);
                } catch (error) { continue };

                this.commands.push(command);
                delete require.cache[commandPath];
                i++;
            }
        }
        return i;
    }

    unregister() {
        while (this.commands.length) this.commands.pop();
    }

    reload() {
        this.unregister();
        return this.register();
    }

    search(query) {
        query = query?.toLowerCase();
        return this.commands.find(c => c.name === query || c.aliases.includes(query));
    }
}
