const fetch = require('node-fetch'),
    Embed = require('../../structures/Embed');

module.exports = class Define extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            cooldown: 6000
        })
    }

    async run({ message, args }) {
        let word = args.join('%20');
        if (word.toLowerCase() === 'wolvesville') return message.send('haha wolvesville go brrrr');
        return message.send('Searching...').then(msg => {
            fetch(client.constants.api.define(word))
            .then(res => res.json())
            .then(body => {
                if (body.title) return msg.edit(body.title);
                else {
                    try {
                        let title = body[0].word.toTitleCase(),
                            meaning = body[0].meanings[0],
                            definition = meaning.definitions[0].definition,
                            example = meaning.definitions[0].example,
                            synonyms = meaning.definitions[0].synonyms,
                            phonetics = body[0].phonetics.map(p => p.text);

                        let embed = new Embed({ message, title, description: definition }, [
                            ['Example', example || 'None'],
                            ['Phonetics', phonetics?.join(' ') || 'None'],
                            ['Synonyms', synonyms?.join(', ') || 'None', false]
                        ])

                        return msg.edit('​', embed);
                    } catch (error) { return msg.edit('No Definitions Found') }
                }
            })
        })
    }
}
