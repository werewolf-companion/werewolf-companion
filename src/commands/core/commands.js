module.exports = class Commands extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['cmd', 'cmds', 'command']
        })
    }

    async run({ message, args, user, guild }) {
        let commands = client.commandManager.commands,
            categories = {},
            fields = [];

        for (let command of commands) {
            if (command.category !== 'staff') {
                if (!categories[command.category]) categories[command.category] = [];
                categories[command.category].push(command.name);
            }
        }

        for (let category of Object.entries(categories)) fields.push([category[0].toTitleCase(), `\`${category[1].join('`, `')}\``]);
        return message.send({ message, title: 'Werewolf Companion Commands' }, fields);
    }
}