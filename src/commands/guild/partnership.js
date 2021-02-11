const TIERS = require('../../json/tiers.json'),
    ms = require('ms'),
    colorThief = require('colorthief');

module.exports = class Settings extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            tags: [],
            permissions: {
                user: ['MANAGE_GUILD'],
                channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS']
            },
            aliases: ['partner']
        })
    }

    async run({ message, args, guild, user }) {
        let option = args[0]?.toLowerCase(),
            prefix = message.prefix;

        if (!option)
            message.send({ message, title: 'Werewolf Companion Partner Program' }, [
                ['Tier', `To view a list of partnership tiers and their requirements use the command \`${prefix}partnership tiers\`.\n**Selected Tier**: ${TIERS.find(t => t.index === guild.partnership.tier)?.name || 'None'}`],
                ['Message', `To partner, you'll need a partnership message, to set one you can use the \`${prefix}partnership message <message>\` command. The message content must be less than your tiers max character count.`],
                ['Channel', `You'll also need to set what channel is your partnerships channel. You can do so using the \`${prefix}partnership channel <channel>\` command.`],
                ['Preview', `You can preview what your partnership message will look like using the \`${prefix}partnership preview\` command.`],
                ['Apply', `Once you have set all the requirements, use \`${prefix}partnership apply\` to send your partnership request to the moderators.`]
            ])
        else if (option === 'tiers') {
            let fields = [];

            for (let tier of TIERS) {
                let { characters, featured } = tier.benefits,
                    features = `**Features**:
Max Characters: ${characters}
Server Partnership Channel: ${message.emote('true')}
Bot Featured Servers: ${message.emote(featured.bot.toString())}
Featured Time Frame: ${featured.time === -1 ? Infinity : ms(featured.time)}`;

                fields.push([
                    `${tier.name} [${tier.index}]`,
                    `${tier.description}
**Requirements**
${tier.members}+ Members
${features}`
                ])
            }

            message.send({ message, title: 'Partnership Tiers', description: `Select a tier by using \`${prefix}partnership tier <tier ID>\`. Tier ID is the number in the square brackets.` }, fields);
        } else if (option === 'tier') {
            let tier = TIERS.find(t => t.index === Number(args[1]));
            if (!tier) return message.send('No tier was found for what was inputted.');
            else {
                if (message.guild.memberCount < tier.members) return message.send('Your server does not meet the requirements for this tier.');
                else {
                    database.guilds.set(guild.id, tier.index, 'partnership.tier');
                    return message.send(`Set partnership tier to ${tier.name}.`);
                }
            }
        } else if (option === 'message') {
            if (!guild.partnership.tier) return message.send('You must set a tier before you can set a message.');

            let tier = TIERS.find(t => t.index === guild.partnership.tier),
                content = args.slice(1).join(' '),
                charCount = tier.benefits.characters;

            if (content.length > charCount) return message.send(`Message length is ${content.length - charCount} characters too long.`);

            return colorThief.getColor(message.guild.iconURL({ format: 'png' }) || message.author.avatarURL({ format: 'png' })).then(colour => {
                return message.guild.channels.cache.first().createInvite({ maxAge: 0 }).then(invite => {
                    database.guilds.set(guild.id, Object.merge(guild, { partnership: { content, colour }, invite: { code: invite.code } }));
                    return message.send(`Partnership message has been set, you can preview it using the \`${prefix}partnership preview\` command.`);
                })
            })
        } else if (option === 'channel') {
            let channelId = args[1];
            if (channelId.match(/<#(\d{17,19})>/)) channelId = channelId.replace(/[<#>]/g, '');

            let channel = client.channels.cache.get(channelId);
            if (!channel) return message.send('No channel was found for what was inputted.');

            database.guilds.set(guild.id, channel.id, 'partnership.ids.channel');
            return message.send(`Partnership channel has been set to ${channel}.`);
        } else if (option === 'preview') {
            let partnership = guild.partnership,
                name = guild.name,
                content = partnership.content,
                colour = partnership.colour,
                inviteCode = guild.invite.code;

            return message.channel.embed(`https://discord.gg/${inviteCode}`, { title: name, description: content, colour });
        } else if (option === 'apply') {
            if (guild.partnership.partneredAt) return message.send('You have already partnered with Werewolf Companion, to undo, contact support.');
            if (guild.partnership.requestedAt) return message.send('You have already sent a request to partner.');

            let partnership = guild.partnership,
                inviteCode = guild.invite.code,
                content = partnership.content,
                channel = partnership.ids.channel,
                colour = partnership.colour,
                tier = partnership.tier;

            if (!content || !channel || !tier || !inviteCode) return message.send('You have not set all the requirements needed, make sure you have set a message, channel and tier.');
            else {
                database.guilds.set(guild.id, Date.now(), 'partnership.requestedAt');
                client.channels.cache.get(client.constants.ids.channels.requests).embed(`${guild.id} - A new partnership request from ${guild.name}.\nMember Count: ${message.guild.memberCount}\nTier: ${tier}\n\nhttps://discord.gg/${inviteCode}`, { title: guild.name, description: content, colour }).then(msg => {
                    msg.react(message.emote('true', { id: true }));
                    msg.react(message.emote('false', { id: false }));
                });
                return message.send('A partnership request has been sent.');
            }
        }
    }
}