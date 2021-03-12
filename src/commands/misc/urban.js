const fetch = require('node-fetch'),
    Embed = require('../../structures/Embed');

module.exports = class Urban extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: 6000
        })
    }

    async run({ message, args }) {
        let word = args.join('%20');
        return message.send('Searching...').then(msg => {
            fetch(client.constants.api.urban(word || 'undefined'))
                .then(res => res.json())
                .then(body => {
                    if (body.list.length === 0) return msg.edit('No Definitions Found');
                    else {
                        try {
                            let item = body.list[0],
                                word = item.word,
                                definition = item.definition.replace(/\[|\]/g, ''),
                                upvotes = item.thumbs_up,
                                downvotes = item.thumbs_down,
                                example = item.example.replace(/\[|\]/g, ''),
                                author = item.author;

                            let embed = new Embed({ message, title: word, footer: 'By ' + author }, [
                                ['Definition', definition, false],
                                ['Example', example, false],
                                ['Votes', `:thumbsup: ${upvotes}\n:thumbsdown: ${downvotes}`]
                            ])

                            return msg.edit('​', embed);
                        } catch (error) { console.log(error); return msg.edit('No Definitions Found') }
                    }
                })
        })
    }
}
