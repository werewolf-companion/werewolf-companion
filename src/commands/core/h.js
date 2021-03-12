const h = {
    rose: {
        title: 'Sendable & Spendable Roses',
        description: 'There are two types of roses, sendable and spendable. One being an item and the other being a currency.\nSendable roses can be bought for 25 gold by using `{{prefix}}buy i1`, you can then send them to other users using `{{prefix}}rose @user`.\nSpendable roses are roses that you are sent and can be used to purchase items from the shop.'
    }
}

module.exports = class H extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] }
        })
    }

    async run({ message, args, user }) {
        if (args[0] === 'all') return message.send({ message, title: 'Help Commands', description: Object.entries(h).map(a => `\`${a[0]}\``).join('\n')});
        else {
            const { title, description } = h[args[0]?.toLowerCase()] || {};
            if (title) {
                message.delete();
                return message.send({ title, description: description.replace(/{{prefix}}/gi, message.prefix) });
            } else return;
        }
    }
}