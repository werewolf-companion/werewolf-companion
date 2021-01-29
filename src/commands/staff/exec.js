const moment = require('moment'),
    { promisify, inspect } = require('util'),
    exec = promisify(require('child_process').exec);

module.exports = class Exec extends client.commandManager.Command {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['ex'],
            tags: ['apteryx'],
            hidden: true
        })
    }

    async run({ message, args, account }) {
        var tag = '-e', output = undefined, colour = 'GREEN';

        if (!args.length) return message.reactNoArgs();

        if (['-l', '-d', '-s', '-e'].includes(args[args.length - 1])) tag = args.pop();
        let input = args.join(' '),
            inputField = ['Input', '```bash\n' + input + '```', false];

        for (var charater of ['sudo', 'rm', '-rf', '*']) {
            if (input.includes(charater)) return message.send('Command potentially contains a dangerous string, refusing to execute.');
        }

        try {
            var { stdout } = await exec(input);
            output = stdout;
            if (typeof output !== 'string') output = inspect(output);
        } catch (error) {
            output = error.stack,
                colour = 'RED';
        }

        if (tag === '-e' && output.length > 1000) tag = '-l';
        if (tag === '-l') {
            terminal.log(output);
            return message.send({ message, title: 'Exec', colour }, [
                inputField,
                ['Output', '```' + `Output has been logged within the ${moment().format('YYYY/MM/DD')}.log file.` + '```']
            ])
        } else if (tag === '-d') {
            await message.delete({ timeout: 1 });
            return terminal.log(output);
        } else if (tag === '-s') {
            return message.send({ message, title: 'Exec', colour }, [
                inputField,
                ['Output', '```\n' + output.slice(0, 1000) + '```', false]
            ])
        } else {
            return message.send({ message, title: 'Exec', colour }, [
                inputField,
                ['Output', '```\n' + output + '```', false]
            ])
        }
    }
}
