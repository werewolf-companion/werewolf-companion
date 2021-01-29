const { resolve } = require('path'),
    { readdirSync } = require('fs'),
    Manager = require('./Manager');

module.exports = class LocaleManager extends Manager {
    constructor(client) {
        super(client);
        this.client = client;

        this.locales = [];
        this.localeDirectory = resolve(this.srcDirectory, 'locales');
        this.defaultLocale = 'en-gb';
    }

    register() {
        let i = 0,
            directoryContent = readdirSync(this.localeDirectory);
        for (var fileName of directoryContent) {
            let localePath = resolve(this.localeDirectory, fileName),
                Locale = require(localePath),
                locale = new Locale();

            this.locales[locale._.code] = locale;
            delete require.cache[localePath];
            i++;
        }
        return i;
    }

    unregister() {
        while (this.locales.length) this.locales.pop();
    }

    reload() {
        this.unregister();
        return this.register();
    }

    isValid(locale) {
        return Boolean(this.locales[locale]);
    }

    translate(locale, key, ...args) {
        if (!locale) locale = this.defaultLocale;
        if (!this.isValid(locale)) return 'UNKNOWN_LOCALE';
        let property = Object.find(this.locales[locale], key);

        if (typeof property === 'function') return property(...args);
        else if (
            typeof property === 'string' ||
            Array.isArray(property) ||
            Object.isObject(property) ||
            property == null
        ) return property;

        terminal.warn(`No value for key '${key}' in locale '${locale}'.`);
        return 'UNKNOWN_KEY';
    }
}