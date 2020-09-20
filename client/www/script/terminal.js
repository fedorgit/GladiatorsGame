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

    selectActionRoom(selectActionEnumId) {

        const model = {
            selectActionEnumId: selectActionEnumId
        }

        const data = JSON.stringify(model);

        Controller.send(data);
    },


    createRoom() {

    },

    selectRoom() {

    }

}