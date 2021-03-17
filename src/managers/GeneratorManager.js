const Manager = require('./Manager'),
    fetch = require('node-fetch'),
    FormData = require('form-data');

module.exports = class GeneratorManager extends Manager {
    constructor(client) {
        super();
    }

    imgflip = async function (templateId, inputs) {
        let form = new FormData();
        form.append('template_id', templateId);
        form.append('username', process.env.IMGFLIP_USERNAME);
        form.append('password', process.env.IMGFLIP_PASSWORD);

        for (let i = 0; i < inputs.length; i++) {
            form.append(`boxes[${i}][type]`, 'text');
            form.append(`boxes[${i}][text]`, inputs[i]);
            form.append(`boxes[${i}][force_caps]`, 0);
        }

        return fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then(body => {
                if (!body.success) return { error: body.error_message };
                else return { url: body.data.url };
            })
    }
}
