const { authenticate, handle, render, passport } = require('../fn');

module.exports = {
    init: app => {
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(handle);

        app.get('/login', (req, res, next) => {
            if (req.isAuthenticated()) {
                res.redirect('/');
            } else res.redirect('/auth/discord');
        })

        app.get('/auth/discord',
            (req, res, next) => {
                if (!req.session.backURL) req.session.backURL = '/';
                next();
            },
            passport.authenticate('discord')
        )

        app.get('/auth/discord/callback',
            passport.authenticate('discord', { failureRedirect: '/' }),
            (req, res, next) => {
                let backURL = req.session.backURL || '/',
                    code = req.query.code;
                if (!req.user) return res.redirect('/login');
                if (code) process.secrets.set(req.user.id, code, 'code');
                process.secrets.set(req.user.id, req.user, 'discord');
                req.session.backURL = null;
                res.redirect(backURL);
            })

        app.get('/logout', (req, res) => {
            req.session.destroy(() => {
                res.clearCookie('remember');
                req.logout();
                res.redirect('/');
            })
        })
    }
}
