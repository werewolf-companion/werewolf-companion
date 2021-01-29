module.exports = {
    Guild: class {
        constructor(guild) {
            this.kind = 'guild';
            this.id = guild.id;
            this.name = guild.name;
            this.owner = guild.kind ? database.get(guild.owner, 'user') || guild.owner : guild.ownerID;
            this.settings = guild.settings || {
                prefix: '*',
                locale: 'en-gb',
                errors: {
                    invalidCommand: true,
                    missingPermissions: true
                },
                disabledCommands: []
            }
        }

        async get() {
            return await client.guilds.fetch(this.id);
        }
    },

    SideServer: class {
        constructor(guild, { description, inviteCode } = {}) {
            this.kind = 'sideServer';
            this.id = guild.id;
            this.name = guild.name;
            this.owner = guild.kind ? database.get(guild.owner, 'user') || guild.owner : guild.ownerID;
            this.content = guild.content || description;
            this.invite = guild.invite || { code: inviteCode, clicks: 0 };
        }
    }
}