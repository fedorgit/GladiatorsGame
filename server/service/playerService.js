const Service = require('./service.js')

class PlayerService extends Service {

    constructor(){
        super();
    }
}

const playerService = new PlayerService();

module.exports = playerService;
