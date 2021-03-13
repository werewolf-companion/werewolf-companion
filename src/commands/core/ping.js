module.exports = class Ping extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View the client, RETST API and WebSocket ping.',
            category: module.filename.split('/').slice(-2)[0]
        })
    }

    async run({ message }) {
        let rest = Date.now(),
            ws = client.ws.ping;
        client.api.gateway.get().then(() => rest -= Date.now());

        return message.send('Pinging client...').then(response => {
            let ping = response.createdTimestamp - message.createdTimestamp;
            return response.edit(`${message.emote('ping_pong')} **Client**: ${ping}ms, **REST API**: ${Math.abs(rest)}ms, **WebSocket**: ${ws}ms`);
        })
    }
}
