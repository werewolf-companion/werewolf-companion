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
        let info = rpi.info,
            developer = database.get(client.constants.developer.id, 'user'),
            mods = [];

        for (let admin of client.constants.staff.filter(s => s.level > 2).slice(1)) mods.push(`<@!${admin.id}>`)
        

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

        return message.send({ message, title: `${message.emote('info')} Wolvesville Companion Information` }, [
            ['Name', client.user.username],
            ['Version', `v${pkg.version}`],
            ['Developer', `<@!${developer.id}> (${developer.tag})`],
            ['Moderators', mods.join('\n')],
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
