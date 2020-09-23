/**
 * Map - 
 * 
 */

const Entity = require('./entity.js')

const Graph = require('./graph.js')

module.exports = class Map extends Entity  {

    constructor(model) {
        super();

        this.name = model.name;

        this.description = model.description;

        this.start = model.start;

        this.playerCount = model.players;

        this.graphs = [];

        for(let g of model.graphs) {

            let graph = new Graph(g.id, g.x, g.y, g.links);

            this.graphs.push(graph);
        }
        
    }
}

