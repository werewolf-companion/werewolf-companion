module.exports = class Settings extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            description: 'Configure how the bot functions within your server. Anything from changing the prefix to disabling commands.',
            permissions: {
                user: ['MANAGE_GUILD'],
                channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS']
            },
            aliases: ['setting', 'config'],
            usages: [null, '<setting key> <new value>', 'command <command name> <disable/enable>'],
            examples: [null, 'prefix ?', 'missing disable', 'command abbreviations disable']
        })
    }

    async run({ message, args, guild }) {
        if (!args[0]) {
            let { prefix, errors, disabledCommands: commands } = guild.settings;
            return message.send({ message, title: 'Wolvesville Companion Settings', description: `To change a setting use \`${prefix}setting <setting key> <new value>\`.\nExamples: \`${prefix}setting prefix ?\`, \`${prefix}setting missing disable\`.\nKey: <setting name> [<setting key>]`}, [
                ['Prefix [prefix]', prefix !== '*' ? `\`${prefix}\` (custom)` : `\`${prefix}\` (default)`, false],
                ['Invalid Command [invalid]', `Returns an error if the message content starts with the prefix but is not a valid command.\n**${errors.invalidCommand ? 'Enabled' : 'Disabled'}**`],
                ['Missing Permissions [missing]', `Returns an error if the bot is missing permissions that are required, users missing permissions error message will still sent.\n**${errors.missingPermissions ? 'Enabled' : 'Disabled'}**`],
                ['Disabled Commands', `To disable/enable a command, type \`${prefix}settings command <command name> <disable/enable>\`\nExample: \`${prefix}settings command abbreviations disable\`.\nDisabled Commands: ${commands.length ? `\`${commands.join('`, `')}\`` : 'None'}`, false]
            ]);
        } else {
            let option = args[0]?.toLowerCase();

            if (option === 'prefix') {
                let prefix = args[1].toString().toLowerCase() || '*';
                if (!prefix.match(/^[a-z0-9`~!#$%^&*()_+-=,./<>?;':"|]{1,5}$/gi)) return message.send('The inputted prefix is invalid and cannout be used. Characters such as `[`, `]`, `{`, `}`, `@`, and `\\` cannot be used and the max length is 5.');
                database.guilds.set(guild.id, prefix, 'settings.prefix');
                return message.send(`A new prefix has been set, I will now only respond to messages which start with \`${prefix}\`.`);
            } else if (option === 'missing') {
                let boolean = args[1].toLowerCase() || 'enable';
                if (!['enable', 'disable'].includes(boolean)) return message.send('Second input must either be \'enable\' or \'disable\'.');
                database.guilds.set(guild.id, boolean === 'enable' ? true : false, 'settings.errors.missingPermissions');
                return message.send(`Sending an error message when the bot is missing required permissions has been ${boolean}d.`);
            } else if (option === 'invalid') {
                let boolean = args[1].toLowerCase() || 'enable';
                if (!['enable', 'disable'].includes(boolean)) return message.send('Second input must either be \'enable\' or \'disable\'.');
                database.guilds.set(guild.id, boolean === 'enable' ? true : false, 'settings.errors.invalidCommand');
                return message.send(`Sending an invalid command message when a user uses the prefix without a valid command has been ${boolean}d.`);
            } else if (option === 'command') {
                let command = client.commands.search(args[1]?.toLowerCase()),
                    boolean = args[2]?.toLowerCase();
                if (!command) return message.send('No command was found for what was inputted.');
                if (['settings'].includes(command.name)) return message.send('This commands status cannot be modified.')
                if (!['enable', 'disable'].includes(boolean)) return message.send('Third input must either be \'enable\' or \'disable\'.');
                let index = guild.settings.disabledCommands.indexOf(command.name);

                if (boolean === 'enable') {
                    if (index === -1) return message.send('Command is already enabled.');
                    else database.guilds.remove(guild.id, command.name, 'settings.disabledCommands');
                } else {
                    if (index !== -1) return message.send('Command is already disabled.');
                    else database.guilds.push(guild.id, command.name, 'settings.disabledCommands');
                }

                return message.send(`The ${command.name} command has been ${boolean}d.`);
            } else return message.send('No setting was found for what was inputted.');
        }
    }
}
