
const Enum = require('./enum.js');

const gameManager = {

    actionConnect(client, data) {

        if(!data.hasOwnProperty('user')) {

            console.error(`Protocol format error: no user data`);

            return false;
        }

        const user = data.user;

        if(!user.hasOwnProperty('user')) {

            console.error(`Protocol format error: no user data`);

            return false;
        }

        console.log(`Create new Player name: ${data.name}`);

        this.sendSelectData(client);
    },

    /**
     * 
     * @param {Client} client 
     */
    sendSelectData(client) {

        let model = {

            viewComponentEnumId: ViewComponentEnum.SELECT
        }

        let data = JSON.stringify(model);

        client.send(client.wsi);
    },

    /**
     * Отправить пользователю данные об игровых комнатах
     * @param {User} user 
     */
    sendRoomData(user) {

        const game = user.gameLink;

        const rooms = game.getRooms();

        let model = {

            viewComponentEnumId: ViewComponentEnum.ROOM,

            games: game.getRooms(),
            
            maps: MapService.getBasePublicModelList()
        }

        let data = JSON.stringify(model);
    }
}

module.exports = gameManager;