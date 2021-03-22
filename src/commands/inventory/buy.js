module.exports = class Buy extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Purchase an item from the shop.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['USE_EXTERNAL_EMOJIS'] },
            usages: ['<item id> [quanity]'],
            examples: ['l1', 'i1 3']
        })
    }

    async run({ message, args, user }) {
        if (!args.length) return message.send(`Missing required input \`item id\`.\nTo buy an item use \`${message.prefix}buy <item id> [quantity]\`. View what you can buy using \`${message.prefix}shop\`.`)
        let itemId = args[0].toLowerCase(),
            quantity = Number(args[1]) > 1 && args[1] != 'Infinity' ? Math.ceil(args[1]) : 1,
            balance = user.balance,
            inventory = user.inventory;

        const shop = client.constants.shop;
        let item = shop.find(i => i.id === itemId);
        if (!item) return message.send(`No item was found for what was inputted.`);

        let emote = message.emote(item.currency);
        if (balance[item.currency] < item.price * quantity) return message.send(`You do not have enough ${item.currency} to buy ${item.name}. You need ${item.price * quantity} ${emote} but only have ${balance[item.currency]} ${emote}.`);

        database.users.set(user.id, Object.merge(user, {
            balance: { [item.currency]: balance[item.currency] - item.price * quantity },
            inventory: { [item.id]: (inventory[item.id] || 0) + quantity }
        }))

        terminal.inventory(`${user.tag} (${user.id}) purchased ${quantity} ${item.name} for ${item.price * quantity} ${item.currency}.`);
        return message.send(`You have successfully purchased ${quantity} ${message.emote(item.path)}.`)
    }
}
