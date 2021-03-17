module.exports = class Chnage extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: Steven Crowder\'s sign, prove me wrong',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['cmm'],
            usages: ['<text>'],
            examples: ['cops should wear light up red and blue speakers']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include an input.');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('129242436', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}