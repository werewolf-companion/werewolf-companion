const { Structures } = require('discord.js'),
    Embed = require('../structures/Embed');

Structures.extend('User', User => {
    return class CustomUser extends User {
        get() {
            return database.get(this.id, 'user');
        }

        get settings() {
            return database.users.find(u => u.id === this.id)?.settings;
        }

        embed(parameter1, parameter2, parameter3, parameter4) {
            if (Object.isObject(parameter1)) {
                if (Array.isArray(parameter2)) {
                    const embed = new Embed(parameter1, parameter2);
                    return this.send(embed, parameter3);
                } else {
                    const embed = new Embed(parameter1);
                    return this.send(embed, parameter2);
                }
            } else if (String.isString(parameter1)) {
                if (Object.isObject(parameter2)) {
                    const embed = new Embed(parameter2, parameter3);
                    return this.send(parameter1, embed, parameter4);
                } else return this.send(parameter1, parameter2);
            }
        }
    }
})