module.exports = class Event {
    constructor(name) {
        this.name = name;
    }

    async handle() {
        termial.warn(`${this.name} event has no set handle function.`);
    }
}
