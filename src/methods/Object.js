Object.isObject = object => object && typeof object === 'object' && !Array.isArray(object);

Object.find = function (object, path) {
    const tree = path.split('.');
    for (let i = 0; i < tree.length; i++) try {
        object = object[tree[i]];
    } catch (error) { break };
    return object;
}

Object.filter = function (object, property, value) {
    let objectEntries = Object.entries(object),
        filteredArray = objectEntries.filter(e => Object.find(e[1], property) === value),
        filteredObject = {};
    for (let entry of filteredArray) filteredObject[entry[0]] = entry[1];
    return filteredObject;
}

Object.merge = function (target, source) {
    let output = Object.assign({}, target);
    if (Object.isObject(target) && Object.isObject(source)) {
        Object.keys(source).forEach(key => {
            if (Object.isObject(source[key])) {
                if (!(key in target)) Object.assign(output, { [key]: source[key] });
                else output[key] = Object.merge(target[key], source[key]);
            } else Object.assign(output, { [key]: source[key] });
        })
    }
    return output;
}

Object.toJSON = function (object) {
    return Object.getOwnPropertyNames(object)
        .reduce((a, b) => {
            a[b] = object[b];
            return a;
        }, {});
}

Object.getFunctions = function (object) {
    let properties = [];
    do {
        properties = properties.concat(Object.getOwnPropertyNames(object));
    } while ((object = Object.getPrototypeOf(object)) && object != Object.prototype)

    return properties.sort().filter((e, i, arr) => {
        if (e != arr[i + 1] && typeof object[e] == 'function') return true;
    })
}
