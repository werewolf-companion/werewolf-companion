const random = require('weighted-random'),
    ms = require('pretty-ms');

module.exports = class Daily extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Claim your daily reward, come back tomorrow and increase your streak, a higher streak means better rewards!',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            cooldown: '23h 45m'
        })
    }

    async run({ message, user }) {
        let lastDaily = user.cooldowns.daily,
            twoDays = 86400000 * 2,
            hasVoted = client.topgg.hasVoted(user.id),
            streak = user.stats.streak.daily;

        if (Date.now() - lastDaily > twoDays) streak = 1;
        else streak++;

        streak = streak + (user.balance.token * 1.5);
        let reward = this.generateReward(streak > 100 ? 100 : streak);

        database.users.math(user.id, '+', reward.amount, `balance.${reward.item}`);
        database.users.set(user.id, streak, 'stats.streak.daily');
        if (hasVoted) database.users.math(user.id, '+', 1, 'balance.rose');
        terminal.currency(`${user.tag} (${user.id}) claimed their daily reward of ${reward.amount} ${reward.item}, they now have ${user.balance[reward.item] + reward.amount}.`);

        return message.send({
            message, title: 'Daily Reward', description: `You claimed your daily reward and got ${reward.amount} ${message.emote(reward.item)}. You're on a ${streak} day streak!\n${(hasVoted ? `You also earned an extra ${message.emote('rose')} for voting for the bot!` : `Want to earn extra rewards? Vote for Wolvesville Companion on top.gg by clicking [here](${client.topgg.voteLink}!`)}`
        })
    }

    /**
            let streak = user.stats.streak.daily;
            if (now - lastDaily > twoDays) {
                database.users.set(user.id, 1, 'stats.streak.daily');
                streak = 1;
            } else database.users.math(user.id, '+', 1, 'stats.streak.daily') && streak++;
    
            streak = streak + (user.balance.token * 1.5);
            let reward = this.generateReward(streak > 100 ? 100 : streak),
                description = '';
    
            if (['gold', 'rose', 'gem'].includes(reward.item)) {
                database.users.math(user.id, '+', reward.amount, `balance.${reward.item}`);
                terminal.currency(`${user.tag} (${user.id}) claimed their daily reward of ${reward.amount} ${reward.item}, they now have ${user.balance[reward.item] + reward.amount}.`);
                description = `You claimed your daily reward and got ${reward.amount} ${message.emote(reward.item)}. You're on a ${streak} day streak.`;
            }
    
            if (hasVoted) database.users.math(user.id, '+', 1, 'balance.rose');
    
            return message.send({ message, title: 'Daily Reward', description: description + `\n${hasVoted ? `You received your bonus ${message.emote('rose')} for voting for top.gg!` : `Vote for Wolvesville Companion [here]()`}`, footer: 'Come back tomorrow to claim your next reward.' });
        
     */

    generateReward(streak) {
        streak = Math.round(streak - 1);
        let items = [
            { item: 'gold', amount: Math.ceil(25 + ((streak / 50) * 100)), weight: 90 },
            { item: 'rose', amount: Math.floor(1 + (streak / 8)), weight: 25 + ((streak - 1) / 2.75) },
            { item: 'gem', amount: Math.floor(1 + (streak / 40)), weight: streak > 30 ? 5 + (streak / 3.25) : 0 }
        ];
        return items[random(items.map(x => x.weight))];
    }
}
