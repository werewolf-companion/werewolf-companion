const LIST = require('../../json/jobs.json');

module.exports = class Jobs extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: []
        })
    }

    async run({ message, args, user }) {
        let fields = [];
        for (let job of LIST) fields.push([job.title.toTitleCase(), `**Payment**: ${job.min} to ${job.max} ${message.emote(job.currency)}\n**Requirements**:\n${job.hours} Hours Worked\n${job.daily} Daily Streak`])
        return message.send({ message, title: 'Avaiable Jobs', description: `Apply for one of these jobs by using \`${message.prefix}job apply <job title>\`.` }, fields)
    }
}
