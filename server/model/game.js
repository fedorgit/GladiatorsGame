/**
 * Game - игровая сессия
 * 
 */

const Entity = require('./entity')

module.exports = class Game extends Entity {

    /**
     * 
     * @param {sring} name - название игры
     * @param {[Player]} players - все игроки включая хоста и клиентов
     * @param {Map} map - игровая карта
     */
    constructor(name, players, map){
        super();
        this.name = name;
        this.players = players;
        this.map = map;
    }

    getPublic() {

        const players = Object.values(this.players).map(player => player.getPublic());

        const model = {
            name: this.name,
            players: players,
            map: this.map
        }
    }
}