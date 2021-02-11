module.exports = class Help extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] }
        })
    }

    async run({ message, args, user }) {
        return message.send({ message, title: 'Werewolf Companion Help' }, [
            ['About', `Werewolf Companion is an Android (iOS soon) app and Discord bot made for the players of Werewolf Online, by the players. It contains helpful features such as game information, role information, tips & tricks (submitted by players) media links and more. The Discord bot also comes with a few 'fun' features including an economy system.`],
            ['Reactions', `Sometimes the bot will response with a reaction rather than a message, here is what those reactions mean;
            ${message.emote('clock')} : You are being rate limited.
            ${message.emote('missing')} : Missing required arguments.
            ${message.emote('forbidden')} : Forbidden, you cannot use this.`],
            ['Commands', `To view a list of all the bots commands, use \`${message.prefix}commands\`.`]
        ])
    }
}
