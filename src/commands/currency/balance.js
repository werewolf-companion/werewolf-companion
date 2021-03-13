module.exports = class Balance extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Check your own or someone elses gold, rose, gem and token balance.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            aliases: ['bal'],
            usages: [null, '<user>'],
            examples: [null, '394469731085844502', 'Apteryx', '@Apteryx#0001']
        })
    }

    async run({ message, args, user }) {
        if (args.length) user = database.get(args.join(' '), 'user');
        if (!user || user.kind !== 'user') return message.send('No user was found with what was inputted.');

        let balance = user.balance;
        return message.send({ message, title: `${user.tag}'s Balance`, description: `${message.emote('gold')} ${balance.gold}\n${message.emote('rose')} ${balance.rose}\n${message.emote('gem')} ${balance.gem}\n${message.emote('token')} ${balance.token}` })
    }
}
