module.exports = class MysqlError extends Error {
    constructor(message) {
        super(message);
        this.name = "MysqlError";
    }
}