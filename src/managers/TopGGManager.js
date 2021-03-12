const Manager = require('./Manager'),
    TopGG = require('@top-gg/sdk');

module.exports = class TopGGManager extends Manager {
    constructor(client) {
        super();

        this._ = new TopGG.Api(process.env.TOPGG_TOKEN);

        this.link = 'https://top.gg/bot/' + process.env.DISCORD_ID;
        this.voteLink = this.link + '/vote';

        setInterval(() => {
            this._.postStats({
                serverCount: client.guilds.cache.size
            })
        }, 1800000)
    }

    hasVoted = id => this._.hasVoted(id);
    getStats = id => this._.getStats(id);
}
