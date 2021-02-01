const express = require('express'),
    cookieParser = require('cookie-parser'),
    limiter = require('express-rate-limit')({ windowMs: 3600000, max: 100, message: 'Too many requests.' }),
    session = require('express-session'),
    NedbStore = require('nedb-session-store')(session),
    bodyParser = require('body-parser'),
    path = require('path');

module.exports = class Server {
    constructor() {
        this.ready = false;
    }

    async initialize() {
        const app = express(),
            api = express();

        app.use(cookieParser());
        app.use(express.static(path.resolve('src/public')));
        app.set('view engine', 'html');
        app.set('views', path.resolve('src/public/views'));
        app.set('trust proxy', 1);

        api.use(bodyParser.json());
        api.use(bodyParser.urlencoded({ extended: true }));
        api.set('trust proxy', 1);
        api.use(limiter);

        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new NedbStore({
                filename: 'data/sessions/nedb.sqlite'
            })
        }))

        const { render } = require('../routes/fn');
        require('../routes/site/auth').init(app);
        require('../routes/site/home').init(app);
        require('../routes/api/random').init(api);

        api.use(function (req, res) { res.status(404).json({ error: { code: 404, message: 'Not Found', details: 'Route not found on server.' } }) });
        api.use(function (err, req, res, next) {
            console.log(err);
            res.status(500).json({ error: { code: 500, message: 'Internal Server Error', details: 'An internal server error has occurred' } })
        });
        app.use('/api', api);

        app.use(function (req, res) { render(req, res, 'error.ejs', { error: { code: 404, message: 'Not Found', details: 'Route not found on server.' } }) });
        app.use(function (err, req, res, next) {
            console.log(err);
            return render(req, res, 'error.ejs', { error: { code: 500, message: 'Internal Server Error', details: 'Try again later.' } })
        });

        app.listen(process.env.SERVER_PORT, () => { });
        this.app = app;
        console.log('Web server has been initialized.');
    }
}
