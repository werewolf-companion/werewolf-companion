const Fuse = require('fuse.js');

module.exports = class Role extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            aliases: ['r'],
            tags: ['args']
        })
    }

    async run({ message, args, user }) {
        let query = args.join(' ').toLowerCase(),
            roles = Object.values(message._('roles')),
            tips = message._('tips'),
            role = roles.find(r => r.name.toLowerCase() === query) ||
                roles.find(r => r.abbreviations.toLowerCase().split(', ').includes(query)) ||
                new Fuse(roles, { keys: ['name', 'abbreviations', 'team', 'aura'] })
                    .search(query)[0]?.item,
            tip = tips.find(t => t.role.includes(role.name));

        if (!role) message.send(message._('roleNotFound'));
        else message.send({ message, title: `${message.emote(role.name.toCamelCase())} ${role.name}`, description: role.description }, [
            [message._('team'), role.team],
            [message._('aura'), role.aura],
            [message._('abbreviations'), role.abbreviations],
            [message._('tip.tip'), `${tip.content}\n*${tip.credit}*`]
        ])
    }
}
