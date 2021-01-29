require('dotenv').config();
require('./methods/Object');
require('./methods/Array');
require('./methods/String');

const Client = require('./structures/Client'),
    Database = require('./structures/Database'),
    Terminal = require('./methods/Terminal'),
    Collection = require('./methods/Collection'),
    Server = require('./structures/Server');

global.client = new Client();
global.database = new Database();
global.server = new Server();
global.terminal = new Terminal();
global.collection = new Collection();

client.initialize();
database.initialize();
server.initialize();