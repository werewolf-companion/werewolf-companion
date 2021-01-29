const fs = require('fs'),
    rpi = require('rpi-proc-info'),
    pkg = require('../../../package.json');

module.exports = class BotInfo extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['bi', 'bot']
        })
    }

    async run({ message }) {
        let users = client.users.cache,
            info = rpi.info,
            developer = database.get(client.constants.developer.id, 'user'),
            admins = [];

        for (let admin of client.constants.staff.filter(s => s.level > 3).slice(1)) {
            let user = database.get(admin.id, 'user');
            admins.push(`<@!${admin.id}>`)
        }

        let { temperature, memory, disk } = {
            temperature: {
                cpu: Math.round(info.temperature.cpu)
            },
            memory: {
                total: Math.round((info.memory.MemTotal / 1048576) * 100) / 100,
                free: Math.round((info.memory.MemFree / 1048576) * 100) / 100,
                available: Math.round((info.memory.MemAvailable / 1048576) * 100) / 100
            },
            disk: {
                total: Math.round((info.disk.total / 1048576) * 100) / 100,
                used: Math.round((info.disk.used / 1048576) * 100) / 100,
                free: Math.round((info.disk.free / 1048576) * 100) / 100
            }
        }

        return message.send({ message, title: `${message.emote('info')} Werewolf Companion Information` }, [
            ['Name', client.user.username],
            ['Version', `v${pkg.version}`],
            ['Developer', `<@!${developer.id}> (${developer.tag})`],
            ['Admins', admins.join('\n')],
            ['Programmed', `JavaScript\nNodeJS (${process.version})`],
            ['Source Code', 'https://github.com/ApteryxXYZ/Werewolf-Companion'],
            ['RPi Disk Space', `${disk.total} GB Total\n${disk.used} GB Used\n${disk.free} GB Free`],
            ['RPi Memory', `${memory.total} GB Total\n${memory.free} GB Free\n${memory.available} GB Available`],
            ['RPi Temperature', `CPU ${temperature.cpu}°C`],
            ['Guild Count', database.guilds.size],
            ['User Count', database.users.size],
            ['Command Count', client.commandManager.commands.length],
            ['Dependencies', Object.entries(pkg.dependencies).map(d => `**${d[0]}** (v${d[1].slice(1)})`).join(', '), false]
        ])
    }
}


/**
exports.run = (client, message, args, prefix, account) => {
    var botInfo = embed(message, "Bot Information"),
        users = client.users.cache,
        guilds = client.guilds.cache,
        info = rpi.info,
        developer = users.get(config.developer.discord),
        admins = [],
        temperature = {
            cpu: Math.round(info.temperature.cpu)
        },
        memory = {
            total: Math.round((info.memory.MemTotal / 1048576) * 100) / 100,
            free: Math.round((info.memory.MemFree / 1048576) * 100) / 100,
            available: Math.round((info.memory.MemAvailable / 1048576) * 100) / 100
        },
        disk = {
            total: Math.round((info.disk.total / 1048576) * 100) / 100,
            used: Math.round((info.disk.used / 1048576) * 100) / 100,
            free: Math.round((info.disk.free / 1048576) * 100) / 100
        },
        members = 0, commands = 0;

    for (var admin of config.admins) {
        let discord = users.get(admin.discord);
        admins.push(`${discord} (${discord.tag})`);
    }
    guilds.forEach(g => members += g.memberCount);
    for (var module of config.discord.modules) {
        files = fs.readdirSync(`discord/commands/${module}`).filter(file => file.endsWith(".js"));
        commands += files.length;
    }

    botInfo.addField("Name", client.user.username, true)
        .addField("Prefix", prefix !== "." ? `\`${prefix}\` (custom)`: `\`${prefix}\` (default)`, true)
        .addField("Version", package.version, true)

        .addField("Developer", `${developer} (${developer.tag})`, true)
        .addField("Admin", admins.join("\n"), true)
        .addField("API Latency", client.ws.ping + "ms", true)

        .addField("RPi Disk Space", `${disk.total} GB Total\n${disk.used} GB Used\n${disk.free} GB Free`, true)
        .addField("RPi Memory", `${memory.total} GB Total\n${memory.free} GB Free\n${memory.available} GB Available`, true)
        .addField("RPi Temperature", `CPU ${temperature.cpu}°C`, true)

        .addField("Total Guild Count", guilds.size, true)
        .addField("Total Member Count", members, true)
        .addField("Number Of Commands", commands, true)

        .addField("Dependencies", Object.keys(package.dependencies).join(", "));
    return message.channel.send(botInfo);
}

exports.help = {
    name: "botinfo",
    aliases: ["bi", "bot"],
    module: "utility",
    description: "Bot information and live bot statistics.",
    usages: [],
    examples: []
}

exports.config = {
    enabled: true,
    args: 0,
    incorrectUsage: null,
    cooldown: 5000,
    tags: [],
    permissions: {
        server: [],
        channel: [],
        user: []
    }
}
 */