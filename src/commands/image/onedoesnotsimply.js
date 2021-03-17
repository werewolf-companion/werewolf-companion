module.exports = class Slap extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: one does not simply walk into morder, lord of the rings boromir.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['odns'],
            usages: ['<text>'],
            examples: ['think of an example']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include an input.');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('61579', ['One does not simply', ...inputs]);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}