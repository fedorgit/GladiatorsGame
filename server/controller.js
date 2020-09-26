const GameManager = require('./GameManager.js')

const Controller = {

    /**
     * 
     * @param {Client} currentClient
     * @param {Object(Json)} data 
     */
    route(currentClient, data) {

        const status = currentClient.status;

        switch(status) {

            case ClientStatusEnum.NONE: {

                return false;
            }

            case ClientStatusEnum.CONNECT: {

                return GameManager.actionConnect(currentClient, data);
            }

            case ClientStatusEnum.SELECT_NAME: {

                return GameManager.actionSelectName(currentClient, data);
            }

            case ClientStatusEnum.ACTION_ROOM: {

                return GameManager.actionSelectActionRoom(currentClient, data);
            }

            case ClientStatusEnum.CREATE_ROOM: {

                return GameManager.actionCreateRoom(currentClient, data);
            }

            case ClientStatusEnum.SELECT_ROOM: {

                return GameManager.actionSelectRoom(currentClient, data);
            }

            case ClientStatusEnum.HOST_LOBBY: {

                return GameManager.actionLobby(currentClient, data);
            }

            case ClientStatusEnum.CLIENT_LOBBY: {

                return true;
            }

            case ClientStatusEnum.GAME: {

                return true;
            }

            case ClientStatusEnum.DISCONNECT: {

                return true;
            }

        }
        
        console.error(`Error client status: ${currentClient.status}`)

        return false;

    }
}

module.exports = Controller;