module.exports = class Slap extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: distracted bf, guy checking out another girl, man looking at other woman, jealous girlfriend, guy looking back, cheater temptation, wandering eyes, disloyal boyfriend.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['dbf'],
            usages: ['<forward girl text>|<guy text>|<backward girl text>'],
            examples: ['wasd|gamers|arrows']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include inputs seperated by |');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('112126428', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}