/**
 * const Embed = require('../../structures/Embed');

module.exports = class Leaderboard extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: ms('2 hours'),
            aliases: ['lb']
        })
    }

    async run({ message, args, user }) {
        let usrs = database.users.map(raw => {
            return {
                username: raw.username,
                id: raw.id,
                gold: raw.balance.gold || 0,
                rose: raw.balance.rose || 0,
                gem: raw.balance.gem || 0,
                token: raw.balance.token || 0,
                daily: raw.stats.streak.daily || 0
            }
        }),
            embeds = this.generateEmbeds(message, usrs, user),
            sent = await message.send({ message, title: 'Leaderboards', description: 'React to an emoji to below to select a leaderboard.' });

        await sent.react(message.emote('gold', false, false, true));
        await sent.react(message.emote('gold', false, false, true));
        await sent.react(message.emote('gold', false, false, true));
        await sent.react(message.emote('gold', false, false, true));

        return this.handleReactions(message, sent, 'gold', embeds);
    }

    generateLeaderboard(users, type, user) {
        let top = [];

        for (let usr of users) {
            if (top.length >= 10) break;
            let index = users.indexOf(usr) + 1,
                place = index == 1 ? ":first_place:" : index == 2 ? ":second_place:" : index == 3 ? ":third_place:" : `**${index}.**`;
            top.push(`${place} ${usr.username} - ${usr[type]} ${type.toTitleCase()}`);
        }

        let author = users.find(u => u.id === user.id),
            index = users.indexOf(author) + 1,
            place = index == 1 ? ":first_place:" : index == 2 ? ":second_place:" : index == 3 ? ":third_place:" : `**${index}.**`;
        top.push(`\n${place} ${author.username} (you) - ${author[type]} ${author.toTitleCase()}`);

        return top;
    }

    generateEmbeds(message, users, user) {
        let usrs = {
            gold: profiles.sort((a, b) => b.balance.gold - a.balance.gold),
            rose: profiles.sort((a, b) => b.balance.rose - a.balance.rose),
            gem: profiles.sort((a, b) => b.balance.gem - a.balance.gem),
            token: profiles.sort((a, b) => b.balance.gold - a.balance.gold)
        },
            leaderboards = {
                gold: this.generateLeaderboard(usrs.gold, 'gold', user),
                rose: this.generateLeaderboard(usrs.rose, 'rose', user),
                gem: this.generateLeaderboard(usrs.gem, 'gem', user),
                token: this.generateLeaderboard(usrs.token, 'token', user)
            },
            embeds = {
                gold: new Embed({ message, title: 'Gold Leaderboard', description: leaderboards.gold.join('\n') }),
                rose: new Embed({ message, title: 'Rose Leaderboard', description: leaderboards.rose.join('\n') }),
                gem: new Embed({ message, title: 'Gem Leaderboard', description: leaderboards.gem.join('\n') }),
                token: new Embed({ message, title: 'Token Leaderboard', description: leaderboards.token.join('\n') })
            }

        return embeds;
    }

    async handleReactions(message, sent, type, embeds) {
        if (type) {
            sent.reactions.resolve(message.emotes(type, false, false, true)).users.remove(message.author.id);
            sent.edit(embeds[type]);
        }

        let filter = (r, u) => (
            [emojis.currency.gold, emojis.currency.rose, emojis.currency.gem, emojis.currency.token].includes(r.emoji.id)
            && u.id === message.author.id
        )

        sent.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] }).then(response => {
            let reaction = response.first();
            if (reaction.emoji.id === message.emote('gold', false, false, true)) this.handleReactions(message, sent, 'gold', embeds);
            else if (reaction.emoji.id === message.emote('rose', false, false, true)) this.handleReactions(message, sent, 'rose', embeds);
            else if (reaction.emoji.id === message.emote('gem', false, false, true)) this.handleReactions(message, sent, 'gem', embeds);
            else if (reaction.emoji.id === message.emote('token', false, false, true)) this.handleReactions(message, sent, 'token', embeds);
        })

    }
}
 */