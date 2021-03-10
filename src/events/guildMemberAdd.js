module.exports = class GuildMemberAdd extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(member) {
        /*
        let user = member.user;
        if (!user.bot) database.create.user(user);
        */
    }
}
