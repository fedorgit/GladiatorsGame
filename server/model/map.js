/**
 * Map - 
 * 
 */

const Entity = require('./entity.js')

const Arene = require('./arena.js')

module.exports = class Map extends Entity  {

    constructor(model) {
        super();

        this.name = model.name;

        this.description = model.description;

        this.start = model.start;

        this.playerCount = model.players;

        this.arenas = [];

        /*for(let a of model.arenas) {

            let arena = new Arene(a.id, a.x, a.y, a.links);

            this.arenas.push(arena);
        }*/

        this.arenas = model.arenas.map(arena => new Arene(arena.id, arena.x, arena.y, arena.links))
        
    }
}

