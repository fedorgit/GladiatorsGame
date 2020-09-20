const Service = require('./service.js')
const Map = require('../model/map.js')
const fs = require('fs')

class MapService extends Service {

    constructor(){
        super();
    }

    loadMaps(path, files) {

        for(let file of files) {

            let data = fs.readFileSync(`${path}/${file}`);

            let mapModel = JSON.parse(data);

            let map = new Map(mapModel);

            map = this.add(map);
        }
    }
}

const mapService = new MapService();

module.exports = mapService;