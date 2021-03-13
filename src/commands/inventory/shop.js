const shop = require('../../json/shop.json');

module.exports = class Shop extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View all the buyable items from the shop.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            aliases: ['store']
        })
    }

    async run({ message, args, user }) {
        let products = { item: [], lootbox: [] },
            fields = [];

        for (let item of shop)
            products[item.category].push(`**[${item.id}] ${message.emote(item.path)} ${item.name.toTitleCase()} - ${item.price} ${item.currency.toTitleCase()} Each**\n${item.description}`);
        Object.entries(products).forEach(([key, value]) => fields.push([key.toTitleCase(), value.join('\n'), false]))

        return message.send({ message, title: 'Wolvesville Companion Shop', description: `To buy an item, use the \`${message.prefix}buy <item id> [quantity]\`.\nKey: [<id>] <name> - <price> <currency>` }, fields);
    }
}
