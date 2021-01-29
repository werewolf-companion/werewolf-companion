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
            sideServer = database.sideServers.get(query) || //id
                database.sideServers.find(ss => ss.name?.toLowerCase() === query || //name
                    ss.invite.code.toLowerCase() === query); //invite

        if (!sideServer) return message.send('No side server was found with what was inputted.');
        else return message.send({ message, title: sideServer.name, description: `${sideServer.content ? sideServer.content + '\n' : ''}[**JOIN**](${process.env.WEBSITE_DOMAIN}/sideserver/${sideServer.invite.code}?src=command.sideserver)` });
    }
}
