const { readdirSync } = require('fs'),
    { resolve } = require('path'),
    { code } = require('../fn');

module.exports = {
    init: api => {
        api.get('/meme', (req, res) => {
            let memeDirectory = resolve('src/public/images/memes'),
                memes = readdirSync(memeDirectory),
                meme = memes[Math.floor(Math.random() * memes.length)];
            return res.status(200).json(code(200, { url: client.constants.links.companion.site +  `/images/memes/${meme}` }));
        })

        api.get('/gameplay', (req, res) => {
            let gameplayDirectory = resolve('src/public/images/gameplay'),
                gameplays = readdirSync(gameplayDirectory),
                gameplay = gameplays[Math.floor(Math.random() * gameplays.length)];
            return res.status(200).json(code(200, { url: client.constants.links.companion.site + `/images/gameplay/${gameplay}` }));
        })
    }
    
}
