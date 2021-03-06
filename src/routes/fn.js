const passport = require('passport'),
    Strategy = require('passport-discord').Strategy,
    path = require('path'),

    CODES = {
        "200": { "message": "OK", "code": 200 },
        "301": { "message": "Moved Permanently", "code": 301 },
        "400": { "message": "Bad Request", "code": 400 },
        "401": { "message": "Unauthorized", "code": 401 },
        "403": { "message": "Forbidden", "code": 403 },
        "404": { "message": "Not Found", "code": 404 },
        "405": { "message": "Method Not Allowed", "code": 405 },
        "408": { "message": "Request Timeout", "code": 408 },
        "414": { "message": "URI Too Long", "code": 414 },
        "418": { "message": "I'm a teapot", "code": 418 },
        "429": { "message": "Too Many Request", "code": 429 },
        "500": { "message": "Internal Server Error", "code": 500 },
        "501": { "message": "Not Implemented", "code": 501 },
        "502": { "message": "Bad Gateway", "code": 502 },
        "503": { "message": "Service Unavailable", "code": 503 },
        "504": { "message": "Gateway Timeout", "code": 504 }
    }

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((object, done) => done(null, object));

passport.use(new Strategy({
    clientID: process.env.DISCORD_ID,
    clientSecret: process.env.DISCORD_SECRET,
    callbackURL: 'https://werewolf.apteryx.xyz/auth/discord/callback',
    scope: ['identify']
}, (accessToken, refreshToken, profile, done) => process.nextTick(() => done(null, profile))));

module.exports = {
    keys: process.secrets.get('keys'),

    code: (code, content) => {
        if (code.toString().startsWith('2')) return { data: content };
        else return { error: { code, message: CODES[code].message, details: content } };
    },

    validKey: (key, type) => {
        if (!type) return module.exports.keys[key] ? true : false;
        else return module.exports.keys[key]?.type === type ? true : false;
    },

    getKey: (key, type) => {
        if (!module.exports.validKey(key, type)) return null;
        else return module.exports.keys[key];
    },

    scopesInclude: (scopes, method, scope) => {
        let methodScope = scopes.find(s => s.startsWith(method));
        if (!scope) return methodScope ? true : false;
        else return methodScope?.split('*').includes(scope) ? true : false;
    },

    requireKey: (req, res, next) => {
        if (!req.headers.key) return res.status(400).json(module.exports.code(401, 'Request header \'Key\' is missing'));
        else if (req.headers.key && !module.exports.validKey(req.headers.key, 'api'))
            return res.status(401).json(module.exports.code(401, 'Request header \'Key\' is invalid or expired'));
        else next();
    },

    DATABASES: {
        PRIVATE: ['users', 'monthly'],
        FORBIDDEN: ['secrets']
    },

    passport,

    viewsDirectory: path.resolve('src/public'),
    publicDirectory: path.resolve('src/views'),

    issueToken: (res, user, cookie, time) => {
        let token = String.random(64);
        process.secrets.set(user.id, token, `cookies.${cookie}`);
        res.clearCookie(cookie);
        res.cookie(cookie, token, {
            secure: true,
            httpOnly: true,
            maxAge: time || 2419200000 // 1 year
        })
    },

    useToken: (req, res, cookie) => {
        let token = req.cookies?.[cookie],
            user = process.secrets.find(u => u.cookies?.[cookie] === token);
        res.clearCookie(cookie);
        if (user?.id) {
            process.secrets.set(user.id, null, `cookies.${cookie}`);
            module.exports.issueToken(res, user, cookie);
            return user;
        } else return null;
    },

    handle: (req, res, next) => {
        if (req.isAuthenticated() && !req.cookies['remember'])
            module.exports.issueToken(res, req.user, 'remember');

        if (!req.isAuthenticated() && req.cookies['remember']) {
            let user = module.exports.useToken(req, res, 'remember');
            if (user) req.user = user.discord;
        }

        next();
    },

    authenticate: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect('/login');
    },

    render: (req, res, template = 'home.ejs', data = {}) => {
        let baseData = {
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        }

        res.render(template, Object.assign(baseData, data));
    }
}
