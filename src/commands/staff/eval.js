const Command = require('../../structures/Command'),
    moment = require('moment'),
    ms = require('pretty-ms');

module.exports = class Eval extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ev'],
            tags: ['apteryx'],
            hidden: true
        })
    }

    async run({ message, args, guild, user }) {
        var tag = '-s',
            output = 'undefined',
            colour = 'GREEN';

        if (!args.length) return message.reactNoArgs();

        if (['-l', '-d', '-s', '-e'].includes(args[args.length - 1])) tag = args.pop();
        let input = args.join(' '),
            inputField = ['Input', '```js\n' + input + '```', false];

        try {
            output = eval(input);
            if (typeof output !== 'string') output = (require('util').inspect(output));
        } catch (error) {
            output = error.stack,
                colour = 'RED';
        }

        if (tag === '-e' && output.length > 1000) tag = '-l';
        if (tag === '-l') {
            terminal.log(output);
            return message.send({ message, title: 'Eval', colour }, [
                inputField,
                ['Output', '```' + `Output has been logged within the ${moment().format('YYYY/MM/DD')}.log file.` + '```']
            ])
        } else if (tag === '-d') {
            await message.delete({ timeout: 1 });
            return terminal.log(output);
        } else if (tag === '-s') {
            return message.send({ message, title: 'Eval', colour }, [
                inputField,
                ['Output', '```js\n' + output.slice(0, 1000) + '```', false]
            ])
        } else {
            return message.send({ message, title: 'Eval', colour }, [
                inputField,
                ['Output', '```js\n' + output + '```', false]
            ])
        }
    }
}