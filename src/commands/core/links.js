module.exports = class Links extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Important Wolvesville Companion links.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['invite', 'support', 'server', 'download', 'app', 'android', 'ios', 'topgg', 'vote']
        })
    }

    async run({ message }) {
        let companionLinks = client.constants.links.companion,
            { link, voteLink } = client.topgg,
            links = [
                { title: 'Website', value: `Website for Wolvesville Companion. Providing more information about the bot, app and API.\n[**VISIT**](${companionLinks.site})` },
                { title: 'Server', value: `Invite link for the Discord support server, join if you need help or just want to chat with other users.\n[**JOIN**](${companionLinks.server})` },
                { title: 'App', value: `Android app version of the Wolvesville Companion app, even containing features which this bot does not have. iOS version is planned.\n[**DOWNLOAD**](${companionLinks.app})` },
                { title: 'Bot', value: `Invite link for the Discord bot, which you can iuse to add this bot to your own server.\n[**INVITE**](${companionLinks.bot})` },
                { title: 'Top.gg', value: `Vote for Wolvesville Companion on top.gg to earn extra rewards when using the daily command.\n[**VISIT**](${link})\n[**VOTE**](${voteLink})` }
            ],
            fields = [];

        for (const link of links)
            fields.push([link.title, link.value]);
        return message.send({ message, title: 'Wolvesville Companion Links' }, fields);
    }
}
