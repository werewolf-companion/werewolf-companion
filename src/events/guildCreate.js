const ms = require('enhanced-ms');

module.exports = class GuildCreate extends client.events.class {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(guild) {
        /*
        await database.create.guild(guild);
        
        if (guild.memberCount < 10000) {
            let members = await guild.members.fetch(),
                users = database.users;
            
            for (let m of members) {
                let user = m[1].user;
                if (!users.has(user.id) && !user.bot)
                    await database.create.user(user);
            }
        }
        */
    }
}
