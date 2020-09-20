/**
 * Player - 
 * 
 */

const Entity = require('./entity.js')

module.exports = class Player extends Entity  {

    #client = null;

    constructor(name) {
        super();
        this.name = name;
    }

    getClient() {

        return this.#client;
    }

    setClient(client) {

        this.#client = client;
    }
}