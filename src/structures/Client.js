const Discord = require('discord.js'),
    CommandManager = require('../managers/CommandManager'),
    EventManager = require('../managers/EventManager'),
    LocaleManager = require('../managers/LocaleManager'),
    Constants = require('../Constants'),
    { exec } = require('child_process');

module.exports = class Client extends Discord.Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.ready = false;
        this.constants = Constants;
        this.prefix = '*';
        this.eventManager = new EventManager(this);
        this.commandManager = new CommandManager(this);
        this.localeManager = new LocaleManager(this);
    }

    async initialize() {
        require('../extenders/Guild');
        require('../extenders/Message');
        require('../extenders/TextChannel');
        require('../extenders/User');

        this.eventManager.register();
        this.commandManager.register();
        this.localeManager.register();
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
        this.commandManager.unregister();
        this.eventManager.unregister();
        this.destroy();
        exec(`pm2 stop ${process.env.PM_ID}`);
    }

    get logs() {
        return {
            main: this.channels.cache.get('794557549105905694'),
            moderation: this.channels.cache.get('791162066417221662'),
            server: this.channels.cache.get('796738379123392612')
        }
    }
}
