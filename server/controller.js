const gameManager = require('./gameManager.js')

const Controller = {

    /**
     * 
     * @param {Client} currentClient
     * @param {Object} data 
     */
    route(currentClient, data) {

        switch(currentClient.status) {

            case StatusUserEnum.NONE: {

                return false;
            }

            case StatusUserEnum.CONNECT: {

                return gameManager.actionConnect(currentClient, data);
            }

            case StatusUserEnum.SELECT_ACTION: {

                if(!data.hasOwnProperty('selectEnumId')) {

                    console.error(`Protocol format error: select action`);

                    return false;
                }

                console.log(`User id: ${currentClient.id} chose action: ${data.selectEnumId}`);

                return true;
            }

            case StatusUserEnum.CREATE_ROOM: {

                return true;
            }

            case StatusUserEnum.SELECT_ROOM: {

                return true;
            }

            case StatusUserEnum.GAME: {

                return true;
            }

            case StatusUserEnum.DISCONNECT: {

                return true;
            }

        }
        
        console.error(`Error client status: ${currentClient.status}`)

        return false;

    }
}

module.exports = Controller;