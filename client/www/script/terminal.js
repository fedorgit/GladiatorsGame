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
    }

}