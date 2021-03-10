const ms = require('pretty-ms');

module.exports = class Message extends client.eventManager.Event {
    constructor() {
        super(__filename.split('/').pop().slice(0, -3));
    }

    async handle(message) {
        if (message.partial) await message.fetch();

        if (message.type !== 'DEFAULT' || message.author.bot ||
            !client.ready || !message.channel.viewable) return;

        let guild = database.get(message.guild.id, 'guild') ||
            database.create.guild(message.guild),
            user = database.get(message.author.id, 'user') ||
                database.create.user(message.author);

        if (user.tag !== message.author.tag) {
            let { username, discriminator } = message.author;
            user = Object.merge(user, { username, discriminator });
            database.users.set(user.id, user);
        }

        let prefix = guild.settings.prefix,
            mentionPrefix = message.content.match(new RegExp(`^<@!?${client.user.id}> ?`));
        message.prefix = prefix;

        if (message.content.match(new RegExp(`^<@!?${client.user.id}> ?$`))) return message.send(`My prefix in this server is \`${prefix}\`.`)
        if (!message.content.startsWith(prefix) && !mentionPrefix) return;
        if (prefix === '*' && message.content.endsWith(prefix)) return;
        let content = message.content.split(' '),
            query = mentionPrefix ? content[1].toLowerCase() :
                content[0].slice(prefix.length).toLowerCase(),
            args = content.slice(mentionPrefix ? 2 : 1);

        let command = client.commandManager.search(query);
        try {
            if (!command) return guild.settings.errors.invalidCommand ?
                message.send(`Invalid command, use \`${prefix}commands\` to view a list of valid commands.`) :
                null;
        } catch (error) { }

        if (guild.settings.disabledCommands.includes(command.name)) return;

        if (command.cooldown) {
            let lastUsage = user.cooldowns[command.name],
                timeBetween = Date.now() - lastUsage;
            if (timeBetween < command.cooldown) {
                if (command.cooldown < 60000) return message.reactCooldown();
                else return message.send(`You are being ratelimited! Try again in ${ms(lastUsage + command.cooldown - Date.now())}`)
            }
        }

        if (message.channel.type === 'text') {
            let user = command.permissions.user,
                channel = command.permissions.channel,
                server = command.permissions.server;

            if (user.length > 0 || channel.length > 0 || server.length > 0) {
                if (user.length > 0) {
                    for (let i = 0; i < user.length; i++) {
                        if (message.member.permissions.has(user[i])) continue;
                        else return message.send(`You are missing the ${user[i]} permission which you require in order to be able to use this command.`);
                    }
                }

                if (channel.length > 0) {
                    for (let i = 0; i < channel.length; i++) {
                        if (message.guild.me.permissionsIn(message.channel.id).has(channel[i])) continue;
                        else if (guild.settings.errors.missingPermissions) return message.send(`I am missing the ${channel[i]} permission which I require within this channel in order to be able to run this command.`);
                        else return;
                    }
                }

                if (server.length > 0) {
                    for (let i = 0; i < server.length; i++) {
                        if (message.guild.me.permissions.has(server[i])) continue;
                        else if (guild.settings.errors.missingPermissions) return message.send(`I am missing the ${server[i]} permission which I require within this server in order to be able to run this command.`);
                        else return;
                    }
                }
            }
        }

        let tags = command.tags;
        if (tags.length > 0) {
            if (tags.includes('apteryx') && message.author.id !== client.constants.developer.id) return message.reactForbidden();
            if (tags.includes('args') && args.length < 1) return message.reactNoArgs();
            if (tags.includes('beta') && message.guild.id !== client.constants.support.guildId) return message.reactForbidden();
            let staffTag = tags.find(t => /staff/g.test(t)),
                staffMembers = client.constants.staff.filter(s => s.level >= staffTag?.split('-')[0] || 6);
            if (staffTag && !staffMembers?.map(s => s.id).includes(user.id)) return message.reactForbidden();
        }

        if (command.run) {
            try {
                let response = await command.run({ message, args, user, guild });
                if (response?.skipCooldown !== true)
                    database.users.set(user.id, Date.now(), `cooldowns.${command.name}`);
            } catch (error) {
                if (error.message.includes('does not exist in the enmap "users"')) return;
                message.send(`An error occurred while trying to execute the ${command.name} command. The error has been logged and will be sorted ASAP.\nError: ${error.message}`);
                let errorStack = error.stack.toString().split('\n');
                return terminal.error(errorStack[0] + '\n' + errorStack[1]);
            }
        }
    }
}
