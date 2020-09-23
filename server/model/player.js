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
        this.room = null;
    }

    getClient() {

        return this.#client;
    }

    setClient(client) {

        this.#client = client;
    }

    setRoom(room) {

        if(this.room != null) {

            console.warn(`Player id: ${this.id} not null room id: ${this.room.id}`);
        }

        this.room = room;
    }

    getRoom() {

        return this.room;
    }

    getPublic() {

        const model = {
            id: this.id,
            name: this.name
        }

        return model;
    }
}