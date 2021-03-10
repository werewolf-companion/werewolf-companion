const { MessageEmbed } = require('discord.js');

module.exports = class Embed {
    constructor({ message, title, description, footer, image, thumbnail, colour = '#ff4083' }, fields = []) {
        var embed = new MessageEmbed();
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        embed.setColor(colour);
        embed.setTimestamp();

        let embedFooter = [];
        if (footer) embedFooter.push(footer);
        if (message) embedFooter.push(message.author.id);
        embed.setFooter(embedFooter.join(' • '));

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (Array.isArray(field)) embed.addField(field[0], field[1], field[2] === false ? false : true);
            else embed.addField(field.title, field.value, field.inline === false ? false : true);
        }

        return embed;
    }
}

module.exports.MessageEmbed = MessageEmbed;