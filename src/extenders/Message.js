const { Structures } = require('discord.js'),
    Embed = require('../structures/Embed');

Structures.extend('Message', Message => {
    return class CustomMessage extends Message {
        send(parameter1, parameter2, parameter3, parameter4) {
            if (Object.isObject(parameter1)) {
                if (Array.isArray(parameter2)) {
                    const embed = new Embed(parameter1, parameter2);
                    return this.channel.send(embed, parameter3);
                } else {
                    const embed = new Embed(parameter1);
                    return this.channel.send(embed, parameter2);
                }
            } else if (String.isString(parameter1)) {
                if (Object.isObject(parameter2)) {
                    const embed = new Embed(parameter2, parameter3);
                    return this.channel.send(parameter1, embed, parameter4);
                } else return this.channel.send(parameter1, parameter2);
            }
            return this.channel.send(JSON.stringify(parameter1));
        }

        _ = (key, ...args) => this.client.locales.translate(
            this.author.settings?.locate || this.guild.settings?.locate,
            key,
            ...args
        )

        emote(name, { a = false, d = false, id = false } = {}) {
            let value = Object.find(client.constants.emotes, name);
            if (!value) return `:${name}:`;
            else if ([17, 18, 19].includes(value.length))
                return id ? value : `<${a ? 'a' : ''}:${d ? 'e' : name.toCamelCase()}:${value}>`;
            else return value;
        }

        reactCooldown = () => this.react(this.emote('clock'));
        reactSuccess = () => this.react(this.emote('true'));
        reactFail = () => this.react(this.emote('false'));
        reactForbidden = () => this.react(this.emote('forbidden'));
        reactNoArgs = () => this.react(this.emote('missing'));

        sendLoading = (content, options) => this.send(`${this.emote('loading')} ${content}`, options);
        sendInfo = (content, options) => this.send(`${this.emote('info')} ${content}`, options);
        sendSuccess = (content, options) => this.send(`${this.emote('success')} ${content}`, options);
        sendWarn = (content, options) => this.send(`${this.emote('success')} ${content}`, options);
        sendError = (content, options) => this.send(`${this.emote('success')} ${content}`, options);

        editLoading = (content, options) => this.edit(`${this.emote('loading')} ${content}`, options);
        editInfo = (content, options) => this.edit(`${this.emote('info')} ${content}`, options);
        editSuccess = (content, options) => this.edit(`${this.emote('success')} ${content}`, options);
        editWarn = (content, options) => this.edit(`${this.emote('success')} ${content}`, options);
        editError = (content, options) => this.edit(`${this.emote('success')} ${content}`, options);
    }
})
