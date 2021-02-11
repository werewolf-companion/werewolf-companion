module.exports = class MessageUpdate extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(message) {
        if (message.partial) await message.fetch();

        let server = database.get(message.guild.id, 'guild');
        if (message.id === server.partnership.ids.message) {
            let data = Object.merge(server, { partnership: { tier: 0, partneredAt: undefined, requestedAt: undefined } }),
                channel = client.channels.cache.get(client.constants.ids.channels.partnerships),
                serverMessage = await channel.messages.fetch(server.partnership.ids.message);
            database.guilds.set(server.id, data);
            serverMessage.delete();
        }
    }
}
