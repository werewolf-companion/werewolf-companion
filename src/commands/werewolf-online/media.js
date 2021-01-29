module.exports = class Media extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['med']
        })
    }

    async run({ message, args, user }) {
        let links = message._('media.links'),
            fields = [];

        for (const link of links) fields.push([link.title, link.value]);
        message.send({ message, title: message._('media.title')}, fields);
    }
}
