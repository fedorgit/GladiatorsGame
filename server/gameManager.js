
const Enum = require('./enum.js');

const Player = require('./model/player.js');
const Room = require('./model/room.js');
const DataManager = require('./dataManager.js');

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

        player = DataManager.playerService.add(player);

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

        const actionRoomEnumId = data.actionRoomEnumId;

        console.log(`User id: ${client.id} chose action: ${data.actionRoomEnumId}`);

        if(actionRoomEnumId == ActionRoomEnum.NONE)
            return false;

        if(actionRoomEnumId == ActionRoomEnum.CREATE) {

            client.status = ClientStatusEnum.CREATE_ROOM;

            this.sendCreateRoomData(client);

            return true;
        }
            
        if(actionRoomEnumId == ActionRoomEnum.SELECT) {

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

        const maps = DataManager.mapService.getSimpleList();

        let model = {

            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.CREATE_ROOM,
            maps: maps
        }

        let data = JSON.stringify(model);

        client.send(data);
    },

    /**
     * Отправить пользователю данные об игровых комнатах.
     * @param {Client} client 
     */
    sendSelectRoomData(client) {

        const rooms = DataManager.roomService.getPublicList();

        let model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.SELECT_ROOM,
            rooms: rooms
        }

        let data = JSON.stringify(model);

        client.send(data);
    },

    /**
     * 
     * @param {Client} client 
     * @param {Object(Json)} data 
     */
    actionCreateRoom(client, data) {

        if(!data.hasOwnProperty('mapId')) {

            console.error(`Protocol format error: map id`);

            return false;
        }

        if(!data.hasOwnProperty('roomName')) {

            console.error(`Protocol format error: room name`);

            return false;
        }

        const mapId = data.mapId;

        const map = DataManager.mapService.get(mapId);

        if(map == null) {

            console.error(`Error select map not found: ${mapId}`);

            return false;
        }

        const roomName = data.roomName;

        // TODO: проверка названия комнаты на дубликат

        const player = client.getPlayer();

        let room = new Room(player, roomName, map);

        player.setRoom(room);

        room = DataManager.roomService.add(room);

        client.status = ClientStatusEnum.HOST_LOBBY;
        
        this.sendHostLobbyData(client);

        return true;
    },

    sendHostLobbyData(client) {

        const player = client.getPlayer();

        const maps = DataManager.mapService.getSimpleList();

        const lobby = player.room.getLobby();

        const isHost = player.id == player.room.hostPlayer.id;

        let model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.HOST_LOBBY,
            maps: maps,
            lobby: lobby
        }

        let data = JSON.stringify(model);

        client.send(data);
    },

    /**
     * Клиент выбрал игровую комнату.
     * @param {Client} client 
     * @param {Object(Json)} data 
     */
    actionSelectRoom(client, data) {

        if(!data.hasOwnProperty('roomId')) {

            console.error(`Protocol format error: room name`);

            return false;
        }

        const roomId = data.roomId;

        const room = DataManager.roomService.get(roomId);

        if(room == null) {

            console.error(`Error select room not found: ${roomId}`);

            return false;
        }

        const player = client.getPlayer();

        // TODO: проверка возможности зайти в комнату

        room.addPlayer(player);

        player.setRoom(room);

        client.status = ClientStatusEnum.CLIENT_LOBBY;

        this.sendClientLobbyData(client);

        return true;
    },

    sendClientLobbyData(client) {

        const player = client.getPlayer();

        const lobby = player.room.getLobby();

        let model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.CLIENT_LOBBY,
            lobby: lobby
        }

        let data = JSON.stringify(model);

        client.send(data);
    }
}

module.exports = gameManager;