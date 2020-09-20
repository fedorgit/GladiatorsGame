
const Enum = require('./enum.js');

const Player = require('./model/player.js');
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
        
        if(!data.hasOwnProperty('selectActionEnumId')) {

            console.error(`Protocol format error: no selectActionEnumId`);

            return false;
        }

        const selectActionEnumId = data.selectActionEnumId;

        if(selectActionEnumId = SelectActionEnum.NONE)
            return false;

        if(selectActionEnumId = SelectActionEnum.CREATE)
            this.sendRoomData(client);

        if(selectActionEnumId = SelectActionEnum.SELECT)
            this.sendRoomData(client);

        return true;
    },

    /**
     * Отправить пользователю данные об игровых комнатах
     * @param {User} user 
     */
    sendSelectRoomData(user) {

        const game = user.gameLink;

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