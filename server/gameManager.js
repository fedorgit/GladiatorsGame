
const Enum = require('./enum.js');

const Player = require('./model/player.js');
const mapService = require('./service/MapService.js');
const playerService = require('./service/playerService.js');

const gameManager = {

    actionConnect(client, data) {

        if(!data.hasOwnProperty('user')) {

            console.error(`Protocol format error: no user data`);

            return false;
        }

        const user = data.user;

        console.log(`Connect user name: ${user.name}`);

        client.status = ClientStatusEnum.SELECT_NAME;

        this.sendSelectNameData(client);

        return true;
    },

    /**
     * 
     * @param {Client} client 
     */
    sendSelectNameData(client) {

        let model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.SELECT_NAME
        }

        let data = JSON.stringify(model);

        client.send(data);
    },


    actionSelectName(client, data) {

        if(!data.hasOwnProperty('name')) {

            console.error(`Protocol format error: no name`);

            return false;
        }

        let player = new Player(data.name);

        player = playerService.add(player);

        player.setClient(client);

        client.setPlayer(player);

        client.status = ClientStatusEnum.ACTION_ROOM;

        this.sendSelectActionRoomData(client);

        return true;
    },

    /**
     * 
     * @param {Client} client 
     */
    sendSelectActionRoomData(client) {

        const player = client.getPlayer();

        let model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.ACTION_ROOM,
            player: player
        }

        let data = JSON.stringify(model);

        client.send(data);
    },

    actionSelectActionRoom(client, data) {
        
        if(!data.hasOwnProperty('actionRoomEnumId')) {

            console.error(`Protocol format error: select action enum`);

            return false;
        }

        const actionRoomEnumId = data.selectActionEnumId;

        console.log(`User id: ${client.id} chose action: ${data.actionRoomEnumId}`);

        if(actionRoomEnumId = ActionRoomEnum.NONE)
            return false;

        if(actionRoomEnumId = ActionRoomEnum.CREATE) {

            client.status = ClientStatusEnum.CREATE_ROOM;

            this.sendCreateRoomData(client);

            return true;
        }
            
        if(actionRoomEnumId = ActionRoomEnum.SELECT) {

            client.status = ClientStatusEnum.SELECT_ROOM;

            this.sendSelectRoomData(client);

            return true;
        }

        console.error(`Error select chose action room: ${actionRoomEnumId}`);

        return false;
    },

    /**
     * Отправить пользователю данные об игровых комнатах
     * @param {Client} client 
     */
    sendCreateRoomData(client) {

        // maps
        // 

        const maps = mapService.getList();

        let model = {

            clientStatusEnumId: client.status,

            componentEnumId: ComponentEnum.SELECT_NAME,

            games: game.getRooms(),
            
            maps: MapService.getBasePublicModelList()
        }

        let data = JSON.stringify(model);
    },

    /**
     * Отправить пользователю данные об игровых комнатах
     * @param {Client} client 
     */
    sendSelectRoomData(client) {

        const game = client.gameLink;

        const rooms = game.getRooms();

        let model = {

            viewComponentEnumId: ViewComponentEnum.ROOM,

            games: game.getRooms(),
            
            maps: MapService.getBasePublicModelList()
        }

        let data = JSON.stringify(model);
    }
}

module.exports = gameManager;