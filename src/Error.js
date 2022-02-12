class spankError extends Error {
    /**
     * @param { String } message
     */
    constructor(message) {
        super(message)
        this.name = "spankError"
    }
}
module.exports = spankError;