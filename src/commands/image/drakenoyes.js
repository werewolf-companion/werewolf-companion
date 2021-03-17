module.exports = class Drake extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Generate a meme: drakeposting, drakepost, drake hotline approves, drake no yes, drake like dislike, drake faces',
            category: module.filename.split('/').slice(-2)[0],
            cooldown: '5s',
            aliases: ['dny'],
            usages: ['<top text>|<bottom text>'],
            examples: ['$10.00 + $2.89 shipping|$12.89 & free shipping']
        })
    }

    async run({ message, args }) {
        if (!args.length) return message.send('You must include inputs seperated by |');
        let inputs = args.join(' ').split('|'),
            res = await client.generate.imgflip('181913649', inputs);

        if (res.error) return message.send('Failed to generate image, returned error with the message:\n' + res.error);
        else return message.send(res.url);
    }
}