const { render } = require('../fn');

module.exports = {
    init: app => {
        app.get('/', async (req, res) => {
            if (req.isAuthenticated()) var self = await client.users.fetch(req.user?.id) || null;
            render(req, res, 'home.ejs', { self });
        })
    }
}
