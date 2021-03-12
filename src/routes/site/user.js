const { render, authenticate } = require('../fn'),
    jobs = require('../../json/jobs.json');

module.exports = {
    init: app => {
        app.get('/user', authenticate, async (req, res) => {
            let self = await client.users.fetch(req.user.id),
                user = database.get(self.id, 'user', self);
            if (!user) return render(req, res, 'error.ejs', { error: { code: 404, message: 'Not Found', details: 'No user found within database.' } });
            render(req, res, 'user.ejs', { user, self, target: self, jobs });
        })

        app.get('/user/:id', authenticate, async (req, res) => {
            let user = database.get(req.params.id);
            if (!user) return render(req, res, 'error.ejs', { error: { code: 404, message: 'Not Found', details: 'No user found within database.' } });

            let target = await client.users.fetch(user.id),
                self = req.user ? await client.users.fetch(req.user.id) : null;

            render(req, res, 'user.ejs', { self, user, target, jobs });
        })
    }
}
