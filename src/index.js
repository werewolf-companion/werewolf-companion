require('dotenv').config();
require('./methods/Object');
require('./methods/Array');
require('./methods/String');

const Client = require('./structures/Client'),
    Database = require('./structures/Database'),
    Terminal = require('./methods/Terminal'),
    Collection = require('./methods/Collection'),
    Server = require('./structures/Server');

global.client = new Client({
    partials: ['REACTION', 'MESSAGE'],
    intents: ['GUILDS','GUILD_MEMBERS','GUILD_BANS','GUILD_EMOJIS','GUILD_INTEGRATIONS','GUILD_WEBHOOKS','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_PRESENCES','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGE_TYPING','DIRECT_MESSAGES','DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING']
});
global.database = new Database();
global.server = new Server();
global.terminal = new Terminal();
global.collection = new Collection();

client.initialize();
database.initialize();
server.initialize();