var fs = require('fs');

const configService = {

    config: null, 

    init(configPath) {
        
        let configData = fs.readFileSync(configPath, 'utf8');
        
        this.config = JSON.parse(configData);      
    }
}

module.exports = configService;