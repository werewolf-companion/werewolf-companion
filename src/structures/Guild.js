module.exports = {
    Guild: class {
        constructor(guild) {
            this.kind = 'guild';
            this.id = guild.id;
            this.name = guild.name;
            this.owner = guild.kind ? guild.owner : guild.ownerID;

            this.settings = guild.settings || {
                prefix: '*',
                locale: 'en-gb',
                disabledCommands: [],

                errors: {
                    invalidCommand: true,
                    missingPermissions: true
                }
            }

            this.partnership = guild.partnership || {
                requestedAt: undefined,
                partneredAt: undefined,

                content: undefined,
                tier: undefined,
                colour: undefined,

                ids: {
                    channel: undefined,
                    partnership: undefined,
                    message: undefined
                }
            }

            this.invite = guild.invite || {
                code: guild.channels ? guild.channels.cache.first().createInvite({ maxAge: 0 }).code : undefined,
                clicks: 0
            }
        }

        async get() {
            return await client.guilds.fetch(this.id);
        }
    },
    /*
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
    */
}