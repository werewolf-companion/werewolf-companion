module.exports = class Help extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] }
        })
    }

    async run({ message, args, user }) {
        return message.send({ message, title: 'Werewolves Companion Help' }, [
            ['About', `Wolvesville Companion is an Android (iOS soon) app and Discord bot made for the players of Werewolf Online, by the players. It contains helpful features such as game information, role information, tips & tricks (submitted by players) media links and more. The Discord bot also comes with a few 'fun' features including an economy system.`, false],
            ['Commands', `I have close to 40 commands you can use, to view a list use \`${message.prefix}commands\`.`, false],
            ['Reactions', `Sometimes I will response with a reaction rather than a message, here is what those reactions mean:\n${message.emote('clock')} : This command is on cooldown, slow down.\n${message.emote('missing')} : Missing required inputs.\n${message.emote('forbidden')} : Forbidden, you cannot use this.`, false],
            ['Settings', `I have a few settings you can change, like the prefix. View the settings by using the \`${message.prefix}settings\` command.`, false],
            ['Custom Prefix', 'If you happen to not know what my prefix in a server is, simply ping me and I\'ll saying my prefix.', false]
        ])
    }
}
