String.isString = string => typeof string === 'string' || string instanceof String;
String.random = number => {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        string = [];

    for (let i = 0; i < number; ++i)
        string.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    return string.join('');
}

String.spliter = (string, divider) => string.replace(/([A-Z])/g, '-$1')
    .replace(/[_/\-\. ]{1,}/g, ' ')
    .replace(/[^A-Z0-9 ]+/gi, '')
    .toLowerCase().trim()
    .split(/[ ]{1,}/).join(divider);

// split
String.prototype.words = function () { return this.split(/[ ]{1,}/g) };
String.prototype.sentences = function () { return this.replace(/(\?|\.|!)|[]/g, '$1!@#$%^&*()').split('!@#$%^&*()') };
String.prototype.lines = function () { return this.split(/\n+/g) };

// case
String.prototype.toFirstCase = function () { return this.charAt(0).toUpperCase() + this.slice(1) };
String.prototype.toTitleCase = function () { return this.words().map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' ') };
String.prototype.toSentenceCase = function () { return this.sentences().map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' ') };
String.prototype.toLineCase = function () { return this.lines().map(a => a.charAt(0).toUpperCase() + a.slice(1)).join('\n') };
String.prototype.toCamelCase = function () { return String.spliter(this, ' ').words().map((a, b) => b === 0 ? a : a.toFirstCase()).join('') };
String.prototype.toPascalCase = function () { return String.spliter(this, ' ').words().map(a => a.toFirstCase()).join('') };
String.prototype.toKababCase = function () { return String.spliter(this, '-') };
String.prototype.toSnakeCase = function () { return String.spliter(this, '_') };
String.prototype.toDotCase = function () { return String.spliter(this, '*') };
String.prototype.toPathCase = function () { return String.spliter(this, '/') };
String.prototype.toCustomCase = function (divider) { return spliter(this, divider) };
String.prototype.toSwitchCase = function () { return this.split('').map(a => a.match(/[a-z]/g) ? a.toUpperCase() : a.toLowerCase()) };
String.prototype.toStudlyCase = function () {
    return this.split('').map(a => {
        if (Math.random() >= 0.5) return a.toUpperCase();
        else return a.toLowerCase();
    }).join('')
}

// check
String.prototype.isUpperCase = function () { return this === this.toUpperCase() };
String.prototype.isLowerCase = function () { return this === this.toLowerCase() };
String.prototype.wordsStartWith = function (letters = []) { return this.words().filter(a => letters.includes(a.slice(0, 1))) };
String.prototype.wordsEndWith = function (letters = []) { return this.words().filter(a => letters.includes(a.slice(a.length - 1, a.length))) };
String.prototype.wordsInclude = function (letters = []) {
    let w = this.words(), s = [];
    for (let a of w) if (letters.includes(a)) s.push(a);
    return s;
}
String.prototype.charsInclude = function (letters = []) {
    let w = this.words(), s = [];
    for (let a of w)
        for (let b of letters) if (a.includes(b)) s.push(a);
    return s;
}
String.prototype.validVariable = function () {
    if (!String.isString(this) || typeof this.trim() !== 'string') return false;
    try { new Function(this, 'var ' + this) }
    catch (e) { return false };
    return true;
}

// convert
String.prototype.toBase64 = function () { return Buffer.from(this).toString('base64') };
String.prototype.fromBase64 = function () { return Buffer.from(this, 'base64').toString('ascii') };
String.prototype.toBinary = function () { return this.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0').join('')) };
String.prototype.fromBinary = function () { return this.splitByLength(8).map(s => this.fromCharCode(parseInt(s, 2))).join('') };
String.prototype.toHex = function () { return this.split('').map(c => c.charCodeAt(0).toString(16)).join('') };
String.prototype.fromHex = function () { return this.splitByLength(2).map(c => this.fromCharCode(parseInt(c, 16))).join('') };

// count
String.prototype.charCount = function () {
    let o = {};
    for (let a of this.split(''))
        if (o[a]) o[a]++;
        else o[a] = 1;
    return o;
}

// replace
String.prototype.nlToBr = function () { return this.replace(/\n/g, '<br />') };
String.prototype.brToNl = function () { return this.replace(/(<br([ ]*)?>|<br([ ]*)?\/>)/gi, '\n') };