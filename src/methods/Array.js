// modify
Array.prototype.last = function () { return this[this.length - 1] };
Array.prototype.shuffle = function () { return this.sort(() => Math.random() > Math.random() ? 1 : -1) };
Array.prototype.remove = function (items) {
    let a = new Array();
    for (let i = 0; i < items.length; i++)
        a.push(this.indexOf(items[a]));
    return this.filter(b => !i.includes(b));
}

// filter
Array.prototype.filterUnique = function () { return this.filter((a, b) => this.indexOf(a) === b) };
Array.prototype.filterClass = function (object) {
    var t = [{ fn: String, nm: 'string' }, { fn: Number, nm: 'number' }];
    if (!(object instanceof Function)) return this;
    var n = t.find(a => a.fn === object) || { nm: 'proto' };
    if (['string', 'number'].includes(n.nm))
        return this.filter(a => typeof a === n.nm);
    else return this.filter(a => a instanceof object);
}
