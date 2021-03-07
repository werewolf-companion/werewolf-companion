module.exports = class Links extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['l', 'invite', 'support', 'server', 'download', 'app', 'android', 'ios']
        })
    }

    async run({ message }) {
        let links = client.constants.links,
            fields = [];

        for (const link of links)
            fields.push([link.title, link.value]);
        return message.send({ message, title: 'Wolvesville Companion Links'}, fields);
    }
}
