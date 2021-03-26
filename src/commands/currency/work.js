const txtgen = require('random-words'),
    Fuse = require('fuse.js');

module.exports = class Work extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Work and earn gold by doing simple tasks.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            cooldown: '1h'
        })
    }

    async run({ message, args, user }) {
        const LIST = client.constants.jobs;
        let job = LIST.find(j => j.title === user.job.title);
        if (!job) return Object.merge(message.send(`You don't have a job, get one using the \`${message.prefix}job apply <job>\` command. You can view a list of jobs using \`${message.prefix}jobs\`.`), { skipCooldown: true });
        let activities = ['repeatWords', 'identifyRole'],
            randomActivity = activities[Math.floor(Math.random() * activities.length)];

        return this[randomActivity](message, user, job);
    }

    repeatWords(message, user, job) {
        let words = txtgen({ exactly: 5, join: ' ', maxLength: 5 }).replace(/[?!;:,.'"-]/g, ''),
            time = 5000 + words.length * 500,
            filter = m => m.author.id === user.id,
            { max, min } = job;

        message.send({ message, title: 'Get Working', description: 'Retype the following 5 words:', image: encodeURI(`https://img.shields.io/badge/-${words}-white.png`) });
        return message.channel.awaitMessages(filter, { max: 1, time, errors: ['time'] })
            .then(response => {
                let msg = response.first(),
                    success = msg.content.toLowerCase() === words.toLowerCase();
                if (!success) max = max / 3, min = min / 3;
                return this.finishJob(message, user, max, min, job.currency, success);
            }).catch(response => this.finishJob(message, user, max / 3, min / 3, job.currency, false));
    }

    identifyRole(message, user, job) {
        const roles = Object.values(message._('roles'));

        let role = roles.random(),
            roleEmote = client.emote(role.name.toCamelCase()),
            time = 5000 + (role.name.length * 500),
            filter = m => m.author.id === user.id,
            { max, min } = job;

        message.send({ message, title: 'Get Working', description: 'Identify the following role:\n' + roleEmote });
        return message.channel.awaitMessages(filter, { max: 1, time, errors: ['time'] })
            .then(response => {
                let msg = response.first(),
                    roleNames = [];

                for (const r of roles) {
                    if (r.name) roleNames.push([r.name, r.name]);
                    if (r.abbreviations) {
                        let abbreviations = r.abbreviations.split(',').map(a => a.trim());
                        for (const abbreviation of abbreviations) roleNames.push([abbreviation, r.name]);
                    }
                }

                let foundRole = roleNames.find(r => r[0].toLowerCase() === msg.cleanContent.toLowerCase()),
                    success = foundRole[1].toLowerCase() === role.name.toLowerCase();

                if (!success) max = max / 3, min = min / 3;
                return this.finishJob(message, user, max, min, job.currency, success);
            }).catch(response => this.finishJob(message, user, max / 3, min / 3, job.currency, false));
    }

    /**
     * const Fuse = require('fuse.js');
     * 
    async run({ message, args, user }) {
        let query = args.join(' ').toLowerCase(),
            roles = Object.values(message._('roles')),
            tips = message._('tips'),
            role = roles.find(r => r.name.toLowerCase() === query) ||
                roles.find(r => r.abbreviations.toLowerCase().split(', ').includes(query)) ||
                new Fuse(roles, { keys: ['name', 'abbreviations', 'team', 'aura'] })
                    .search(query)[0]?.item,
            tip = tips.find(t => t.role.includes(role.name));

     */

    finishJob(message, user, max, min, currency, success) {
        let payment = Math.floor(Math.random() * (max - min) + min);
        payment = Math.floor((payment > 0 ? payment : 1) * client.constants.currency.work);
        database.users.set(user.id, Object.merge(user, { job: { hours: ++user.job.hours }, balance: { [currency]: user.balance[currency] + payment } }));
        terminal.currency(`${user.tag} (${user.id}) worked and earned ${payment} ${currency}.`);

        if (success) return message.send(`You did a good job and earned ${payment} ${message.emote(currency)}, keep it up!`);
        else return message.send(`You did a bad job but what's sad is that your boss still decided to pay you ${payment} ${message.emote(currency)}.`);
    }
}
