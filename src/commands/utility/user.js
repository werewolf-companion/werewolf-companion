module.exports = class User extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ui']
        })
    }

    async run({ message, args, user }) {
        if (args[0]) {
            let target = database.get(args.join(' '), 'user');
            if (!target) return message.send('No user was found with what was inputted.');
            user = target;
        }

        return message.send(`Find ${message.author.id !== user.id ? `${user.tag}'s` : 'your'} user information here: **COMING SOON**`);
    }
}