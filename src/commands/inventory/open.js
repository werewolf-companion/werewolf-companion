const random = require('weighted-random'),
    Fuse = require('fuse.js'),
    LOOTBOXES = [
        { id: 'l1', gold: { min: 110, max: 140 }, send: { min: 4, max: 6 }, spend: { min: 3, max: 5 }, collectable: { odds: [3, 5, 9, 24, 59] }, gem: { min: 1, max: 1 }, token: { min: 0, max: 0 } },
        { id: 'l2', gold: { min: 225, max: 275 }, send: { min: 10, max: 12 }, spend: { min: 9, max: 12 }, collectable: { odds: [5, 15, 25, 30, 30] }, gem: { min: 1, max: 1 }, token: { min: 0, max: 0 } },
        { id: 'l3', gold: { min: 1100, max: 1500 }, send: { min: 45, max: 55 }, spend: { min: 45, max: 55 }, collectable: { odds: [40, 30, 20, 10, 0] }, gem: { min: 1, max: 2 }, token: { min: 1, max: 1 } },
        { id: 'l4', gold: { min: 2300, max: 2800 }, send: { min: 100, max: 100 }, spend: { min: 100, max: 100 }, collectable: { odds: [90, 9, 1, 0, 0] }, gem: { min: 1, max: 3 }, token: { min: 1, max: 1 } }
    ],
    ODDS = [
        { id: 'l1', odds: [{ name: 'gold', weight: 40 }, { name: 'send', weight: 15 }, { name: 'spend', weight: 20 }, { name: 'collectable', weight: 25 }, { name: 'gem', weight: 1 }, { name: 'token', weight: 0 }] },
        { id: 'l2', odds: [{ name: 'gold', weight: 35 }, { name: 'send', weight: 15 }, { name: 'spend', weight: 20 }, { name: 'collectable', weight: 25 }, { name: 'gem', weight: 3 }, { name: 'token', weight: 0 }] },
        { id: 'l3', odds: [{ name: 'gold', weight: 25 }, { name: 'send', weight: 15 }, { name: 'spend', weight: 20 }, { name: 'collectable', weight: 25 }, { name: 'gem', weight: 7 }, { name: 'token', weight: 1 }] },
        { id: 'l4', odds: [{ name: 'gold', weight: 20 }, { name: 'send', weight: 15 }, { name: 'spend', weight: 20 }, { name: 'collectable', weight: 25 }, { name: 'gem', weight: 10 }, { name: 'token', weight: 5 }] }
    ],
    ROLE_VALUES = {
        legendary: 1000,
        epic: 500,
        rare: 200,
        uncommon: 100,
        common: 50
    }

