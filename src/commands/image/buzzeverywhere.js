module.exports = class Slap extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: 	woody and buzz lightyear pointing, toy story, dicks everywhere, toystory everywhere.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['bew'],
            usages: ['<text>'],
            examples: ['memes']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include an input.');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('91538330', [inputs[0], inputs[0] + ' everywhere']);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}