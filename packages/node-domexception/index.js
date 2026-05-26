// Native delegation to Node's built-in global DOMException
module.exports = globalThis.DOMException || Error;
