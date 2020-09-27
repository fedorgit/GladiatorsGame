
/**
 * ViewService - сервис по работе с интерфейсом
 */

const ViewService = {

    componentConnectElement: null,
    componentSelectNameElement: null,
    componentActionRoomElement: null,
    componentCreateRoomElement: null,
    componentSelectRoomElement: null,
    componentHostLobbyElement: null,
    componentClientLobbyElement: null,
    componentGameElement: null,
    componentSettingElement: null,
    componentDisconnectElement: null,
    componentGameElement: null,

    componentElements: null,

    selectMapCreateRoomElement: null,
    nameCreateRoomElement: null,

    selectRoomElement: null,

    selectMapHostLobbyElement: null,
    slotHostLobbyElement: null,
    stashHostLobbyElement: null,

    nameMapHostLobbyElement: null,
    slotClientLobbyElement: null,
    stashClientLobbyElement: null,

    

    init() {
        this.componentConnectElement = document.getElementById('js-component-connect');
        this.componentSelectNameElement = document.getElementById('js-component-select-name');
        this.componentActionRoomElement = document.getElementById('js-component-action-room');
        this.componentCreateRoomElement = document.getElementById('js-component-create-room');
        this.componentSelectRoomElement = document.getElementById('js-component-select-room');
        this.componentHostLobbyElement = document.getElementById('js-component-host-lobby');
        this.componentClientLobbyElement = document.getElementById('js-component-client-lobby');
        this.componentGameElement = document.getElementById('js-component-game');
        this.componentSettingElement = document.getElementById('js-component-setting');
        this.componentDisconnectElement = document.getElementById('js-component-disconnect');
        this.componentGameElement = document.getElementById('js-component-game');

        this.componentElements = document.getElementsByClassName('js-component');

        this.setComponent(ComponentEnum.CONNECT);

        this.nameCreateRoomElement = document.getElementById('js-name-create-room');
        this.selectMapCreateRoomElement = document.getElementById('js-select-map-create-room');

        this.selectRoomElement = document.getElementById('js-select-room');

        // HOST_LOBBY
        this.selectMapHostLobbyElement = document.getElementById('js-select-map-host-lobby');
        this.slotHostLobbyElement = document.getElementById('js-slot-host-lobby');
        this.stashHostLobbyElement = document.getElementById('js-stash-host-lobby');

        // CLIENT_LOBBY
        this.nameMapHostLobbyElement = document.getElementById('js-name-map-client-lobby');
        this.slotClientLobbyElement = document.getElementById('js-slot-client-lobby');
        this.stashClientLobbyElement = document.getElementById('js-stash-client-lobby');
    },

    /**
     * Установить интерфейсный компонент.
     * @param {ComponentEnum} сomponentEnumId 
     */
    setComponent(сomponentEnumId) {

        console.log(`Set component: ${сomponentEnumId}`);

        for(let component of this.componentElements)
            component.style = 'display: none;';

        this.componentElements.style = 'display: none;';

        switch(сomponentEnumId) {
            
            case ComponentEnum.CONNECT:

                this.componentConnectElement.style = 'display: block;';
            break;

            case ComponentEnum.SELECT_NAME:

                this.componentSelectNameElement.style = 'display: block;';
            break;
            
            case ComponentEnum.ACTION_ROOM:

                this.componentActionRoomElement.style = 'display: block;';
            break;
            
            case ComponentEnum.CREATE_ROOM:

                this.componentCreateRoomElement.style = 'display: block;';
            break;
            
            case ComponentEnum.SELECT_ROOM:

                this.componentSelectRoomElement.style = 'display: block;';
            break;
            
            case ComponentEnum.HOST_LOBBY:

                this.componentHostLobbyElement.style = 'display: block;';
            break;

            case ComponentEnum.CLIENT_LOBBY:

                this.componentClientLobbyElement.style = 'display: block;';
            break;

            case ComponentEnum.GAME:

                this.componentGameElement.style = 'display: block;';
            break;
        }
    },

    /**
     * Установить список карт на выбор игроком.
     * @param {[Object]} maps 
     */
    setSimpleMapsData(maps) {

        while (this.selectMapCreateRoomElement.firstChild)
            this.selectMapCreateRoomElement.removeChild(this.selectMapCreateRoomElement.firstChild);

        let options = [];
        for (let map of maps)
            options.push(new Option(map.name, map.id, false, false));

        for(let option of options)
            this.selectMapCreateRoomElement.appendChild(option);
    },

    /**
     * Получить название карты выбранное пользователем.
     * @returns {string} - Название карты.
     */
    getNameCreateRoom() {

        const nameRoom = this.nameCreateRoomElement.value;

        return nameRoom;
    },

    /**
     * Получить идентификатор карты выбранный пользователем.
     * @returns {number} - Идентификатор карты.
     */
    getSelectMapCreateRoom() {

        const mapId = ViewService.selectMapCreateRoomElement.value;

        return mapId;
    },

    setSelectRoomsData(rooms) {

        while (this.selectRoomElement.firstChild)
		    ViewService.selectRoomElement.removeChild(this.selectRoomElement.firstChild);

        let options = [];
        for (let room of rooms) {

            const roomName = `(${room.playerCount}/${room.playerCountMax}) ${room.name} - ${room.map.name} (${room.map.playerCount})`;

            options.push(new Option(roomName, room.id, false, false));
        }

        for(let option of options)
            this.selectRoomElement.appendChild(option);
    },

    getSelectRoom() {

        const roomId = this.selectRoomElement.value;

        return roomId;
    },

    setHostLobbyData(maps, lobby) {
        
        while (this.selectMapHostLobbyElement.firstChild)
            this.selectMapHostLobbyElement.removeChild(this.selectMapHostLobbyElement.firstChild);

        let options = [];
        for (let map of maps)
            options.push(new Option(map.name, map.id, false, false));

        for(let option of options)
            this.selectMapHostLobbyElement.appendChild(option);
        
        while (this.slotHostLobbyElement.firstChild)
            this.slotHostLobbyElement.removeChild(this.slotHostLobbyElement.firstChild);

        for(let slot of lobby.slots) {

            let slotHostElement = new SlotHostElement(slot);

            this.slotHostLobbyElement.appendChild(slotHostElement.element);
        }

        for(let stash of lobby.stashs) {

            //let stashElement = createStast(stash);

            //this.stashLobbyElement.appendChild(stashElement);
        }
    },

    setClientLobbyData(lobby) {

        this.nameMapHostLobbyElement.prepend(`${lobby.map.name}`);

        while (this.slotClientLobbyElement.firstChild)
            this.slotClientLobbyElement.removeChild(this.slotClientLobbyElement.firstChild);

        for(let slot of lobby.slots) {

            let slotClientElement = new SlotClientElement(slot);

            this.slotClientLobbyElement.appendChild(slotClientElement.element);
        }

        for(let stash of lobby.stashs) {

            //let stashElement = createStast(stash);

            //this.stashLobbyElement.appendChild(stashElement);
        }
    },

    createSlot(slot) {

    },

    updateMapLobby(map) {

        // TODO: Миникарта

    },

    /**
     * Обновление данных лобби, нельзя пересозавать данные, только обновление изменений.
     * @param {*} slots
     */
    updateSlotLobby(slots) {

        for(let slot of slots) {
            
        }

    },



    updateStashLobby(stash) {

    },

    getViewConnectName() {

        return 'Player';
    }
}
