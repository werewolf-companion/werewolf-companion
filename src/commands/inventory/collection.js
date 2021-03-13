module.exports = class Collection extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View your own or someone elses collectables collection.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['collectables', 'collections'],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            usages: [null, '<user>'],
            examples: [null, '394469731085844502', 'Apteryx', '@Apteryx#0001']
        })
    }

    async run({ message, args, user }) {
        if (args[0]) user = database.get(args.join(' '), 'user');
        if (!user || user.kind !== 'user') return message.send('No user was found with what was inputted.');

        let collectables = user.collectables,
            roles = { legendary: [], epic: [], rare: [], uncommon: [], common: [] },
            fields = [];

        Object.entries(collectables).forEach(([key, value]) => {
            for (let role of value) roles[key].push(`${message.emote(role.toCamelCase())} ${role.toTitleCase()}`);
            fields.push([`${key.toTitleCase()} (${value.length}/${collection.collectables[key].length})`, roles[key].join(', ') || 'None', false]);
        })

        return message.send({ message, title: 'Wolvesville Collectables' }, fields);
    }
}


/**

 */