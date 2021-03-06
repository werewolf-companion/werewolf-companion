const { Structures } = require('discord.js'),
    Embed = require('../structures/Embed');

Structures.extend('TextChannel', TextChannel => {
    return class CustomTextChannel extends TextChannel {
        embed(parameter1, parameter2, parameter3, parameter4) {
            if (Object.isObject(parameter1)) {
                if (Array.isArray(parameter2)) {
                    const embed = new Embed(parameter1, parameter2);
                    return this.send(embed, parameter3);
                } else {
                    const embed = parameter1 instanceof Embed.MessageEmbed ? parameter1 : new Embed(parameter1);
                    return this.send(embed, parameter2);
                }
            } else if (String.isString(parameter1)) {
                if (Object.isObject(parameter2)) {
                    const embed = parameter2 instanceof Embed.MessageEmbed ? parameter2 : new Embed(parameter2, parameter3);
                    return this.send(parameter1, embed, parameter4);
                } else return this.send(parameter1, parameter2);
            }
        }
    }
})