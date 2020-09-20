const gameManager = require('./gameManager.js')

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

                return gameManager.actionConnect(currentClient, data);
            }

            case ClientStatusEnum.SELECT_NAME: {

                return gameManager.actionSelectName(currentClient, data);
            }

            case ClientStatusEnum.ACTION_ROOM: {

                return gameManager.actionSelectActionRoom(currentClient, data);

                return true;
            }

            case ClientStatusEnum.CREATE_ROOM: {

                return true;
            }

            case ClientStatusEnum.SELECT_ROOM: {

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