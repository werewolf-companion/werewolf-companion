module.exports = {
    User: class {
        constructor(user) {
            this.kind = 'user';
            this.id = user.id;
            this.username = user.username;
            this.discriminator = user.discriminator;

            this.job = user.job || { title: undefined, id: undefined, hours: 0, last: 0 };
            this.balance = user.balance || { gold: 0, rose: 0, gem: 0, token: 0 };
            this.stats = user.stats || {
                general: { messages: 0, commands: 0 },
                rose: { bought: 0, sent: 0, received: 0 },
                streak: { daily: 0 }
            }

            this.inventory = user.inventory || {};
            this.collectables = user.collectables ||
                { legendary: [], epic: [], rare: [], uncommon: [], common: [] };

            this.cooldowns = user.cooldowns || {};

            this.settings = user.settings || {
                locale: 'en-gb'
            }
        }

        get tag() {
            return this.username + '#' + this.discriminator;
        }

        async get() {
            return await client.users.fetch(this.id);
        }

        async send(content, fields, options) {
            let user = await this.get();
            return user.embed(content, fields, options);
        }
    },

    Secrets: class {
        constructor(user) {
            this.kind = 'secrets';
            this.id = user.id;
            this.token = user.token || String.random(64);
            this.code = user.code;

            this.cookies = user.cookies || { remember: undefined };
            this.discord = user.discord || {};
        }

        get user() {
            return database.get(this.id, 'user');
        }
    }
}
