const Enmap = require('enmap'),
    Discord = require('discord.js'),
    { User, Secrets } = require('./User'),
    { Guild } = require('./Guild');

module.exports = class Database {
    constructor() {
        this.ready = false;
        this.Table = Table;
        this.User = User;
        this.Guild = Guild;
        this.Secrets = Secrets;
    }

    async initialize() {
        let secrets = new this.Table({ name: 'secrets', dataDir: 'data/secrets' });
        this.users = new this.Table({ name: 'users', dataDir: 'data/users' });
        this.guilds = new this.Table({ name: 'guilds', dataDir: 'data/guilds' });

        global.database = this;
        process.secrets = secrets;

        process.secrets.ensure('keys', {});

        this.ready = true;
        console.log('Database tables have been initialized.');
    }

    get(value, kind = 'user') {
        if (!value || typeof value !== 'string') return undefined;
        if (value.match(/<@!?(\d{17,19})>/)) value = value.replace(/[<@!>]/g, '');
        if (value.match(/^((.{2,32})#\d{4})/)) value = this.users.find(u => u.username.toLowerCase() === value.split('#')[0].toLowerCase());

        let result;
        if (kind === 'user') result = this.users.find(u =>
            u.id === value ||
            u.username?.toLowerCase() === value ||
            u.username?.toLowerCase() + '#' + u.discriminator === value);
        else if (kind === 'guild') result = this.guilds.find(g =>
            g.id === value ||
            g.name?.toLowerCase() === value);

        if (!result || !result.kind) return undefined;
        else if (result.kind === 'user') return new this.User(result);
        else if (result.kind === 'guild') return new this.Guild(result);
        else return null;
    }

    find = key => this.get(key, 'user') || this.get(key, 'guild') || null;
    has = key => this.find(key) ? true : false;
    delete(key) {
        let result = this.find(key);
        if (result) {
            this.users.delete(result.id);
            this.guild.delete(result.id);
            return true;
        } else return false;
    }

    merge(table, data, path, keyName = 'id') {
        if (!this[table] || !(this[table] instanceof this.Table)) return false;
        let values = this[table].array(),
            count = 0;

        for (let value of values) {
            let merged = Object.merge(!path ? value : Object.find(value, path), data);
            this[table].set(value[keyName], merged, path);
            count = count + 1;
        }

        return count;

    }

    assign(table, data, path, keyName) {
        if (!this[table] || !(this[table] instanceof this.Table)) return false;
        let values = this[table].array(),
            count = 0;

        for (let value of values) {
            let assigned = Object.assign(!path ? value : Object.find(value, path), data);
            this[table].set(value.id, assigned, path);
            count = count + 1;
        }

        return count;
    }

    get create() {
        return {
            user: user => {
                if (!(user instanceof Discord.User)) return null;
                if (this.has(user.id)) return this.get(user.id);

                this.users.ensure(user.id, Object.toJSON(new this.User(user)));
                process.secrets.ensure(user.id, Object.toJSON(new this.Secrets(user)));
                terminal.user(`New user registered: ${user.tag} (${user.id}).`);
                return this.users.get(user.id, 'user');
            },
            guild: guild => {
                if (!(guild instanceof Discord.Guild)) return null;
                if (this.has(guild.id, 'guild')) return this.get(guild.id, 'guild');

                this.guilds.ensure(guild.id, Object.toJSON(new this.Guild(guild)));
                terminal.guild(`New guild registered: ${guild.name} (${guild.id} - ${guild.memberCount}).`);
                return this.guilds.get(guild.id);
            }
        }
    }

    get size() {
        return this.users.size + this.guilds.size + process.secrets.size;
    }
}

class Table extends Enmap {
    constructor(enmapOptions) {
        super(enmapOptions);
    }
}
