const h = {
    'hello-world': {
        title: 'Hello',
        description: 'World'
    }
}

module.exports = class H extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] }
        })
    }

    async run({ message, args, user }) {
        if (!args[0]) return;
        const { title, description } = h[args[0].toLowerCase()] || {};
        if (title) {
            message.delete({ timeout: 1 });
            return message.send({ title: title, description: description });
        } else return;
    }
}