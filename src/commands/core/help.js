const ms = require('../../../../../modules/enhanced-ms');

module.exports = class Help extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Panel containing general information about Wolvesville Companion.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            usages: ['<command name>'],
            examples: ['help', 'work']
        })
    }

    async run({ message, args, user }) {
        if (!args[0]) {
            return message.send({ message, title: 'Wolvesville Companion Help' }, [
                ['About', `Wolvesville Companion is an Android (iOS soon) app and Discord bot made for the players of Wolvesville, by the players. It contains helpful features such as game information, role information, tips & tricks (submitted by players) media links and more. The Discord bot also comes with a few 'fun' features including an economy system.`, false],
                ['Commands', `I have close to 40 commands you can use, to view a list use \`${message.prefix}commands\`.`, false],
                ['Reactions', `Sometimes I will response with a reaction rather than a message, here is what those reactions mean:\n${message.emote('clock')} : This command is on cooldown, slow down.\n${message.emote('missing')} : Missing required inputs.\n${message.emote('forbidden')} : Forbidden, you cannot use this.`, false],
                ['Settings', `I have a few settings you can change, like the prefix. View the settings by using the \`${message.prefix}settings\` command.`, false],
                ['Custom Prefix', 'If you happen to not know what my prefix in a server is, simply ping me and I\'ll reply saying my prefix.', false]
            ])
        } else {
            let command = client.commands.search(args[0].toLowerCase());
            if (!command) return message.send('Could not find a command or what was inputted.');

            message.send({ message, title: message.prefix + command.name, description: command.description }, [
                ['Usage', command.usages.map(u => '`' + message.prefix + command.name + (u ? ' ' + u : '') + '`').join('\n')],
                ['Examples', command.examples.map(e => '`' + message.prefix + command.name + (e ? ' ' + e : '') + '`').join('\n')],
                ['Cooldown', ms(command.cooldown * 1)],
                ['Aliases', command.aliases.length > 0 ? command.aliases.map(a => '`' + a + '`').join(', ') : 'None'],
                ['Needed Permissions',
                    ((command.permissions.user.length > 0 ? '**User**:' + command.permissions.user.map(p => '`' + p + '`') + '\n' : '') +
                        (command.permissions.channel.length > 0 ? '**Channel**:' + command.permissions.channel.map(p => '`' + p + '`') + '\n' : '') +
                        (command.permissions.server.length > 0 ? '**Server**:' + command.permissions.server.map(p => '`' + p + '`') + '\n' : '')) || 'None',
                    false
                ]
            ]);
        }
    }
}
