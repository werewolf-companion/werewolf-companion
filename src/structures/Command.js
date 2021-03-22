const ms = require('../../../../modules/enhanced-ms');

module.exports = class Command {
    constructor(command = {}) {
        this.name = command.name.replace('-', ' ').words().join('');
        this.description = command.description;
        this.category = command.category;

        this.aliases = Array.isArray(command.aliases) ? command.aliases : [];
        this.tags = Array.isArray(command.tags) ? command.tags : [];
        this.cooldown =
            typeof command.cooldown === 'string' ? ms(command.cooldown) :
                command.cooldown > 3000 ? command.cooldown : 3000;

        this.usages = command.usages || [null];
        this.examples = command.examples || [null];

        const { user, channel, server } = command?.permissions || { user: null, channel: null, server: null };
        this.permissions = {
            user: Array.isArray(user) ? user : [],
            channel: Array.isArray(channel) ? channel : [],
            server: Array.isArray(server) ? server : []
        }
    }

    async run() {
        terminal.warn(`${this.name} command has no set run function.`);
    }
}