module.exports = class Open extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Open a lootbox and see whats inside!',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['USE_EXTERNAL_EMOJIS'] },
            tags: [],
            usages: ['<lootbox>'],
            examples: ['l1', 'rlb', 'gem lootbox']
        })
    }

    async run({ message, args, user }) {
        if (!args.length) return message.send(`Missing required input \`lootbox type\`.`)
        let query = args.join(' ').toLowerCase(),
            lootboxes = [
                { keywords: 'l1, lb, gold, gold lootbox', name: 'gold lootbox', id: 'l1', price: 125, currency: 'gold' },
                { keywords: 'l2, rlb, rose, rose lootbox', name: 'rose lootbox', id: 'l2', price: 10, currency: 'rose' },
                { keywords: 'l3, glb, gem, gem lootbox', name: 'gem lootbox', id: 'l3', price: 1, currency: 'gem' },
                { keywords: 'l4, tlb, token, token lootbox', name: 'token lootbox', id: 'l4', price: 1, currency: 'token' }
            ],
            lootbox = new Fuse(lootboxes, { keys: ['keywords'] })
                .search(query)[0]?.item;

        if (!lootbox) return message.send('No lootbox type was found for what was inputted.');
        let inventory = user.inventory;
        if (!inventory[lootbox.id] || inventory[lootbox.id] < 1) return message.send(`You do not have any ${lootbox.name}es to open.`);

        let useRoleTalisman = false,
            trueId = message.emote('true', { id: true }),
            falseId = message.emote('false', { id: true });

        if (inventory['t1']) await message.send(`You have ${inventory['t1']} talisman(s), would you like to use one?`)
            .then(sent => sent.react(trueId) &&
                sent.react(falseId) &&
                sent.awaitReactions((r, u) => u.id === user.id, { max: 1, time: 10000, errors: ['time'] }))
            .then(collected => {
                let reaction = collected.first();

                if (reaction.emoji.id === trueId) useRoleTalisman = true;
                else useRoleTalisman = false;

                reaction.message.delete();
            })

        let itemOdds = ODDS.find(o => o.id === lootbox.id),
            randomItem = useRoleTalisman ? { name: 'collectable' } : itemOdds.odds[random(itemOdds.odds.map(o => o.weight))],
            lootboxType = LOOTBOXES.find(lb => lb.id === lootbox.id)[randomItem.name],
            item = Object.assign(randomItem, lootboxType);

        if (item.name === 'collectable') {
            let { collectable } = collection.randomRole(user, item.odds, useRoleTalisman);
            if (!collectable.role) return message.send('I failed to generate a collectable, this is likely due to you having all the collectables you can from this lootbox or I tired more than 25 times to generate a unique collectable. You have been refunded.');

            let rarity = collectable.rarity,
                role = collectable.role,
                roleValue = ROLE_VALUES[rarity],
                collectables = user.collectables;

            if (!collectables[rarity].includes(role)) {
                collectables[rarity].push(role)
                database.users.set(user.id, Object.merge(user, {
                    collectables: collectables,
                    inventory: { [lootbox.id]: inventory[lootbox.id] - 1, t1: useRoleTalisman ? inventory['t1'] - 1 : inventory['t1'] }
                }))
                terminal.inventory(`${user.tag} (${user.id}) opened a ${lootbox.name} and received the ${role} (${rarity}) collectable.`);
                return message.send(`You opened a ${lootbox.name} and received the ${rarity} ${message.emote(role.toCamelCase())} ${role.toTitleCase()} collectable!`);
            } else {
                database.users.set(user.id, Object.merge(user, {
                    balance: { gold: user.balance.gold + roleValue },
                    inventory: { [lootbox.id]: inventory[lootbox.id] - 1 }
                }))
                terminal.inventory(`${user.tag} (${user.id}) opened a ${lootbox.name} and received the ${role} collectable, they already have this so will instead receive ${roleValue} gold.`);
                return message.send(`You opened a ${lootbox.name} and received the ${rarity} ${message.emote(role.toCamelCase())} ${role.toTitleCase()} collectable, however, you already have this so you will instead receive ${roleValue} ${message.emote('gold')}`);
            }
        } else if (['send', 'spend'].includes(item.name)) {
            let amount = Math.floor(Math.random() * (item.max - item.min) + item.min);

            if (item.name === 'spend') {
                database.users.set(user.id, Object.merge(user, {
                    balance: { rose: user.balance.rose + amount },
                    inventory: { [lootbox.id]: inventory[lootbox.id] - 1 }
                }))
                terminal.inventory(`${user.tag} (${user.id}) opened a ${lootbox.name} and received ${amount} spendable roses.`);
                return message.send(`You opened a ${lootbox.name} and received ${amount} spendable roses.`);
            } else if (item.name === 'send') {
                database.users.set(user.id, Object.merge(user, {
                    inventory: { [lootbox.id]: inventory[lootbox.id] - 1, 'i1': inventory['i1'] + amount }
                }))
                terminal.inventory(`${user.tag} (${user.id}) opened a ${lootbox.name} and received ${amount} sendable roses.`);
                return message.send(`You opened a ${lootbox.name} and received ${amount} sendable roses.`);
            }
        } else if (['gold', 'gem', 'token'].includes(item.name)) {
            let amount = Math.floor(Math.random() * (item.max - item.min) + item.min);
            database.users.set(user.id, Object.merge(user, {
                balance: { [item.name]: user.balance[item.name] + amount },
                inventory: { [lootbox.id]: inventory[lootbox.id] - 1 }
            }))
            terminal.inventory(`${user.tag} (${user.id}) opened a ${lootbox.name} and receive the ${amount} ${item.name}.`);
            return message.send(`You opened a ${lootbox.name} and received ${amount} ${message.emote(item.name)}`);
        }
    }
}
