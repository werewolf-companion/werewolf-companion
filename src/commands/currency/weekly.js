const random = require('weighted-random'),
    ms = require('enhanced-ms');

module.exports = class Daily extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Claim your weekly reward, come back next week and increase your streak, a higher streak means better rewards!',
            category: module.filename.split('/').slice(-2)[0],
            tags: [],
            permissions: { channel: ['EMBED_LINKS'] },
            cooldown: '6d 23h 45m'
        })
    }

    async run({ message, user }) {
        let lastWeekly = user.cooldowns.weekly || 0,
            days = ms('8d'),
            hasVoted = await client.topgg.hasVoted(user.id),
            streak = user.stats.streak.weekly;

        if (Date.now() - lastWeekly > days) streak = 1;
        else streak++;
        let streakToSet = streak;

        streak = streak + (user.balance.token * 1.5);
        let reward = this.generateReward(streak > 100 ? 100 : streak);

        database.users.math(user.id, '+', reward.amount, `balance.${reward.item}`);
        database.users.set(user.id, streakToSet, 'stats.streak.weekly');
        terminal.currency(`${user.tag} (${user.id}) claimed their weekly reward of ${reward.amount} ${reward.item}, they now have ${user.balance[reward.item] + reward.amount}.`);

        if (hasVoted) {
            database.users.math(user.id, '+', 5, 'balance.rose');
            terminal.currency(`${user.tag} (${user.id}) claimed thier weekly reward and voted for the bot, they earned 5 roses, they now have ${user.balance.rose + 5}.`)
        }

        return message.send({ message, title: 'Weekly Reward', description: `You claimed your weekly reward and got ${reward.amount} ${message.emote(reward.item)}. You're on a ${streakToSet} week streak!\n${(hasVoted ? `You also earned 5 extra ${message.emote('rose')} for voting for the bot!` : `Want to earn extra rewards? Vote for Wolvesville Companion on top.gg by clicking [here](${client.topgg.voteLink})!`)}` })
    }

    generateReward(streak) {
        streak = Math.round(streak - 1);
        let items = [
            { item: 'gold', amount: Math.ceil(250 + ((streak / 50) * 100)), weight: 90 },
            { item: 'rose', amount: Math.floor(7 + (streak / 8)), weight: 25 + ((streak - 1) / 2.75) },
            { item: 'gem', amount: Math.floor(1 + (streak / 40)), weight: streak > 30 ? 5 + (streak / 3.25) : 0 }
        ];
        return items[random(items.map(x => x.weight))];
    }
}
