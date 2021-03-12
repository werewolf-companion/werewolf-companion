const VARIBALES = [
    { name: 'gold', category: 'balance', database: 'users', path: 'balance.gold' },
    { name: 'rose', category: 'balance', database: 'users', path: 'balance.rose' },
    { name: 'gem', category: 'balance', database: 'users', path: 'balance.gem' },
    { name: 'token', category: 'balance', database: 'users', path: 'balance.token' },

    { name: 'gold', category: 'lootbox', database: 'users', path: 'inventory.l1' },
    { name: 'rose', category: 'lootbox', database: 'users', path: 'inventory.l2' },
    { name: 'gem', category: 'lootbox', database: 'users', path: 'inventory.l3' },
    { name: 'token', category: 'lootbox', database: 'users', path: 'inventory.l4' },

    { name: 'rose', category: 'item', database: 'users', path: 'inventory.i1' }
]

module.exports = class Edit extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ed'],
            tags: ['staff-4', 'args'],
            hidden: true
        })
    }

    async run({ message, args, user }, target = undefined) {
        if (args[0]) target = database.get(args[0], 'user');
        if (!target) return message.send('No user or guild was found with what was inputted.');

        let category = VARIBALES.filter(v => v.category === args[1]?.toLowerCase());
        if (!category.length) return message.send('Inputted category, if any, is invalid.');

        let variable = VARIBALES.find(v => v.name === args[2]?.toLowerCase() && v.category === args[1]?.toLowerCase());
        if (!variable) return message.send('Inputted variable, if any, is invalid.');

        let value = args[3];
        if (!value) return message.send('You must include a value to be set.');

        await database[variable.database].set(target.id, isNaN(+value) ? value : +value, variable.path);
        terminal.admin(`${user.tag} (${user.id}) set ${target.tag}'s (${target.id}) ${variable.name} ${variable.category} in the ${variable.database} database to ${value}.`);
        return message.send(`Successfully set ${target.tag}'s ${variable.name} to ${value}.`);
    }
}
