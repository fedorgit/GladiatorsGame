/**
 * Terminal - для взаимодействия с пользователем.
 */

const Terminal = {

    connect() {

        Controller.connect();
    },

    selectName() {

        const name = ViewService.getViewConnectName()

        const model = {
            name: name
        }

        const data = JSON.stringify(model);

        Controller.send(data);
    },

    selectActionRoom(actionRoomEnumId) {

        const model = {
            actionRoomEnumId: actionRoomEnumId
        }

        const data = JSON.stringify(model);

        Controller.send(data);
    },

    createRoom() {

        const mapId = ViewService.getSelectMapCreateRoom();

        const roomName = ViewService.getNameCreateRoom();

        const model = {
            mapId: mapId,
            roomName: roomName
        }

        const data = JSON.stringify(model);

        Controller.send(data);
    },

    selectRoom() {

        const roomId = ViewService.getSelectRoom();

        const model = {
            roomId: roomId
        }

        const data = JSON.stringify(model);

        Controller.send(data);
    },

    leaveLobby() {

    },

    startGame() {

    }
}