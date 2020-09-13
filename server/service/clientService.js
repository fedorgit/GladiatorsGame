const Service = require('./service.js')

class ClientService extends Service {

    constructor(){
        super();
    }
}

const clientService = new ClientService();

module.exports = clientService;
