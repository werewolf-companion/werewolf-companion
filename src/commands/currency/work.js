const { response } = require('express');
const LIST = require('../../json/jobs.json'),
    txtgen = require('random-words'),
    ms = require('pretty-ms');

module.exports = class Work extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: 3600000,
            aliases: []
        })
    }

    async run({ message, args, user }) {
        let job = LIST.find(j => j.title === user.job.title);
        if (!job) return Object.merge(message.send(`You don't have a job, get one using the \`${message.prefix}job apply <job>\` command. You can view a list of jobs using \`${message.prefix}jobs\`.`), { skipCooldown: true });
        let activities = ['repeatWords'],
            randomActivity = activities[Math.floor(Math.random() * activities.length)];
        return this[randomActivity](message, user, job);
    }

    repeatWords(message, user, job) {
        let words = txtgen({ exactly: 5, join: ' ', maxLength: 5 }).replace(/[?!;:,.'"-]/g, ''),
            time = 5000 + words.length * 500,
            filter = m => m.author.id === user.id,
            { max, min } = job;

        message.send({ message, title: 'Get Working', description: 'Retype the following 5 words:', image: encodeURI(`https://img.shields.io/badge/-${words}-white.png`) });
        return message.channel.awaitMessages(filter, { max: 1, time, errors: ['time'] }).then(response => {
            let msg = response.first(),
                success = msg.content.toLowerCase() === words.toLowerCase();
            if (!success) max = max / 3, min = min / 3;
            return this.finishJob(message, user, max, min, job.currency, success);
        }).catch(response => this.finishJob(message, user, max / 3, min / 3, job.currency, false));
    }

    finishJob(message, user, max, min, currency, success) {
        let payment = Math.floor(Math.random() * (max - min) + min);
        payment = payment > 0 ? payment : 1;
        database.users.set(user.id, Object.merge(user, { job: { hours: ++user.job.hours }, balance: { [currency]: user.balance[currency] + payment } }));
        terminal.currency(`${user.tag} (${user.id}) worked and earned ${payment} ${currency}.`);

        if (success) return message.send(`You did a good job and earned ${payment} ${message.emote(currency)}, keep it up!`);
        else return message.send(`You did a bad job but what's sad is that your boss still decided to pay you ${payment} ${message.emote(currency)}.`);
    }
}
