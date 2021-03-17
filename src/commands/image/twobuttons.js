module.exports = class Buttons extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: 2 red buttons, choice button, which button, daily struggle, hard choice to make.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['tb'],
            usages: ['<left text>|<right text>'],
            examples: ['press this button|no press this button']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include inputs seperated by |');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('87743020', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}