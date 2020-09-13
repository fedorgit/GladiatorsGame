const Service = require('./service.js')

class GameService extends Service {

    constructor(){
        super();
    }
}

const gameService = new GameService();

module.exports = gameService;