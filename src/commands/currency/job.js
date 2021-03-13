const LIST = require('../../json/jobs.json');

module.exports = class Job extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Apply for a job, quit or current job, or simply view your job information.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            usages: [null, 'apply <job title>', 'quit'],
            examples: [null, 'apply villager', 'quit']
        })
    }

    async run({ message, args, user }) {
        let option = args[0]?.toLowerCase(),
            prefix = message.prefix;

        if (option === 'apply') {
            if (user.job.title) return message.send(`You currently already work as a ${user.job.title.toTitleCase()}, you can quit your job using \`${prefix}job quit\`.`);
            let job = LIST.find(j => j.title === args.slice(1).join(' ').toLowerCase());
            if (!job) return message.send(`That doesn't appear to be a valid job title, you can view a list of jobs using \`${prefix}jobs\`.`);

            let { hours, daily } = { hours: user.job.hours >= job.hours, daily: user.stats.streak.daily >= job.daily };
            if (!hours || !daily) return message.send(`You do not meet the requirements to apply for this job.`);

            database.users.set(user.id, job.title, 'job.title');
            terminal.currency(`${user.tag} (${user.id}) has gotten the ${job.title} job.`);
            return message.send(`You have successfully gotten the ${job.title} job, you can now use \`${prefix}work\` to earn gold!`);

        } else if (option === 'quit') {
            if (!user.job.title) return message.send(`You cannot quit a job which you do not have.`);
            database.users.set(user.id, { title: undefined, hours: user.job.hours, quit: Date.now() }, 'job');
            terminal.currency(`${user.tag} (${user.id}) has quit their ${user.job.title} job.`);
            return message.send(`You have successfully left your job as ${user.job.title.toTitleCase()}, you can apply for a new one using \`${prefix}job apply <job title>\`.`)

        } else {
            let job = LIST.find(j => j.title === user.job.title);
            if (!job) return message.send(`You do not have a job, get one using the \`${prefix}job apply <job title>\` command. You can view a list of jobs using \`${prefix}jobs\`.`);
            else return message.send(`Find your job information here: ${client.constants.links.companion.site}/user/${user.id}`);
        }
    }
}
