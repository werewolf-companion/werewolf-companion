module.exports = class GuildMemberAdd extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(member) {
        let user = database.get(member.id, 'user', member.user);
        database.users.math(user.id, '+', 250, 'balance.gold');
        terminal.currency(`${user.tag} (${user.id}) joined Wolvesville Companion and earned 250 gold, they now have ${user.balance.gold + 250}`);
    }
}
