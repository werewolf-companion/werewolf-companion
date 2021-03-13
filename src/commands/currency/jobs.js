const LIST = require('../../json/jobs.json');

module.exports = class Jobs extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View a list of all the jobs and their requirements.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] }
        })
    }

    async run({ message, args, user }) {
        let fields = [];
        for (let job of LIST) fields.push([job.title.toTitleCase(), `**Payment**: ${job.min} to ${job.max} ${message.emote(job.currency)}\n**Requirements**:\n${job.hours} Hours Worked\n${job.daily} Daily Streak`])
        return message.send({ message, title: 'Avaiable Jobs', description: `Apply for one of these jobs by using \`${message.prefix}job apply <job title>\`.` }, fields)
    }
}
