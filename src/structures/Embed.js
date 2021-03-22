const { MessageEmbed } = require('discord.js'),
    footerTips = [
        null,
        "Join the Wolvesville Companion support server and earn 250 free gold!",
        "Vote for Wolvesville Companion on top.gg and earn extra rewards from daily!",
        "Ping me in any server to find out what my prefix is!",
        "Use {{prefix}}help <command name> to retrieve information on a command!",
        "Use {{prefix}}user to view things such as including hours work and daily streak!",
        "Developed by Apteryx#0001!",
        "Wolvesville Companion is a downloadable Android app!",
        "Join the Wolvesville subreddit!",
        "Invite me using {{prefix}}invite!"
    ]

module.exports = class Embed {
    constructor({ message, title, description, footer, image, thumbnail, colour = '#ff4083', tips = true }, fields = []) {
        var embed = new MessageEmbed();
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        embed.setColor(colour);
        embed.setTimestamp();

        let embedFooter = [];
        if (!footer && tips && (Math.random() > 0.5)) footer = footerTips[Math.floor(Math.random() * footerTips.length)];
        if (footer) embedFooter.push(footer.replace(/{{prefix}}/gi, message?.prefix || client.prefix));
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