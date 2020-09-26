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
        this.game = null;
        this.hero = null;
    }

    getClient() {

        return this.#client;
    }

    setClient(client) {

        this.#client = client;
    }

    getRoom() {

        return this.room;
    }

    setRoom(room) {

        if(this.room != null) {

            console.warn(`Player id: ${this.id} not null room id: ${this.room.id}`);
        }

        this.room = room;
    }

    getGame() {

        return this.game;
    }

    setGame(game) {

        if(this.game != null) {

            console.warn(`Player id: ${this.id} not null game id: ${this.game.id}`);
        }

        this.game = game;
    }

    getHero() {
        
        return this.hero;
    }

    setHero(hero) {

        this.hero = hero
    }

    getPublic() {

        const model = {
            id: this.id,
            name: this.name
        }

        return model;
    }

    getAreaPublic() {

        const hero = this.hero.getAreaPublic();

        const model = {
            id: this.id,
            name: this.name,
            hero: hero
        }

        return model;
    }
}