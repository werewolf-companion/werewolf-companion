const Embed = require('../../structures/Embed');

module.exports = class $Embed extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['em'],
            permissions: {
                user: ['MENTION_EVERYONE', 'MANAGE_MESSAGES'],
                channel: ['EMBED_LINKS', 'MENTION_EVERYONE']
            }
        })
    }

    async run({ message, args, user, guild }) {
        if (!args[0]) {
            let { title, description, options, limits } = message._('embed');
            return message.send({ message, title, description }, [
                [
                    options.title,
                    `\`-t\` - ${options.t}\n` +
                    `\`-d\` - ${options.d}\n` +
                    `\`-f\` - ${options.f}\n` +
                    `\`-c\` - ${options.c}\n` +
                    `\`-r\` - ${options.r}\n` +
                    `\`-e\` - ${options.e}\n` +
                    `\`-j\` - ${options.j}\n` +
                    `\`-w\` - ${options.w}\n`,
                    false
                ],
                [
                    limits.title,
                    limits.t + '\n' +
                    limits.d + '\n' +
                    limits.f,
                    false
                ]
            ]);
        }

        let input = args.join(' ').split(/-*`*`/).map(s => s.trim().replace(/=/g, '')).filter(s => s.length),
            option = o => {
                let index = input.indexOf(o);
                if (index === -1) return undefined;
                else return input[index + 1];
            }

        let title = option('-t'),
            description = option('-d'),
            footer = option('-f'),
            colour = option('-c'),
            remove = option('-r') || 'true',
            everyone = option('-e') || 'false',
            json = option('-j') || 'false',
            webhook = option('-w') || 'false';

        if (
            title?.length > 250 ||
            description?.length > 2000 ||
            footer?.length > 2000
        ) return message.send(message._('embed.limitReached'));

        const embed = new Embed({ message, title, description, footer, colour: colour?.toUpperCase() });

        if (remove !== 'false') setTimeout(() => message.delete({ timeout: 1000 }));
        if (webhook !== 'false') {
            message.channel.createWebhook(message.author.nickname || message.author.username, {
                avatar: message.author.avatarURL()
            }).then(webhook => {
                webhook.send((everyone === 'true' ? '@everyone' : ''), { embeds: [embed] });
                setTimeout(() => webhook.delete(), 1000);
            })
        } else message.channel.send((everyone === 'true' ? '@everyone' : ''), embed);
        if (json === 'true') message.send(`Raw embed object:\`\`\`${require('util').inspect(embed)}\`\`\``);
        return;
    }
}
