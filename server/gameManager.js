
const Enum = require('./enum');
const DataManager = require('./dataManager');

const Player = require('./model/player');
const Room = require('./model/room');
const Game = require('./model/game');
const Hero = require('./model/hero');


const GameManager = {

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

        for(let customerPlayer of Object.values(room.customerPlayers)) {

            const updateCustomerClient = customerPlayer.getClient();

            this.sendClientLobbyData(updateCustomerClient);
        }

        const updateHostClient = room.hostPlayer.getClient();

        this.sendHostLobbyData(updateHostClient);

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
    },

    actionLobby(currentClient, data) {

        if(!data.hasOwnProperty('actionLobbyEnumId')) {

            console.error(`Protocol format error: actionLobbyEnumId`);

            return false;
        }

        const actionLobbyEnumId = data.actionLobbyEnumId;

        if(actionLobbyEnumId == ActionLobbyEnum.LEAVE) {
            
            return true;
        }

        if(actionLobbyEnumId == ActionLobbyEnum.START) {
            
            const player = currentClient.getPlayer();

            const room = player.getRoom();

            if(room.hostPlayer != player) {

                console.warn(`Player id: ${player.id} not host lobby room id: ${room.id}`)

                return false;
            }

            let players = room.getGamePlayers();

            // Создание комнаты
            let game = new Game(room.name, players, room.map);

            game = DataManager.gameService.add(game);

            for(let player of Object.values(players)) {
                
                player.setGame(game);

                const arenaId = player.getRoom().getArenaId(player);

                let hero = new Hero(player.name, 1, arenaId);

                hero = DataManager.heroService.add(hero);

                player.setHero(hero);

                const client = player.getClient();

                client.status = ClientStatusEnum.GAME;
                
                this.sendGameData(client);
            }

            for(let player of Object.values(players)) {

                const client = player.getClient();

                client.status = ClientStatusEnum.AREA;

                this.sendAreaData(client);
            }

            return true;
        }

        return false;
    },

    sendGameData(client) {
        
        const player = client.getPlayer();

        const game = player.getGame();

        const model = {
            clientStatusEnumId: client.status,
            componentEnumId: ComponentEnum.GAME,
            game: game.getPublic(),
            player: player.getAreaPublic()
        }

        const data = JSON.stringify(model);

        client.send(data);
    },

    sendAreaData(client) {

        const player = client.getPlayer();

        const game = player.getGame();

        const players = Object.values(game.players).map(player => player.getAreaPublic());
        
        const area = {
            players: players,
            map: game.map
        }

        const model = {
            clientStatusEnumId: client.status,
            area: area
        }

        const data = JSON.stringify(model);

        client.send(data);
    },

    sendBattleData(client) {

    },

    updateRoom(room) {

        for(let customerPlayer of Object.values(room.customerPlayers)) {

            const updateCustomerClient = customerPlayer.getClient();

            this.sendClientLobbyData(updateCustomerClient);
        }

        const updateHostClient = room.hostPlayer.getClient();

        this.sendHostLobbyData(updateHostClient);
    },

    closeClient(client) {

        const player = client.getPlayer();

		player.setClient(null);

		client.setPlayer(null);

		let room = player.getRoom();

		if(room != null) {

			if(room.hostPlayer.id == player.id) {
				room.removePlayer(player);
				player.setRoom(null);
				DataManager.roomService.remove(room.id);
			} else {
                room.removePlayer(player);
                this.updateRoom(room);
				player.setRoom(null);
			}
		}

		DataManager.playerService.remove(player.id);

		DataManager.clientService.remove(client.id);
    }
}

module.exports = GameManager;