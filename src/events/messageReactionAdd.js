const Embed = require("../structures/Embed"),
    TIERS = require('../json/tiers.json');

module.exports = class MessageReactionAdd extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(reaction, user) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.message.channel.id === client.constants.ids.channels.requests && user.id !== client.user.id) {
            let emoteId = reaction.emoji.id,
                trueId = client.emote('true', { id: true }),
                falseId = client.emote('false', { id: true }),
                partnerId = reaction.message.content.split(' ')[0],
                guild = database.get(partnerId, 'guild'),
                partnership = guild.partnership;

            if (!partnership) return;
            else if (emoteId === trueId) {
                let serverEmbed = new Embed({ title: guild.name, description: partnership.content, colour: partnership.colour }),
                    serverChannel = client.channels.cache.get(partnership.ids.channel),
                    partnershipEmbed = client.constants.partnershipEmbed,
                    partnershipChannel = client.channels.cache.get(client.constants.ids.channels.partnerships),

                    tier = TIERS.find(t => t.index === partnership.tier);

                if (tier?.benefits.featured.server) {
                    let partnershipMessage = await partnershipChannel.embed(`https://discord.gg/${guild.invite.code}`, serverEmbed),
                        serverMessage = await serverChannel.embed(partnershipEmbed);
                    database.guilds.set(guild.id, Object.merge(guild, { partnership: { ids: { message: partnershipMessage.id, partnership: serverMessage.id } } }));
                }

                database.guilds.set(guild.id, Date.now(), 'partnership.partneredAt');
                reaction.message.reactions.removeAll();
            } else if (emoteId === falseId) {
                database.guilds.set(guild.id, undefined, 'partnership.requestedAt');
                reaction.message.reactions.removeAll();
            }
        }
    }
}
