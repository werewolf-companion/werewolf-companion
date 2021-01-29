const ms = require('ms');

module.exports = class GuildCreate extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(guild) {
        await database.create.guild(guild);
        let channel = await guild.channels.cache.find(c =>
            c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES')),
            members = await guild.members.fetch(),
            users = database.users;

        channel?.embed({ title: 'Hello!', description: `Thanks for inviting me!` }, [
            ['Help', `You can use the \`${'*'}help\` to view more information about Werewolf Companion and \`${'*'}commands\` to view all the bots commands.`],
            ['Settings', `This bot has a few settings you can change that will change how it functions within this server, use \`${'*'}settings\` to view them.`]
        ])

        for (let m of members) {
            let user = m[1].user;
            if (!users.has(m[0]) && !user.bot)
                await database.create.user(user);
        }
    }
}
