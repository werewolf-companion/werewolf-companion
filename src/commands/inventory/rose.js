const shop = require('../../json/shop.json');

module.exports = class Rose extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: [],
            tags: ['args'],
            permissions: { channel: ['USE_EXTERNAL_EMOJIS'] }
        })
    }

    async run({ message, args, user }) {
        let inventory = user.inventory,
            quantity = args.length > 1 && Number(args.last()) ? Number(args.pop()) : 1;
        if (inventory['i1'] < quantity) return message.send(`You do not have enough roses to give!`);

        let target = database.get(args.join(' '), 'user');
        if (!target) return message.send('No user was found for what was inputted.');
        if (target.id === user.id) return message.send('You cannot send yourself a rose!');

        database.users.set(user.id, Object.merge(user, {
            stats: { rose: { sent: user.stats.rose.sent + quantity }},
            inventory: { 'i1': inventory['i1'] - quantity }
        }))
        database.users.set(target.id, Object.merge(target, {
            stats: { rose: { received: target.stats.rose.received + quantity }},
            balance: { rose: target.balance.rose + quantity }
        }))

        terminal.inventory(`${user.tag} (${user.id}) sent ${target.tag} (${target.id}) ${quantity} rose(s).`);
        return message.send(`You successfully sent ${quantity} ${message.emote('rose')} to ${target.tag}.`);
    }



}
