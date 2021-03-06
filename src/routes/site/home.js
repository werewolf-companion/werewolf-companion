const { render } = require('../fn');

module.exports = {
    init: app => {
        app.get('/', async (req, res) => {
            if (req.isAuthenticated()) var self = await client.users.fetch(req.user.id);
            render(req, res, 'home.ejs', self ? { self } : null);
        })

        app.get('/discord/invite', (req, res) => {
            client.channels.cache.get('732207718802391080').createInvite({ maxAge: 0 })
                .then(invite => res.redirect(`https://discord.gg/${invite.code}`));
        })

        app.get('/bot/invite', (req, res) => {
            client.generateInvite({ permissions: 8n })
                .then(invite => res.redirect(invite));
        })

        app.get('/app/android', (req, res) => {
            res.redirect('https://play.google.com/store/apps/details?id=com.blackbox.wwoc');
        })
        
        app.get('/wwo/:media', (req, res) => {
            let media = req.params.media;
            if (media === 'discord') res.redirect('https://discord.gg/wwo');
        else if (media === 'instagram') res.redirect('https://www.instagram.com/werewolf.online/');
            else if (media === 'twitter') res.redirect('https://twitter.com/werewolf_app');
            else if (media === 'facebook') res.redirect('https://www.facebook.com/werewolf.apps/');
            else if (media === 'subreddit') res.redirect('https://www.reddit.com/r/werewolfonline/');
            else render(req, res, 'error.ejs', { error: { code: 404, message: 'Not Found', details: 'Route not found on server.' } });
        })

        app.get('/sideserver/:code', (req, res) => {
            let inviteCode = req.params.code,
                sideServer = database.sideServers.find(ss => ss.invite.code === inviteCode);
            if (!sideServer) return render(req, res, 'error.ejs', { error: { code: 400, message: 'Bad Request', details: 'Invite code does not exist.' } });
            else {
                res.redirect(`https://discord.gg/${sideServer.invite.code}`);
                database.sideServers.math(sideServer.id, '+', 1, 'invite.clicks');
            }
        })
    }
}
