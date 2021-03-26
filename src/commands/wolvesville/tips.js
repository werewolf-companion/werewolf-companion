const Embed = require('../../structures/Embed'),
    ms = require('enhanced-ms');

module.exports = class Tips extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Interactive menu, containing a ton of tip and tricks for Wolvesville.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'] },
            aliases: ['tricks'],
            cooldown: '1m'
        })
    }

    async run({ message, args, user }) {
        let sent = await message.send(message._('loading')),
            pages = this.generatePages(message),
            teamEmotes = [
                message.emote('villager', { id: true }),
                message.emote('werewolf', { id: true }),
                message.emote('headhunter', { id: true }),
                message.emote('false', { id: false })
            ],
            filter = (r, u) => {
                let emotes = ["⬅️", "➡️", "◀️", ...teamEmotes];
                return (emotes.includes(r.emoji.id) || emotes.includes(r.emoji.name))
                    && u.id === user.id;
            }

        this.resetReactions(message, sent, filter, pages);
    }

    generatePages(message) {
        let pages = { village: [], werewolves: [], solo: [] },
            tips = message._('tips');

        for (let category of ['village', 'werewolves', 'solo']) {
            let tricks = tips.filter(t => t.team.toLowerCase().includes(category));
            for (let i = 0; i < tricks.length; i += 7) {
                let sevenTips = tricks.slice(i, i + 7),
                    tipFields = [];
                for (let trick of sevenTips)
                    tipFields.push([trick.role.join(', '), `${trick.content}\n*${trick.credit}*`, false]);
                pages[category].push(new Embed({ message, title: message._(category) }, tipFields));
            }
        }

        return pages;
    }

    resetReactions(message, sent, filter, pages) {
        sent.reactions.removeAll();

        sent.edit(new Embed({ message, title: message._('tip.sAndTricks'), description: message._('tip.reactBelow') }))
            .then(sent => {
                let villageId = message.emote('villager', { id: true }),
                    werewolvesId = message.emote('werewolf', { id: true }),
                    soloId = message.emote('headhunter', { id: true }),
                    falseId = message.emote('false', { id: true });

                for (let id of [villageId, werewolvesId, soloId, falseId]) sent.react(id);
                sent.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        let reaction = collected.first();

                        if (reaction.emoji.id === falseId) sent.reactions.removeAll();
                        else if (reaction.emoji.id === villageId) this.goToPage(message, sent, filter, 'village', pages, 1);
                        else if (reaction.emoji.id === werewolvesId) this.goToPage(message, sent, filter, 'verewolves', pages, 1);
                        else if (reaction.emoji.id === soloId) this.goToPage(message, sent, filter, 'solo', pages, 1);
                    }).catch(error => {
                        sent.edit(new Embed({ message, title: message._('timedOut'), description: message._('noReactionsInTime') }));
                        sent.reactions.removeAll();
                    })
            })
    }

    async goToPage(message, sent, filter, category, pages, pageNumber) {
        let teamPages = pages[category],
            multiplePages = teamPages.length > 1;

        if (pageNumber > teamPages.length) pageNumber = 1;
        else if (pageNumber < 1) page = teamPages.length;

        sent.edit(teamPages[pageNumber - 1]);
        sent.reactions.removeAll();
        if (multiplePages) sent.react("⬅️") && sent.react("➡️");
        sent.react("◀️") && sent.react(message.emote('false', { id: true }));

        sent.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
            .then(collected => {
                let reaction = collected.first();

                if (reaction.emoji.name === "◀️") this.resetReactions(message, sent, filter, pages);
                else if (reaction.emoji.id === message.emote('false', { id: true })) sent.reactions.removeAll();
                else if (multiplePages && reaction.emoji.name === "➡️") this.goToPage(message, sent, filter, category, pages, pageNumber + 1);
                else if (multiplePages && reaction.emoji.name === "⬅️") this.goToPage(message, sent, filter, category, pages, pageNumber - 1);
            }).catch(error => {
                sent.reactions.removeAll();
            })
    }
}
