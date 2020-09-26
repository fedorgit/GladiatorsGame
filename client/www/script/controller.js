
const Controller = {

    url: 'ws://127.0.0.1:8080',

    socket: null,

    /**
     * Произвести подключение к игровой сессии.
     */
    connect() {

        if(this.socket != null) {
    
            console.log(`[socket] Connection is already established`);
    
            return;
        }
    
        if(!isLoad) {
    
            console.log(`[load] Not loading game data`);
    
            return;
        }
        
        this.socket = new WebSocket(this.url);
    
        this.socket.onopen = (event) => {
            
            let name = ViewService.getViewConnectName();

            const user = DataManager.currentUser;
    
            let data = {
                user: {
                    id: user.id,
                    login: user.login,
                    name: user.name,
                    icon: user.icon,
                }
            }
    
            this.socket.send(JSON.stringify(data));
        };
    
        this.socket.onmessage = (event) => {
            
            try {
    
                let data = JSON.parse(event.data);
    
                console.log(data);
    
                this.route(data);
    
            } catch (error) {
                
                console.log(`Exeption ${error.name}: ${error.message} ${error.stack}`);
            }
        };
    
        this.socket.onclose = (event) => {
    
            if (event.wasClean)
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            else
                console.log('[close] Соединение прервано');
        };
    
        this.socket.onerror = (error) => {
    
            console.log(`[error] ${error.message}`);
        };
    },

    /**
     * Работа с данными от сервера.
     * @param {Object(Json)} data 
     * @returns {bool} - успешность выполняемой операции.
     */
    route(data) {

        const status = data.clientStatusEnumId;

        console.log(status);

        switch(status) {

            case ClientStatusEnum.NONE: {

                return false;
            }

            case ClientStatusEnum.CONNECT: {

                if(!data.hasOwnProperty('client')) {

                    console.error(`Not found user data`);

                    return false;
                }

                const client = data.client;

                let currentClient = new CurrentClient(client.id, this.socket);

                DataManager.setCurrentClient(currentClient);

                ViewService.setComponent(data.componentEnumId);

                return true;
            }

            case ClientStatusEnum.SELECT_NAME: {

                ViewService.setComponent(data.componentEnumId);

                return true;
            }

            case ClientStatusEnum.ACTION_ROOM: {

                if(!data.hasOwnProperty('player')) {

                    console.error(`Not found player data`);

                    return false;
                }

                let player = new Player(data.player.id, data.player.name);

                DataManager.playerService.add(player);

                ViewService.setComponent(data.componentEnumId);

                return true;
            }

            case ClientStatusEnum.CREATE_ROOM: {

                if(!data.hasOwnProperty('maps')) {

                    console.error(`Not found maps data`);

                    return false;
                }

                ViewService.setComponent(data.componentEnumId);

                ViewService.setSimpleMapsData(data.maps);

                return true;
            }

            case ClientStatusEnum.SELECT_ROOM: {

                ViewService.setComponent(data.componentEnumId);

                ViewService.setSelectRoomsData(data.rooms);

                return true;
            }

            case ClientStatusEnum.HOST_LOBBY: {

                ViewService.setComponent(data.componentEnumId);

                ViewService.setHostLobbyData(data.maps, data.lobby);

                return true;
            }

            case ClientStatusEnum.CLIENT_LOBBY: {

                ViewService.setComponent(data.componentEnumId);

                ViewService.setClientLobbyData(data.lobby);

                return true;
            }

            case ClientStatusEnum.UPDATE_LOBBY: {

                actionLobbyFlagId = data.actionLobbyFlagId;

                if(actionLobbyFlagId & ActionLobbyFlag.MAP)
                    ViewService.updateMapLobby(data.map);

                if(actionLobbyFlagId & ActionLobbyFlag.SLOT)
                    ViewService.updateMapLobby(data.slots);

                if(actionLobbyFlagId & ActionLobbyFlag.STASH)
                    ViewService.updateMapLobby(data.stashs);

                return true;
            }

            case ClientStatusEnum.GAME: {

                ViewService.setComponent(data.componentEnumId);

                EngineManager.init();

                return true;
            }

            case ClientStatusEnum.AREA: {

                EngineManager.showArea(data.area);

                return true;
            }

            case ClientStatusEnum.BATTLE: {

                EngineManager.showBattle(data.battle);

                return true;
            }
        }
    },

    /**
     * Отправить данные игровому сервису.
     * @param {Object(Json)} data 
     */
    send(data) {

        this.socket.send(data);
    },
}