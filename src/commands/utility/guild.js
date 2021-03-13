module.exports = class Guild extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'COMING SOON',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['gi']
        })
    }

    async run({ message, args, guild }) {
        if (args[0]) {
            let target = database.get(args.join(' '), 'guild');
            if (!target) return message.send('No guild was found with what was inputted.');
            guild = target;
        }

        return message.send(`Find ${message.guild.id !== guild.id ? `${guild.name}'s guild` : 'this guilds'} information here: **COMING SOON**`);
    }
}
