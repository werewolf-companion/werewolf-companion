module.exports = class MessageUpdate extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(channel) {
        let server = database.get(channel.guild.id, 'guild');
        if (channel.id === server.partnership.ids.channel) {
            let data = Object.merge(server, { partnership: { tier: 0, partneredAt: undefined, requestedAt: undefined } }),
                channel = client.channels.cache.get(client.constants.ids.channels.partnerships),
                serverMessage = await channel.messages.fetch(server.partnership.ids.message);
            database.guilds.set(server.id, data);
            serverMessage.delete();
        }
    }
}
