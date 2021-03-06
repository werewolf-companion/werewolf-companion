const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
    return class CustomGuild extends Guild {
        get() {
            return database.get(this.id);
        }

        get settings() {
            return database.get(this.id, 'guild').settings;
        }
    }
})