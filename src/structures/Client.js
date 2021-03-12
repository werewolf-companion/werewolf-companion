const Discord = require('discord.js'),
    CommandManager = require('../managers/CommandManager'),
    EventManager = require('../managers/EventManager'),
    LocaleManager = require('../managers/LocaleManager'),
    TopGGManager = require('../managers/TopGGManager'),

    Constants = require('../Constants'),
    { exec } = require('child_process'),
    path = require('path');

module.exports = class Client extends Discord.Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.ready = false;
        this.constants = Constants;
        this.prefix = '*';

        this.events = new EventManager(this);
        this.commands = new CommandManager(this);
        this.locales = new LocaleManager(this);
        this.topGG = new TopGGManager(this);

        delete require.cache[path.resolve('../Constants')];
    }

    async initialize() {
        require('../extenders/Guild');
        require('../extenders/Message');
        require('../extenders/TextChannel');
        require('../extenders/User');

        this.events.register();
        this.commands.register();
        this.locales.register();

        await this.login(process.env.DISCORD_TOKEN);
        this.ready = true;
        console.log('Discord client has been initialized.');
    }

    emote(name, { a = false, d = false, id = false } = {}) {
        let value = Object.find(client.constants.emotes, name);
        if (!value) return `:${name}:`;
        else if ([17, 18, 19].includes(value.length))
            return id ? value : `<${a ? 'a' : ''}:${d ? 'e' : name.toCamelCase()}:${value}>`;
        else return value;
    }

    shutdown() {
        this.commands.unregister();
        this.events.unregister();
        this.destroy();
        exec(`pm2 stop ${process.env.PM_ID}`);
    }

    reload() {
        let commands = this.commands.reload(),
            events = this.events.reload(),
            locales = this.locales.reload();
        //this.constants = require('../Constants');

        //delete require.cache[path.resolve('../Constants')];
        return { commands, events, locales };
    }

    get logs() {
        return {
            main: this.channels.cache.get('794557549105905694'),
            moderation: this.channels.cache.get('791162066417221662'),
            server: this.channels.cache.get('796738379123392612')
        }
    }
}
