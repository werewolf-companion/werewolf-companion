const Embed = require('../../structures/Embed'),
    ms = require('pretty-ms');

module.exports = class Tips extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'] },
            aliases: [],
            cooldown: 60000,
            tags: []
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
            roles = Object.values(message._('roles'));

        for (let category of ['village', 'werewolves', 'solo']) {
            let filteredRoles = roles.filter(t => t.team.toLowerCase().includes(category));
            for (let i = 0; i < filteredRoles.length; i += 7) {
                let sevenRoles = filteredRoles.slice(i, i + 7),
                    roleFields = [];
                for (let role of sevenRoles)
                    roleFields.push([role.name, message._('role.roleInformation', role), false]);
                pages[category].push(new Embed({ message, title: message._(category) }, roleFields));
            }
        }

        return pages;
    }

    resetReactions(message, sent, filter, pages) {
        sent.reactions.removeAll();

        sent.edit(new Embed({ message, title: message._('role.s'), description: message._('tip.reactBelow') }))
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
