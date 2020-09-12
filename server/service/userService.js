const Service = require('./service.js')

class UserService extends Service {

    constructor(){
        super();
    }
}

const userService = new UserService();

module.exports = userService;
