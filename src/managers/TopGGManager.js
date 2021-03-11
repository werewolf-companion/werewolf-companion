const Manager = require('./Manager'),
    TopGG = require('@top-gg/sdk');

module.exports = class TopGGManager extends Manager {
    constructor(client) {
        super();

        this.api = new TopGG.Api(process.env.TOPGG_TOKEN);

        this.link = 'https://top.gg/' + process.env.DISCORD_ID;
        this.voteLink = this.link + '/vote';
    }

    register() {
        setInterval(() => {
            this.api.postStats({
                serverCount: client.guilds.cache.size
            })
        }, 1800000)
    }

    hasVoted = id => this.api.hasVoted(id);
    getStats = id => this.api.hasVoted(id);


}