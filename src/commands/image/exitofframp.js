module.exports = class Slap extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: car drifts off highway, sharp turn on road.',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['eor'],
            usages: ['<straight arrow text>|<left arrow text>|<car text>'],
            examples: ['pins|gutter|bowling ball']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include inputs seperated by |');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('124822590', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}