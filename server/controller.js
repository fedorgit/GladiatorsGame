
const Controller = {

    route(currentUser, data) {

        switch(currentUser.statusUserEnumId) {

            case StatusUserEnum.NONE: {

                break;
            }

            case StatusUserEnum.CONNECT: {

                console.log(`Create new Player name: ${data.name}`)

                break;
            }

            case StatusUserEnum.NAME: {

                break;
            }

            case StatusUserEnum.ROOM: {

                break;
            }

            case StatusUserEnum.GAME: {

                break;
            }

            case StatusUserEnum.DISCONNECT: {

                break;
            }

        }

    }
}

module.exports = Controller;