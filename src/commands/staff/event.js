const EVENTS = ['work'],
    Discord = require('discord.js'),
    ms = require('../../../../../modules/enhanced-ms/src/index');

module.exports = class Eval extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            tags: ['staff-3'],
            hidden: true
        })
    }

    // *event work 2 
    async run({ message, args, guild, user }) {
        let event = EVENTS.find(e => e === args[0]?.toLowerCase())
        if (!event) return message.send('No event type was found for what was inputted. Event types include ' + EVENTS.join(', '));

        let tag = '-s';
        if (['-m'].includes(args[args.length - 1])) tag = args.pop();

        if (event === 'work') {
            let multiplier = +args[1];
            if (!multiplier || !Number.isFinite(multiplier)) return message.send('Invalid number inputted.');

            let timeFrame = ms(args.slice(2).join(' '));
            if (!timeFrame) return message.send('Time frame is invalid.');

            let eventsChannel = await client.channels.fetch(client.constants.ids.channels.events),
                eventMessage = null;

            if (tag === '-s') {
                eventMessage = await eventsChannel.send(`New <@&${client.constants.ids.roles.events}>! The **work** command will now give you **x${multiplier} gold** for the next ${ms(timeFrame, { long: true })}!`)
                eventMessage.crosspost();
            }

            client.constants.events.work.gold = multiplier;
            message.send('Started a new event in <#' + eventsChannel + '>!');

            setTimeout(function () {
                if (eventMessage) eventMessage.edit('~~' + eventMessage.content + '~~\nEvent has ended.');
                client.constants.events.work.gold = 1;
            }, timeFrame)
        }
    }
}