const Service = require('./service.js')
const Map = require('../model/map.js')
const fs = require('fs')

module.exports = class MapService extends Service {

    constructor(){
        super();
    }

    getSimpleList() {

        const mapList = this.getList();

        let mapSimpleList = [];

        for(let map of mapList) {

            let mapSimple = {id: map.id, name: map.name, description: map.description }

            mapSimpleList.push(mapSimple)
        }

        return mapSimpleList;
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
