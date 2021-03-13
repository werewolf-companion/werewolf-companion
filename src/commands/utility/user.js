module.exports = class User extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View information about yourself or someone else.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ui', 'profile'],
            usages: [null, '<user>'],
            examples: [null, '394469731085844502', 'Apteryx', '@Apteryx#0001']
        })
    }

    async run({ message, args, user }) {
        if (args[0]) {
            let target = database.get(args.join(' '), 'user');
            if (!target) return message.send('No user was found with what was inputted.');
            user = target;
        }

        return message.send(`Find ${message.author.id !== user.id ? `${user.tag}'s` : 'your'} user information here: ${client.constants.links.companion.site}/user/${user.id}`);
    }
}