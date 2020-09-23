const Service = require('./service.js')

module.exports = class RoomService extends Service {

    constructor(){
        super();
    }

    getPublicList() {

        const rooms = this.getList();

        let roomPublicList = [];

        for(let room of rooms) {

            const roomPublic = room.getPublic();

            roomPublicList.push(roomPublic);
        }

        return roomPublicList;
    }
}
