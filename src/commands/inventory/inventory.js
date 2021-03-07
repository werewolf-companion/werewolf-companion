const shop = require('../../json/shop.json');

module.exports = class Inventory extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['inv'],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] }
        })
    }

    async run({ message, args, user }) {
        if (args[0]) user = database.get(args.join(' '), 'user');
        if (!user || user.kind !== 'user') return message.send('No user was found with what was inputted.');

        let inventory = user.inventory,
            products = { item: [], lootbox: [] };

        Object.entries(inventory).forEach(([key, value]) => {
            let item = shop.find(i => i.id === key);
            if (value > 0) products[item.category].push(`[${key}] ${value} ${item.name.toTitleCase()} ${message.emote(item.path)}`);
        });

        let fields = [];
        Object.entries(products).forEach(([key, value]) => value.length ? fields.push([key.toTitleCase(), value.join('\n'), false]) : undefined);
        return message.send({ message, title: `${user.tag}'s Inventory`, description: `To send a rose, use \`${message.prefix}rose <user> [quantity]\`.\nTo open a lootbox use \`${message.prefix}open <lootbox type>\`.` }, fields);
    }
}
