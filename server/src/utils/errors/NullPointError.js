module.exports = class NullPointError extends Error {
    constructor(message) {
        super(message);
        this.name = "NullPointError";
    }
}