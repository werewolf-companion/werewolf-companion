module.exports = class GuildMemberRemove extends client.events.class {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(member) {
        if (member.guild.id === client.constants.ids.guilds.support) {
            let user = database.get(member.id, 'user', member.user);
            database.users.math(user.id, '-', 250, 'balance.gold');
            terminal.currency(`${user.tag} (${user.id}) left Wolvesville Companion and lost 250 gold, they now have ${user.balance.gold - 250}.`);
        }
    }
}