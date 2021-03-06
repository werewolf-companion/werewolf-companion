const { write, read } = require("day-log-savings");

module.exports = class Terminal {
    log = (input) => write(input, { prefix: 'LOG' });
    error = (input) => write(input, { prefix: 'ERROR', console: true, stack: false });
    warn = (input) => write(input, { prefix: 'WARN' });
    user = (input) => write(input, { prefix: 'USER' });
    guild = (input) => write(input, { prefix: 'GUILD' });
    admin = (input) => write(input, { prefix: 'ADMIN' });
    currency = (input) => write(input, { prefix: 'CURRENCY' });
    inventory = (input) => write(input, { prefix: 'INVENTORY' });

    read = read;
}
