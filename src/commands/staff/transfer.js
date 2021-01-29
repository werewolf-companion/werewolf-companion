const Command = require('../../structures/Command'),
    moment = require('moment'),
    db = require('quick.db');

const balance = new db.table("balance");
const prestige = new db.table("prestige");
const inventory = new db.table("inventory");
const collectables = new db.table("collectables");

module.exports = class Eval extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ev'],
            tags: ['apteryx'],
            hidden: true
        })
    }

    async run({ message, args, guild, user }) {
        let guilds = client.guilds.cache.array(),
            users = database.users,
            total = 0;

        for (let guild of guilds) {
            await database.create.guild(guild);
            let members = await guild.members.fetch();

            for (let m of members) {
                let user = m[1].user;

                if (balance.has(`balance_${m[0]}`) && !user.bot) {
                    let bal = await balance.get(`balance_${m[0]}`),
                        inv = await inventory.get(`inventory_${m[0]}`) || {},
                        col = await collectables.get(`collectables_${m[0]}`)?.roles || { legendary: ['none'], rare: ['none'], epic: ['none'], uncommon: ['none'], common: ['none']},
                        pre = await prestige.get(`prestige_${m[0]}`)?.gems || 0;

                    let leg = col.legendary[0] === 'none' ? [] : col.legendary,
                        rar = col.rare[0] === 'none' ? [] : col.rare,
                        epi = col.epic[0] === 'none' ? [] : col.epic,
                        unc = col.uncommon[0] === 'none' ? [] : col.uncommon,
                        com = col.common[0] === 'none' ? [] : col.common;

                    let gem = Math.floor(pre / 10),
                        gol = (pre - (gem * 10)) * 100;

                    let data = {
                        kind: 'user',
                        id: m[0],
                        username: user.username,
                        discriminator: user.discriminator,
                        job: { title: undefined, id: undefined, hours: 0, last: 0 },
                        balance: { gold: bal.gold || 0, rose: bal.rose || 0, gem: gem || 0, token: 0 },
                        stats: {
                            general: { messages: 0, commands: 0 },
                            rose: { bought: 0, sent: 0, received: 0 },
                            streak: { daily: 0 }
                        },
                        inventory: { i1: inv.roses || 0, l1: inv.lootboxes?.gold || 0 },
                        collectables: { legendary: leg, epic: epi, rare: rar, uncommon: unc, common: com },
                        cooldowns: {},
                        settings: { locale: 'en-gb' }
                    }

                    await database.users.set(m[0], data);
                    total = total + 1;
                    console.log(`${total} : quick`);

                } else {
                    if (!user.bot) {
                        await database.create.user(user);
                        total = total + 1;
                        console.log(`${total} : user`);
                    } else {
                        total = total + 1;
                        console.log(`${total} : bot`);
                    }
                }
            }
        }
    }
}