const Embed = require("../structures/Embed"),
    TIERS = require('../json/tiers.json');

module.exports = class MessageReactionAdd extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(reaction, user) {
        
    }
}
