const random = require('weighted-random'),
    ms = require('pretty-ms');

module.exports = class Daily extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: 85500000,
            aliases: []
        })
    }

    async run({ message, user }) {
        let now = Date.now(),
            lastDaily = user.cooldowns.daily,
            twoDay = 86400000 * 2;

        let streak = user.stats.streak.daily;
        if (now - lastDaily > twoDay) {
            database.users.set(user.id, 1, 'stats.streak.daily');
            streak = 1;
        } else database.users.math(user.id, '+', 1, 'stats.streak.daily')
            && streak++;

        streak = streak + (user.balance.token * 1.5);
        let reward = this.generateReward(streak > 100 ? 100 : streak),
            description = new String('');

        if (['gold', 'rose', 'gem'].includes(reward.item)) {
            database.users.math(user.id, '+', reward.amount, `balance.${reward.item}`);
            terminal.currency(`${user.tag} (${user.id}) claimed their daily reward of ${reward.amount} ${reward.item}, they now have ${user.balance[reward.item] + reward.amount}.`);
            description = `You claimed your daily reward and got ${reward.amount} ${message.emote(reward.item)}. You're on a ${streak} day streak.`;
        }

        return message.send({ message, title: 'Daily Reward', description, footer: 'Come back tomorrow to claim your next reward.' });
    }

    generateReward(streak) {
        streak = Math.round(streak - 1);
        let items = [
            { item: 'gold', amount: Math.ceil(25 + ((streak / 50) * 100)), weight: 100 },
            { item: 'rose', amount: Math.floor(1 + (streak / 8)), weight: 25 + ((streak - 1) / 2.75) },
            { item: 'gem', amount: Math.floor(1 + (streak / 40)), weight: streak > 30 ? 5 + (streak / 3.25) : 0 }
        ];
        return items[random(items.map(x => x.weight))];
    }
}
