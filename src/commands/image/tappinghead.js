module.exports = class Slap extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: thinking black guy, black guy pointing at his head, can\'t blank if you don\'t blank, smart black dude, guy tapping head.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['th'],
            cooldown: '5s',
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include inputs seperated by |');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('89370399', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}