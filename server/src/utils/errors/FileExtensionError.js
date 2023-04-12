module.exports = class FileExtensionError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileExtensionError";
    }
}