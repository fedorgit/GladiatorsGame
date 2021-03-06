const UserService = require("./service/userService");
const ClientService = require("./service/clientService");
const PlayerService = require("./service/playerService");
const MapService = require("./service/mapService");
const RoomService = require("./service/roomService");
const HeroService = require("./service/heroService");
const GameService = require("./service/gameService");

const DataManager = {

    userService: new UserService(),
    clientService: new ClientService(),
    playerService: new PlayerService(),
    mapService: new MapService(),
    roomService: new RoomService(),
    heroService: new HeroService(),
    gameService: new GameService()
}

module.exports = DataManager;